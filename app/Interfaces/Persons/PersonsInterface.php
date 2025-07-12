<?php

namespace App\Interfaces\Persons;

use App\DataObjects\Repositories\Person\CreatePersonData;
use App\DataObjects\Repositories\Person\UpdatePersonData;
use App\Models\Person\Person;
use Joalvm\Utils\Collection;
use Joalvm\Utils\Item;

interface PersonsInterface
{
    /**
     * Obtiene todas las personas.
     */
    public function all(): Collection;

    /**
     * Obtiene una persona por su ID.
     */
    public function find(int $id): ?Item;

    /**
     * Crea una persona.
     */
    public function create(CreatePersonData $data): Person;

    /**
     * Actualiza una persona.
     */
    public function update(Person $model, UpdatePersonData $data): Person;

    /**
     * Elimina una persona.
     */
    public function delete(Person $model): Person;

    /**
     * Filtra personas por tipo de documento.
     */
    public function setDocumentTypes(mixed $documentTypes): static;

    /**
     * Filtra personas por género.
     */
    public function setGender(mixed $gender): static;
}
