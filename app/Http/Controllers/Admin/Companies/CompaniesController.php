<?php

namespace App\Http\Controllers\Admin\Companies;

use App\Http\Controllers\Controller;
use App\Interfaces\Companies\CompaniesInterface;
use App\Interfaces\DocumentTypesInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompaniesController extends Controller
{
    public function __construct(
        protected CompaniesInterface $companiesRepository,
        protected DocumentTypesInterface $documentTypesRepository,
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
    public function edit(int $id)
    {
        $company = $this->companiesRepository->find($id);
        if (!$company) {
            return redirect()->back()->with('flash', ['error' => true, 'message' => 'Empresa no encontrada.']);
        }

        return Inertia::render('admin/companies/companies/companies-edit/companies-edit', [
            'company' => $company,
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
    public function destroy(string $id)
    {
    }
}
