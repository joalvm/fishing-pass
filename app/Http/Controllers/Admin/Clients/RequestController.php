<?php

namespace App\Http\Controllers\Admin\Clients;

use App\Http\Controllers\Controller;
use App\Interfaces\Companies\RegistrationRequestInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RequestController extends Controller
{
    public function __construct(
        protected RegistrationRequestInterface $requestRepository,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $collection = $this->requestRepository
            ->setStatuses($request->input('statuses'))
            ->all()
        ;

        return Inertia::render('admin/clients/requests/requests', [
            'stats' => $this->requestRepository->stats(),
            'requests' => [
                'data' => $collection,
                'meta' => $collection->getMetadata(),
            ],
            'filters' => [
                'per_page' => to_int($request->input('per_page', $collection->perPage())),
                'page' => to_int($request->input('page', $collection->currentPage())),
                'contains' => $request->input('contains', [
                    'items' => $request->input('contains.items', ['business_name', 'document_number', 'email']),
                    'text' => $request->input('contains.text', ''),
                ]),
                'sort' => $request->input('sort', new \stdClass()),
                'statuses' => $request->input('statuses', []),
            ],
        ]);
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
    public function edit(string $id)
    {
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
