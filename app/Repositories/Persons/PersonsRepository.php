<?php

namespace App\Repositories\Persons;

use App\DataObjects\Repositories\Person\CreatePersonData;
use App\DataObjects\Repositories\User\CreateUserData;
use App\Interfaces\Persons\PersonsInterface;
use App\Interfaces\Users\UsersInterface;
use App\Models\Person\Person;

class PersonsRepository implements PersonsInterface
{
    public function __construct(
        public Person $model,
        public UsersInterface $usersRepository,
    ) {
    }

    public function create(CreatePersonData $data): Person
    {
        $model = $this->model->newInstance($data->all());

        $model->validate()->save();

        if ($data->createUser) {
            $userData = new CreateUserData(
                personId: $model->id,
                email: $model->email,
                password: $data->password,
                isSuperAdmin: $data->isSuperAdmin,
            );

            $this->usersRepository->create($userData);
        }

        return $model;
    }
}
