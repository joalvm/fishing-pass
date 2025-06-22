<?php

namespace App\Http\Controllers;

use App\DataObjects\Repositories\Companies\CreateCompanyData;
use App\Http\Requests\StoreRegisterRequest;
use App\Interfaces\Companies\CompaniesInterface;
use App\Interfaces\DocumentTypesInterface;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class RegisterController extends Controller
{
    public function __construct(
        protected readonly DocumentTypesInterface $documentTypesRepository,
        protected readonly CompaniesInterface $companiesRepository,
    ) {
    }

    public function create()
    {
        return Inertia::render('register', [
            'documentTypes' => $this->documentTypesRepository->all(),
        ]);
    }

    public function store(StoreRegisterRequest $request)
    {
        $data = CreateCompanyData::from($request->validated());
        $companyModel = $this->companiesRepository->getModelByDocumentNumber($data->documentNumber);
        if ($companyModel) {
            return Inertia::render('register', [
                'documentTypes' => $this->documentTypesRepository->all(),
            ])->with('errors', [
                'document_number' => ['El cliente ya se encuentra registrado.'],
            ])->toResponse($request)->setStatusCode(HttpFoundationResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        $companyModel = $this->companiesRepository->create($data);

        return Inertia::render('register', [
            'message' => 'Cliente registrado correctamente.',
            'documentTypes' => $this->documentTypesRepository->all(),
        ]);
    }
}
