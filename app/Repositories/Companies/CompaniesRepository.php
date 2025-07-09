<?php

namespace App\Repositories\Companies;

use App\DataObjects\Repositories\Companies\CreateCompanyData;
use App\DataObjects\Repositories\Person\CreatePersonData;
use App\Enums\Person\Gender;
use App\Interfaces\Companies\CompaniesInterface;
use App\Interfaces\Persons\PersonsInterface;
use App\Models\Company\Company;

class CompaniesRepository implements CompaniesInterface
{
    public function __construct(
        public Company $model,
        public PersonsInterface $personsRepository,
    ) {
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

    public function getModelByDocumentNumber(string $documentNumber): ?Company
    {
        return $this->model
            ->newQuery()
            ->where('document_number', $documentNumber)
            ->first()
        ;
    }
}
