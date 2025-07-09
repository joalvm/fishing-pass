<?php

namespace App\Interfaces\Persons;

use App\DataObjects\Repositories\Person\CreatePersonData;
use App\Models\Person\Person;

interface PersonsInterface
{
    public function create(CreatePersonData $data): Person;
}
