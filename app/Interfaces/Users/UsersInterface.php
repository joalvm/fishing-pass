<?php

namespace App\Interfaces\Users;

use App\DataObjects\Repositories\User\CreateUserData;
use App\Models\User\User;

interface UsersInterface
{
    public function create(CreateUserData $data): User;
}
