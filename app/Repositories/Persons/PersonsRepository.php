<?php

namespace App\Repositories\Persons;

use App\DataObjects\Repositories\Person\CreatePersonData;
use App\DataObjects\Repositories\Person\UpdatePersonData;
use App\Enums\Person\Gender;
use App\Interfaces\Persons\PersonsInterface;
use App\Interfaces\Users\UsersInterface;
use App\Models\Person\Person;
use Illuminate\Support\Facades\DB;
use Joalvm\Utils\Builder;
use Joalvm\Utils\Collection;
use Joalvm\Utils\Item;

class PersonsRepository implements PersonsInterface
{
    /**
     * Filtro por id de tipos de documentos.
     *
     * @var array<int>
     */
    private array $documentTypes = [];

    /**
     * Filtro por género.
     */
    private ?Gender $gender = null;

    /**
     * Filtro por id de empresa.
     */
    private ?int $companyId = null;

    /**
     * Filtro de personas ligadas a una empresa.
     */
    private ?bool $withCompany = null;

    public function __construct(
        public Person $model,
        public UsersInterface $usersRepository,
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

    public function create(CreatePersonData $data): Person
    {
        $model = $this->model->newInstance($data->all());

        $model->validate()->save();

        return $model;
    }

    public function update(Person $model, UpdatePersonData $data): Person
    {
        $model->fill($data->all());

        $model->validate()->save();

        return $model;
    }

    public function delete(Person $model): Person
    {
        if ($model->delete()) {
            $model->user()->delete();
        }

        return $model;
    }

    public function getModel(int $id): ?Person
    {
        return $this->model->newQuery()->find($id);
    }

    public function setDocumentTypes(mixed $documentTypes): static
    {
        $this->documentTypes = to_list_int($documentTypes);

        return $this;
    }

    public function setGender(mixed $gender): static
    {
        $this->gender = Gender::get($gender);

        return $this;
    }

    public function setCompanyId(int $companyId): static
    {
        $this->companyId = $companyId;

        return $this;
    }

    public function setWithCompany(bool $withCompany): static
    {
        $this->withCompany = $withCompany;

        return $this;
    }

    private function builder(): Builder
    {
        return $this->filters(
            Builder::table('public.persons', 'p')
                ->schema($this->schema())
                ->join('public.document_types as dt', 'dt.id', 'p.document_type_id')
                ->orderBy('p.updated_at', 'desc')
                ->disableSchemaFilter()
        )->whereNull(['p.deleted_at']);
    }

    private function filters(Builder $builder): Builder
    {
        if ($this->companyId) {
            $builder->where('p.company_id', $this->companyId);
        }

        if ($this->documentTypes) {
            $builder->whereIn('p.document_type_id', $this->documentTypes);
        }

        if ($this->gender) {
            $builder->where('p.gender', $this->gender->value);
        }

        if (!is_null($this->withCompany)) {
            $builder->where('p.company_id', 'is', DB::raw($this->withCompany ? 'not null' : 'null'));
        }

        return $builder;
    }

    private function schema(): array
    {
        return [
            'id',
            'first_name',
            'middle_name',
            'last_name_paternal',
            'last_name_maternal',
            'gender',
            'email',
            'phone',
            'document_number',
            'document_type:dt' => [
                'id',
                'name',
                'abbr',
                'with_user' => function (Builder $query) {
                    $query->selectRaw(
                        sprintf(
                            'exists (%s)',
                            $query->newQuery()
                                ->selectRaw('1')
                                ->from('public.users as u')
                                ->whereColumn('u.person_id', 'p.id')
                                ->whereNull('u.deleted_at')
                                ->toRawSql()
                        )
                    );
                },
            ],
            'created_at',
            'updated_at',
        ];
    }
}
