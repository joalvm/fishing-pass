<?php

namespace App\Http\Controllers\Admin\Companies;

use App\DataObjects\Repositories\Companies\CreateCompanyData;
use App\Enums\Company\RegistrationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Companies\UpdateRegistrationRequestStatusRequest;
use App\Interfaces\Companies\CompaniesInterface;
use App\Interfaces\Companies\RegistrationRequestInterface;
use App\Models\Company\Company;
use App\Models\Company\RegistrationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RequestController extends Controller
{
    public function __construct(
        protected RegistrationRequestInterface $requestRepository,
        protected CompaniesInterface $companiesRepository,
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $collection = $this->requestRepository
            ->setStatuses($request->query('statuses'))
            ->all()
        ;

        return Inertia::render('admin/companies/requests/requests', [
            'stats' => Inertia::always($this->requestRepository->stats()),
            'requests' => fn () => [
                'data' => $collection,
                'meta' => $collection->getMetadata(),
            ],
            'filters' => [
                'per_page' => to_int($request->query('per_page', $collection->perPage())),
                'page' => to_int($request->query('page', $collection->currentPage())),
                'contains' => $request->query('contains', [
                    'items' => $request->query('contains.items', ['business_name', 'document_number', 'email']),
                    'text' => $request->query('contains.text', ''),
                ]),
                'sort' => $request->query('sort', new \stdClass()),
                'statuses' => $request->query('statuses', []),
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

        if (RegistrationStatus::PENDING !== $model->status) {
            return back()->with('flash', ['error' => true, 'message' => 'Solicitud no puede ser actualizada.']);
        }

        if ($input['status'] === RegistrationStatus::REJECTED->value) {
            $this->requestRepository->reject(
                $model,
                $user->id,
                $input['rejection_reason']
            );
        } elseif ($input['status'] === RegistrationStatus::APPROVED->value) {
            $this->approveRequest($model, $request);
        }

        return redirect()
            ->back()
            ->with('flash', ['success' => true, 'message' => 'Solicitud actualizada correctamente.'])
        ;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id): RedirectResponse
    {
        $model = $this->requestRepository->getModel($id);
        if (!$model) {
            return back()->with('flash', ['error' => true, 'message' => 'Solicitud no encontrada.']);
        }

        $this->requestRepository->delete($model);

        return redirect()
            ->back()
            ->with('flash', ['success' => true, 'message' => 'Solicitud eliminada correctamente.'])
        ;
    }

    private function approveRequest(
        RegistrationRequest $model,
        UpdateRegistrationRequestStatusRequest $request,
    ): void {
        try {
            DB::beginTransaction();

            $this->requestRepository->approve(
                $model,
                $request->user()->id,
                $request->input('notify_by_email', true)
            );

            $company = $this->createCompany($model);

            if ($request->boolean('notify_by_email', true)) {
                // Dispatch job to send approval email
                // You'll need to create this notification
                // $model->notify(new RegistrationApproved($company));
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    private function createCompany(RegistrationRequest $model): Company
    {
        // Creamos la empresa:
        $companyData = new CreateCompanyData(
            entityType: $model->entity_type,
            businessName: $model->business_name,
            documentTypeId: $model->document_type_id,
            documentNumber: $model->document_number,
            email: $model->email,
            address: $model->address,
            phone: $model->phone,
        );

        return $this->companiesRepository->create($companyData);
    }
}
