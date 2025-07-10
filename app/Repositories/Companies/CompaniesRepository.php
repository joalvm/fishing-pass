<?php

namespace App\Repositories\Companies;

use App\DataObjects\Repositories\Companies\CreateCompanyData;
use App\DataObjects\Repositories\Companies\UpdateCompanyData;
use App\DataObjects\Repositories\Person\CreatePersonData;
use App\Enums\Company\EntityType;
use App\Enums\Person\Gender;
use App\Interfaces\Companies\CompaniesInterface;
use App\Interfaces\Persons\PersonsInterface;
use App\Models\Company\Company;
use Joalvm\Utils\Builder;
use Joalvm\Utils\Collection;
use Joalvm\Utils\Item;

class CompaniesRepository implements CompaniesInterface
{
    /**
     * Filtro por tipo de entidad.
     */
    private ?EntityType $entityType = null;

    /**
     * Filtro por tipos de documentos.
     *
     * @var array<int>
     */
    private array $documentTypes = [];

    /**
     * Filtro por estado.
     */
    private ?bool $enabled = null;

    /**
     * Filtro por empresas creadas por el formulario de registro.
     */
    private ?bool $registeredViaForm = null;

    public function __construct(
        public Company $model,
        public PersonsInterface $personsRepository,
    ) {
    }

    public function all(): Collection
    {
        return $this->builder()->all();
    }

    public function find(int $id): ?Item
    {
        return $this->builder()->find($id);
    }

    public function create(CreateCompanyData $data): Company
    {
        $model = $this->model->newInstance($data->all());

        $model->validate()->save();

        if ($data->createUser) {
            $personData = new CreatePersonData(
                companyId: $model->id,
                documentTypeId: $data->documentTypeId,
                documentNumber: $data->documentNumber,
                firstName: 'Admin',
                lastNamePaternal: 'System',
                gender: Gender::MALE,
                email: $model->email,
                createUser: true,
            );

            $this->personsRepository->create($personData);
        }

        return $model;
    }

    public function update(Company $model, UpdateCompanyData $data): Company
    {
        $model->update($data->all());

        return $model;
    }

    public function delete(Company $model): Company
    {
        if ($model->delete()) {
            $model->persons()->delete();
        }

        return $model;
    }

    public function getModel(int $id): ?Company
    {
        return $this->model->newQuery()->find($id);
    }

    public function setEntityType(mixed $entityType): static
    {
        $this->entityType = EntityType::get($entityType);

        return $this;
    }

    public function setDocumentTypes(mixed $documentTypes): static
    {
        $this->documentTypes = to_list_int($documentTypes);

        return $this;
    }

    public function setEnabled(mixed $enabled): static
    {
        $this->enabled = to_bool($enabled);

        return $this;
    }

    public function setRegisteredViaForm(mixed $registeredViaForm): static
    {
        $this->registeredViaForm = to_bool($registeredViaForm);

        return $this;
    }

    public function getModelByDocumentNumber(string $documentNumber): ?Company
    {
        return $this->model
            ->newQuery()
            ->where('document_number', $documentNumber)
            ->first()
        ;
    }

    private function builder(): Builder
    {
        return $this->filters(
            Builder::table('public.companies', 'c')
                ->schema($this->schema())
                ->join('public.document_types as dt', 'dt.id', 'c.document_type_id')
                ->disableSchemaFilter()
        )->whereNull('c.deleted_at');
    }

    private function filters(Builder $builder): Builder
    {
        if ($this->entityType) {
            $builder->where('c.entity_type', $this->entityType);
        }

        if ($this->documentTypes) {
            $builder->whereIn('c.document_type_id', $this->documentTypes);
        }

        if (null !== $this->enabled) {
            $builder->whereRaw('c.enabled IS ?', [$this->enabled]);
        }

        if (null !== $this->registeredViaForm) {
            $builder->whereRaw('c.registration_request_id IS ?', [$this->registeredViaForm]);
        }

        return $builder;
    }

    private function schema(): array
    {
        return [
            'id',
            'entity_type',
            'business_name',
            'document_number',
            'address',
            'phone',
            'email',
            'enabled',
            'registration_request_id',
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
