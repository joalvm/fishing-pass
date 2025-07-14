<?php

use App\Http\Controllers\Admin\Companies\CompaniesController;
use App\Http\Controllers\Admin\Companies\RequestController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Persons\PersonsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'platform:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::resource('companies/requests', RequestController::class)->names('companies.requests');
        Route::resource('companies', CompaniesController::class)->names('companies');
        Route::resource('persons', PersonsController::class)->names('persons');
    })
;
