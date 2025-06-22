<?php

namespace App\Interfaces\Companies;

use App\DataObjects\Repositories\Companies\CreateCompanyData;
use App\Models\Company\Company;

interface CompaniesInterface
{
    /**
     * Crea una nueva empresa en la base de datos.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(CreateCompanyData $data): Company;

    /**
     * Busca una empresa por su número de documento.
     */
    public function getModelByDocumentNumber(string $documentNumber): ?Company;
}
