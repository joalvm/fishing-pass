<?php

namespace App\Repositories\Companies;

use App\DataObjects\Repositories\Companies\CreateRegistrationRequestData;
use App\DataObjects\Repositories\Companies\UpdateRegistrationRequestData;
use App\Enums\Company\RegistrationStatus;
use App\Interfaces\Companies\RegistrationRequestInterface;
use App\Models\Company\RegistrationRequest;
use Illuminate\Support\Facades\DB;
use Joalvm\Utils\Builder;
use Joalvm\Utils\Collection;
use Joalvm\Utils\Item;

class RegistrationRequestRepository implements RegistrationRequestInterface
{
    public function __construct(public RegistrationRequest $model)
    {
    }

    public function all(): Collection
    {
        return $this->builder()->forcePaginate()->all();
    }

    public function find(int $id): ?Item
    {
        return $this->builder()->find($id);
    }

    public function stats(): ?Item
    {
        return Builder::table('public.company_registration_requests', 'crr')
            ->select([
                DB::raw('count(1) as total'),
                DB::raw("count(1) filter (where status = 'APPROVED') as approved"),
                DB::raw("count(1) filter (where status = 'REJECTED') as rejected"),
                DB::raw("count(1) filter (where status = 'PENDING') as pending"),
            ])
            ->whereNull('crr.deleted_at')
            ->first();
    }

    public function create(CreateRegistrationRequestData $data): RegistrationRequest
    {
        $model = $this->model->newInstance($data->all());
        $model->validate()->save();

        return $model;
    }

    public function update(
        RegistrationRequest $model,
        UpdateRegistrationRequestData $data,
    ): RegistrationRequest {
        $model->fill($data->all());

        $model->validate()->save();

        return $model;
    }

    public function approve(
        RegistrationRequest $model,
        int $approvedBy,
    ): RegistrationRequest {
        $data = UpdateRegistrationRequestData::from([
            ...$model->getAttributes(),
            'status' => RegistrationStatus::APPROVED,
            'approved_by' => $approvedBy,
            'approved_at' => now(),
        ]);

        return $this->update($model, $data);
    }

    public function reject(
        RegistrationRequest $model,
        int $rejectedBy,
        string $reason,
    ): RegistrationRequest {
        $data = UpdateRegistrationRequestData::from([
            ...$model->getAttributes(),
            'status' => RegistrationStatus::REJECTED,
            'rejected_reason' => $reason,
            'approved_by' => $rejectedBy,
            'approved_at' => now(),
        ]);

        return $this->update($model, $data);
    }

    public function delete(RegistrationRequest $model): RegistrationRequest
    {
        $model->delete();

        return $model;
    }

    public function getModel(int $id): ?RegistrationRequest
    {
        return $this->model->newQuery()->find($id);
    }

    public function getModelByDocumentNumber(string $documentNumber): ?RegistrationRequest
    {
        return $this->model->newQuery()->where('document_number', $documentNumber)->first();
    }

    /**
     * Filtro de búsqueda por estado de solicitud.
     *
     * @var array<value-of<RegistrationStatus>>
     */
    private array $statuses = [];

    public function setStatuses(mixed $statuses): static
    {
        $this->statuses = array_values(
            array_filter(
                to_list($statuses),
                fn ($status) => RegistrationStatus::has($status)
            )
        );

        return $this;
    }

    private function builder(): Builder
    {
        return $this->filters(
            Builder::table('public.company_registration_requests', 'crr')
            ->schema($this->schema())
            ->join('public.document_types as dt', 'dt.id', 'crr.document_type_id')
            ->whereNull('crr.deleted_at')
        );
    }

    private function filters(Builder $builder): Builder
    {
        if ($this->statuses) {
            $builder->whereIn('crr.status', $this->statuses);
        }

        return $builder;
    }

    private function schema(): array
    {
        return [
            'id',
            'business_name',
            'entity_type',
            'document_number',
            'address',
            'phone',
            'email',
            'status',
            'approved_at',
            'approved_by',
            'rejected_reason',
            'document_type:dt' => [
                'id',
                'name',
                'abbr',
            ],
            'created_at',
            'updated_at',
        ];
    }
}
