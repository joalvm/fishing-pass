<?php

namespace App\Http\Controllers;

use App\DataObjects\Repositories\Companies\CreateRegistrationRequestData;
use App\Enums\Company\RegistrationStatus;
use App\Http\Requests\StoreRegisterRequest;
use App\Interfaces\Companies\RegistrationRequestInterface;
use App\Interfaces\DocumentTypesInterface;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class RegisterController extends Controller
{
    public function __construct(
        protected readonly DocumentTypesInterface $documentTypesRepository,
        protected readonly RegistrationRequestInterface $registrationRepository,
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
        $input = $request->validated();
        $input['status'] = RegistrationStatus::PENDING->value;

        $data = CreateRegistrationRequestData::from($input);

        $registrationModel = $this->registrationRepository->getModelByDocumentNumber($data->documentNumber);

        if ($registrationModel) {
            return Inertia::render('register', [
                'documentTypes' => $this->documentTypesRepository->all(),
            ])->with('errors', [
                'document_number' => ['La empresa ya se encuentra registrado.'],
            ])->toResponse($request)->setStatusCode(HttpFoundationResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        $registrationModel = $this->registrationRepository->create($data);

        return Inertia::render('register', [
            'message' => 'El registro se ha creado correctamente.',
            'documentTypes' => $this->documentTypesRepository->all(),
        ]);
    }
}
