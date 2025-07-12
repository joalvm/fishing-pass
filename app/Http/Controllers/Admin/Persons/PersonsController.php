<?php

namespace App\Http\Controllers\Admin\Persons;

use App\DataObjects\Repositories\Person\CreatePersonData;
use App\DataObjects\Repositories\Person\UpdatePersonData;
use App\DataObjects\Repositories\User\CreateUserData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Persons\StorePersonRequest;
use App\Http\Requests\Admin\Persons\UpdatePersonRequest;
use App\Interfaces\DocumentTypesInterface;
use App\Interfaces\Persons\PersonsInterface;
use App\Interfaces\Users\UsersInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PersonsController extends Controller
{
    public function __construct(
        protected PersonsInterface $personsRepository,
        protected UsersInterface $userRepository,
        protected DocumentTypesInterface $documentTypeRepository,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $collection = $this->personsRepository
            ->setDocumentTypes($request->query('document_types'))
            ->setGender($request->query('gender'))
            ->all()
        ;

        return Inertia::render('admin/persons/persons', [
            'document_types' => fn () => $this->documentTypeRepository->all(),
            'persons' => fn () => [
                'data' => $collection,
                'meta' => $collection->getMetadata(),
            ],
            'filters' => [
                'per_page' => to_int($request->query('per_page', $collection->perPage())),
                'page' => to_int($request->query('page', $collection->currentPage())),
                'contains' => $request->query('contains', [
                    'items' => $request->query('contains.items', [
                        'first_name',
                        'middle_name',
                        'last_name_paternal',
                        'last_name_maternal',
                        'document_number',
                        'email',
                    ]),
                    'text' => $request->query('contains.text', ''),
                ]),
                'sort' => $request->query('sort'),
                'document_types' => $request->query('document_types', []),
                'gender' => $request->query('gender'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/persons/persons-create', [
            'document_types' => fn () => $this->documentTypeRepository->all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePersonRequest $request)
    {
        $input = $request->validated();
        $data = CreatePersonData::from(Arr::except($input, 'user'));

        DB::beginTransaction();

        try {
            $person = $this->personsRepository->create($data);

            if ($request->has('user')) {
                $userData = new CreateUserData(
                    personId: $person->id,
                    email: $input['user']['email'],
                    password: Arr::get($input['user'], 'password'),
                );

                $this->userRepository->create($userData);
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();

            return redirect()->back()
                ->withInput()
                ->with('flash', ['error' => true, 'message' => __('An error occurred while creating the person.')])
            ;
        }

        return redirect()->back()
            ->with('flash', ['error' => false, 'message' => __('Person created successfully')])
        ;
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return redirect()->route('admin.persons.edit', $id)
            ->withInput()
        ;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        $person = $this->personsRepository->find($id);
        if (!$person) {
            abort(404, 'Person not found');
        }

        return Inertia::render('admin/persons/persons-edit', [
            'person' => fn () => $person,
            'document_types' => fn () => $this->documentTypeRepository->all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePersonRequest $request, string $id)
    {
        $person = $this->personsRepository->getModel($id);
        if (!$person) {
            abort(404, 'Person not found');
        }

        $input = $request->validated();
        $data = UpdatePersonData::from($input);

        $this->personsRepository->update($person, $data);

        return redirect()->back()
            ->with('flash', ['error' => false, 'message' => __('Person updated successfully')])
        ;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $person = $this->personsRepository->getModel($id);
        if (!$person) {
            abort(404, 'Person not found');
        }

        $this->personsRepository->delete($person);

        return redirect()->back()
            ->with('flash', ['error' => false, 'message' => __('Person deleted successfully')])
        ;
    }
}
