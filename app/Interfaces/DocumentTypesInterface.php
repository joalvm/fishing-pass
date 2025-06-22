<?php

namespace App\Interfaces;

use App\DataObjects\Repositories\CreateDocumentTypeData;
use App\DataObjects\Repositories\UpdateDocumentTypeData;
use App\Models\DocumentType;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\ValidationException;
use Joalvm\Utils\Collection;
use Joalvm\Utils\Exceptions\ForbiddenException;
use Joalvm\Utils\Exceptions\NotAcceptableException;
use Joalvm\Utils\Item;

interface DocumentTypesInterface
{
    /**
     * Lista todos los recursos document_type.
     */
    public function all(): Collection;

    /**
     * Busca un recurso document_type.
     *
     * @param int $id
     */
    public function find($id): ?Item;

    /**
     * Crea un recurso document_type.
     *
     * @throws ValidationException
     * @throws ForbiddenException
     */
    public function create(CreateDocumentTypeData $data): DocumentType;

    /**
     * Actualiza un recurso document_type.
     *
     * @throws ValidationException
     */
    public function update(DocumentType $model, UpdateDocumentTypeData $data): DocumentType;

    /**
     * Elimina un recurso document_type.
     *
     * @throws NotAcceptableException
     */
    public function delete(DocumentType $model): DocumentType;

    /**
     * Obtiene el modelo document_type.
     */
    public function getModel(?int $id): ?DocumentType;

    /**
     * Obtiene el modelo document_type o falla.
     *
     * @throws ModelNotFoundException
     */
    public function getModelOrFail(?int $id): DocumentType;

    /**
     * Establece el filtro por tipo de caracteres.
     *
     * @param string|null $charType
     */
    public function setCharType(mixed $charType): static;

    /**
     * Establece el filtro por tipos de tamaños.
     *
     * @param string|null $lengthTypes
     */
    public function setLengthTypes(mixed $lengthTypes): static;
}
