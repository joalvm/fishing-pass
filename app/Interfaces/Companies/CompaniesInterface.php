<?php

namespace App\Interfaces\Companies;

use App\DataObjects\Repositories\Companies\CreateCompanyData;
use App\DataObjects\Repositories\Companies\UpdateCompanyData;
use App\Models\Company\Company;
use Joalvm\Utils\Collection;
use Joalvm\Utils\Item;

interface CompaniesInterface
{
    /**
     * Obtiene todos los registros de empresas.
     */
    public function all(): Collection;

    /**
     * Obtiene un registro de empresa por su ID.
     */
    public function find(int $id): ?Item;

    /**
     * Crea una nueva empresa en la base de datos.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function create(CreateCompanyData $data): Company;

    /**
     * Actualiza un registro de empresa por su ID.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function update(Company $model, UpdateCompanyData $data): Company;

    /**
     * Elimina un registro de empresa por su ID.
     */
    public function delete(Company $model): Company;

    /**
     * Estable el filtro por tipo de entidad.
     */
    public function setEntityType(mixed $entityType): static;

    /**
     * Estable el filtro por tipo de documento.
     */
    public function setDocumentTypes(mixed $documentTypes): static;

    /**
     * Estable el filtro por estado.
     */
    public function setEnabled(mixed $enabled): static;

    /**
     * Estable el filtro por empresas creadas por el formulario de registro.
     */
    public function setRegisteredViaForm(mixed $registeredViaForm): static;

    /**
     * Obtiene la instancia del modelo Company.
     */
    public function getModel(int $id): ?Company;

    /**
     * Busca una empresa por su número de documento.
     */
    public function getModelByDocumentNumber(string $documentNumber): ?Company;
}
