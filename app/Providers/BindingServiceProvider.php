<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class BindingServiceProvider extends ServiceProvider
{
    public $bindings = [
        \App\Interfaces\DocumentTypesInterface::class => \App\Repositories\DocumentTypesRepository::class,
        \App\Interfaces\Companies\CompaniesInterface::class => \App\Repositories\Companies\CompaniesRepository::class,
        \App\Interfaces\Companies\RegistrationRequestInterface::class => \App\Repositories\Companies\RegistrationRequestRepository::class,
        \App\Interfaces\Persons\PersonsInterface::class => \App\Repositories\Persons\PersonsRepository::class,
        \App\Interfaces\Users\UsersInterface::class => \App\Repositories\Users\UsersRepository::class,
    ];
}
