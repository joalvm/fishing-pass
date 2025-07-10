<?php

namespace App\Http\Controllers\Admin\Companies;

use App\Http\Controllers\Controller;
use App\Interfaces\Companies\CompaniesInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompaniesController extends Controller
{
    public function __construct(
        protected CompaniesInterface $companiesRepository,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $collection = $this->companiesRepository
            ->setDocumentTypes($request->input('document_types'))
            ->setEntityType($request->input('entity_type'))
            ->setEnabled($request->input('enabled'))
            ->setRegisteredViaForm($request->input('registered_via_form'))
            ->all()
        ;

        return Inertia::render(
            'admin/companies/companies/companies',
            [
                'companies' => fn () => [
                    'data' => $collection,
                    'meta' => $collection->getMetadata(),
                ],
                'filters' => [
                    'per_page' => to_int($request->input('per_page', $collection->perPage())),
                    'page' => to_int($request->input('page', $collection->currentPage())),
                    'contains' => $request->input('contains', [
                        'items' => $request->input('contains.items', ['business_name', 'document_number']),
                        'text' => $request->input('contains.text', ''),
                    ]),
                    'sort' => $request->input('sort', new \stdClass()),
                    'document_types' => $request->input('document_types'),
                    'entity_type' => $request->input('entity_type'),
                    'enabled' => $request->input('enabled'),
                    'registered_via_form' => $request->input('registered_via_form'),
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
