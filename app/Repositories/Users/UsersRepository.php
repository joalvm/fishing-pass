<?php

namespace App\Repositories\Users;

use App\DataObjects\Repositories\User\CreateUserData;
use App\Models\User\User;
use App\Interfaces\Users\UsersInterface;
use Illuminate\Support\Facades\Hash;

class UsersRepository implements UsersInterface
{
    public function __construct(public User $model)
    {
    }

    public function create(CreateUserData $data): User
    {
        $realPassword = $data->password;

        if (!$data->password) {
            $data->password = $this->generatePassword();
            $realPassword = $data->password;
        }

        $data->password = Hash::make($data->password);

        $model = $this->model->newInstance($data->toArray());

        $model->validate()->save();

        $model->realPassword = $realPassword;

        return $model;
    }

    private function generatePassword(): string
    {
        $lowerAlpha = 'abcdefghijklmnopqrstuvwxyz';
        $upperAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $numbers = '0123456789';
        $specialChars = '!@#$%*_:;?><,.-=';

        $password = [];

        $password[] = $specialChars[rand(0, strlen($specialChars) - 1)];
        $password[] = $upperAlpha[rand(0, strlen($upperAlpha) - 1)];
        $password[] = $numbers[rand(0, strlen($numbers) - 1)];
        $password[] = $lowerAlpha[rand(0, strlen($lowerAlpha) - 1)];
        $password[] = $lowerAlpha[rand(0, strlen($lowerAlpha) - 1)];
        $password[] = $lowerAlpha[rand(0, strlen($lowerAlpha) - 1)];

        // Mezclar los caracteres
        shuffle($password);

        return implode('', $password);
    }
}
