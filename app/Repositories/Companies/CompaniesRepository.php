<?php

namespace App\Repositories\Companies;

use App\DataObjects\Repositories\Companies\CreateCompanyData;
use App\Interfaces\Companies\CompaniesInterface;
use App\Models\Company\Company;

class CompaniesRepository implements CompaniesInterface
{
    public function __construct(public Company $model)
    {
    }

    public function create(CreateCompanyData $data): Company
    {
        $model = $this->model->newInstance($data->all());

        $model->validate()->save();

        return $model;
    }

    public function getModelByDocumentNumber(string $documentNumber): ?Company
    {
        return $this->model
            ->newQuery()
            ->where('document_number', $documentNumber)
            ->first()
        ;
    }
}
