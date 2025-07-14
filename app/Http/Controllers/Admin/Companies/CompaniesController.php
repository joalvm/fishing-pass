<?php

namespace App\Http\Controllers\Admin\Companies;

use App\DataObjects\Repositories\Companies\CreateCompanyData;
use App\DataObjects\Repositories\Companies\UpdateCompanyData;
use App\DataObjects\Repositories\Person\CreatePersonData;
use App\DataObjects\Repositories\User\CreateUserData;
use App\Enums\Person\Gender;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Companies\StoreCompanyRequest;
use App\Http\Requests\Admin\Companies\UpdateCompanyRequest;
use App\Interfaces\Companies\CompaniesInterface;
use App\Interfaces\DocumentTypesInterface;
use App\Interfaces\Persons\PersonsInterface;
use App\Interfaces\Users\UsersInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CompaniesController extends Controller
{
    public function __construct(
        protected CompaniesInterface $companiesRepository,
        protected DocumentTypesInterface $documentTypesRepository,
        protected PersonsInterface $personsRepository,
        protected UsersInterface $userRepository,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $collection = $this->companiesRepository
            ->setDocumentTypes($request->query('document_types'))
            ->setEntityType($request->query('entity_type'))
            ->setEnabled($request->query('enabled'))
            ->setRegisteredViaForm($request->query('registered_via_form'))
            ->all()
        ;

        return Inertia::render(
            'admin/companies/companies/companies',
            [
                'companies' => fn () => [
                    'data' => $collection,
                    'meta' => $collection->getMetadata(),
                ],
                'document_types' => fn () => $this->documentTypesRepository->all(),
                'filters' => [
                    'per_page' => to_int($request->query('per_page', $collection->perPage())),
                    'page' => to_int($request->query('page', $collection->currentPage())),
                    'contains' => $request->query('contains', [
                        'items' => $request->query('contains.items', ['business_name', 'document_number']),
                        'text' => $request->query('contains.text', ''),
                    ]),
                    'sort' => $request->query('sort', new \stdClass()),
                    'document_types' => $request->query('document_types'),
                    'entity_type' => $request->query('entity_type'),
                    'enabled' => $request->query('enabled'),
                    'registered_via_form' => $request->query('registered_via_form'),
                ],
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/companies/companies/companies-create', [
            'document_types' => fn () => $this->documentTypesRepository->all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCompanyRequest $request)
    {
        $input = $request->validated();
        $data = CreateCompanyData::from(Arr::except($input, ['user']));

        try {
            DB::beginTransaction();

            $company = $this->companiesRepository->create($data);

            $this->registerCompany($company, $request);

            DB::commit();
        } catch (\Throwable $e) {
            dd($e);
            DB::rollBack();

            return redirect()
                ->back()
                ->with('flash', ['error' => true, 'message' => "Error:\n{$e->getMessage()}"])
            ;
        }

        return redirect()
            ->back()
            ->with('flash', ['success' => true, 'message' => 'Empresa creada correctamente.'])
        ;
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return redirect()->route('admin.companies.edit', $id)->withInput();
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $company = $this->companiesRepository->find($id);
        if (!$company) {
            return to_route('admin.companies.index')->with(
                'flash',
                ['error' => true, 'message' => 'Empresa no encontrada.'],
            );
        }

        return Inertia::render('admin/companies/companies/companies-edit', [
            'company' => $company,
            'document_types' => fn () => $this->documentTypesRepository->all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCompanyRequest $request, string $id)
    {
        $input = $request->validated();
        $company = $this->companiesRepository->getModel($id);
        if (!$company) {
            return to_route('admin.companies.index')->with(
                'flash',
                ['error' => true, 'message' => 'Empresa no encontrada.'],
            );
        }

        $data = UpdateCompanyData::from($input);

        $this->companiesRepository->update($company, $data);

        return redirect()->back()->with(
            'flash',
            ['success' => true, 'message' => 'Empresa actualizada correctamente.'],
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $company = $this->companiesRepository->getModel($id);
        if (!$company) {
            return redirect()->back()->with('flash', ['error' => true, 'message' => 'Empresa no encontrada.']);
        }

        $this->companiesRepository->delete($company);

        return redirect()->back()->with('flash', ['success' => true, 'message' => 'Empresa eliminada correctamente.']);
    }

    private function registerCompany($company, StoreCompanyRequest $request)
    {
        if (!$request->has('user')) {
            return;
        }

        $personData = new CreatePersonData(
            companyId: $company->id,
            firstName: $request->validated('user.first_name'),
            lastNamePaternal: $request->validated('user.last_name'),
            documentTypeId: $request->validated('document_type_id'),
            documentNumber: $request->validated('document_number'),
            gender: Gender::FEMALE,
            email: $request->validated('user.email') ?? '',
        );

        $person = $this->personsRepository->create($personData);

        $userData = new CreateUserData(
            personId: $person->id,
            email: $request->validated('user.email'),
            password: $request->validated('user.password'),
        );

        $this->userRepository->create($userData);
    }
}
