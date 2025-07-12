<?php

namespace App\Http\Controllers\Admin\Persons;

use App\Http\Controllers\Controller;
use App\Interfaces\DocumentTypesInterface;
use App\Interfaces\Persons\PersonsInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PersonsController extends Controller
{
    public function __construct(
        protected PersonsInterface $personsRepository,
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
    public function store(Request $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $person = $this->personsRepository->find($id);
        if (!$person) {
            abort(404, 'Person not found');
        }

        return Inertia::render('admin/persons/persons-edit', [
            'person' => $person,
            'document_types' => fn () => $this->documentTypeRepository->all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
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
