<?php

namespace App\Interfaces\Companies;

use App\DataObjects\Repositories\Companies\CreateRegistrationRequestData;
use App\DataObjects\Repositories\Companies\UpdateRegistrationRequestData;
use App\Enums\Company\RegistrationStatus;
use App\Models\Company\RegistrationRequest;
use Joalvm\Utils\Collection;
use Joalvm\Utils\Item;

interface RegistrationRequestInterface
{
    /**
     * Obtiene todos los recursos de solicitudes de registro.
     */
    public function all(): Collection;

    /**
     * Obtiene un recurso de solicitud de registro por su ID.
     */
    public function find(int $id): ?Item;

    /**
     * Obtiene las estadísticas de las solicitudes de registro.
     */
    public function stats(): ?Item;

    /**
     * Crea una nueva solicitud de registro.
     */
    public function create(CreateRegistrationRequestData $data): RegistrationRequest;

    /**
     * Actualiza una solicitud de registro existente.
     */
    public function update(
        RegistrationRequest $model,
        UpdateRegistrationRequestData $data,
    ): RegistrationRequest;

    /**
     * Aprueba una solicitud de registro.
     */
    public function approve(
        RegistrationRequest $model,
        int $approvedBy,
    ): RegistrationRequest;

    /**
     * Rechaza una solicitud de registro.
     */
    public function reject(
        RegistrationRequest $model,
        int $rejectedBy,
        string $reason,
    ): RegistrationRequest;

    /**
     * Elimina una solicitud de registro.
     */
    public function delete(RegistrationRequest $model): RegistrationRequest;

    /**
     * Obtiene el modelo de solicitud de registro por su ID.
     */
    public function getModel(int $id): ?RegistrationRequest;

    /**
     * Obtiene el modelo de solicitud de registro por el número de documento de la empresa.
     */
    public function getModelByDocumentNumber(string $documentNumber): ?RegistrationRequest;

    /**
     * Establece el filtro de búsqueda por estado de solicitud.
     *
     * @param array<value-of<RegistrationStatus>> $statuses
     */
    public function setStatuses(mixed $statuses): static;
}
