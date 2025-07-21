<?php

namespace App\Http\Controllers\Client;

use App\DataObjects\Repositories\Person\CreatePersonData;
use App\DataObjects\Repositories\Person\UpdatePersonData;
use App\DataObjects\Repositories\User\CreateUserData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Client\StoreStaffRequest;
use App\Http\Requests\Client\UpdateStaffRequest;
use App\Interfaces\DocumentTypesInterface;
use App\Interfaces\Persons\PersonsInterface;
use App\Interfaces\Users\UsersInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function __construct(
        protected DocumentTypesInterface $documentTypesRepository,
        protected PersonsInterface $personsRepository,
        protected UsersInterface $usersRepository,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $coll = $this->personsRepository
            ->setDocumentTypes($request->query('document_types'))
            ->setWithCompany(true)
            ->setCompanyId($request->user()->person->company_id)
            ->all()
        ;

        return Inertia::render('client/staff/staff', [
            'document_types' => fn () => $this->documentTypesRepository->all(),
            'persons' => fn () => [
                'data' => $coll,
                'meta' => $coll->getMetadata(),
            ],
            'filters' => [
                'per_page' => to_int($request->query('per_page', $coll->perPage())),
                'page' => to_int($request->query('page', $coll->currentPage())),
                'contains' => $request->query('contains', [
                    'items' => $request->query('contains.items', [
                        'first_name',
                        'middle_name',
                        'last_name_paternal',
                        'last_name_maternal',
                        'document_number',
                    ]),
                    'text' => $request->query('contains.text', ''),
                ]),
                'sort' => $request->query('sort'),
                'document_types' => $request->query('document_types', []),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $documentTypes = $this->documentTypesRepository->all();

        return Inertia::render('client/staff/staff-create', [
            'document_types' => $documentTypes,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStaffRequest $request)
    {
        $input = $request->validated();

        $input['company_id'] = $request->user()->person->company_id;
        $data = CreatePersonData::from($input);

        DB::beginTransaction();

        try {
            $model = $this->personsRepository->create($data);
            if ($request->has('user')) {
                $userData = new CreateUserData(
                    personId: $model->id,
                    email: $request->input('user.email'),
                    password: $request->input('user.password'),
                );

                $this->usersRepository->create($userData);
            }

            DB::commit();

            return back()->with('flash', [
                'status' => 'success',
                'message' => sprintf(
                    'Staff member %s %s created successfully.',
                    $model->first_name,
                    $model->last_name_paternal,
                ),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->with('flash', [
                'status' => 'error',
                'message' => 'An error occurred while creating the staff member: ' . $e->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return redirect()->route('client.staff.edit', $id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id, Request $request)
    {
        $person = $this->personsRepository
            ->setWithCompany(true)
            ->setCompanyId($request->user()->person->company_id)
            ->find($id)
        ;

        if (!$person) {
            abort(404, 'Person not found');
        }

        $documentTypes = $this->documentTypesRepository->all();

        return Inertia::render('client/staff/staff-edit', [
            'person' => $person,
            'document_types' => $documentTypes,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(int $id, UpdateStaffRequest $request)
    {
        $input = $request->validated();
        $model = $this->personsRepository->getModel($id);
        if (!$model) {
            return back()->with('flash', [
                'status' => 'error',
                'message' => 'El personal no existe o ha sido eliminado.',
            ]);
        }

        $data = UpdatePersonData::from($input);

        $this->personsRepository->update($model, $data);

        return back()->with('flash', [
            'status' => 'success',
            'message' => sprintf(
                'Staff member %s %s updated successfully.',
                $model->first_name,
                $model->last_name_paternal,
            ),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id, Request $request)
    {
        $model = $this->personsRepository->getModel($id);
        if (!$model) {
            return back()->with('flash', [
                'status' => 'error',
                'message' => 'El personal no existe o ha sido eliminado.',
            ]);
        }

        if ($id === $request->user()->person->id) {
            return back()->with('flash', [
                'status' => 'error',
                'message' => 'No se puede eliminar a sí mismo.',
            ]);
        }

        $this->personsRepository->delete($model);

        return back()->with('flash', [
            'status' => 'success',
            'message' => sprintf(
                'Staff member %s %s deleted successfully.',
                $model->first_name,
                $model->last_name_paternal,
            ),
        ]);
    }
}
