<?php

namespace App\Http\Controllers\Admin\Clients;

use App\Http\Controllers\Controller;
use App\Enums\Company\RegistrationStatus;
use App\Interfaces\Companies\RegistrationRequestInterface;
use Illuminate\Http\Request;
use App\Http\Requests\Admin\Clients\UpdateRegistrationRequestStatusRequest;
use App\Models\Company\RegistrationRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

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
    public function update(
        int $id,
        UpdateRegistrationRequestStatusRequest $request,
    ): RedirectResponse {
        $input = $request->validated();
        $user = $request->user();

        $model = $this->requestRepository->getModel($id);
        if (!$model) {
            return back()->with('flash', ['error' => true, 'message' => 'Solicitud no encontrada.']);
        }

        if ($model->status !== RegistrationStatus::PENDING) {
            return back()->with('flash', ['error' => true, 'message' => 'Solicitud no puede ser actualizada.']);
        }

        if ($input['status'] === RegistrationStatus::REJECTED->value) {
            $this->requestRepository->reject(
                $model,
                $user->id,
                $input['rejection_reason']
            );
        } else {
            $this->requestRepository->approve($model, $user->id);
        }

        return to_route('admin.clients.requests.index')
            ->with('flash', ['success' => true, 'message' => 'Solicitud actualizada correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RegistrationRequest $registrationRequest): RedirectResponse
    {
        $this->requestRepository->delete($registrationRequest);

        return redirect()
            ->route('admin.clients.requests.index')
            ->with('success', 'Solicitud eliminada correctamente.');
    }
}
