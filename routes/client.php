<?php

use App\Http\Controllers\Client\AccessRequestController;
use App\Http\Controllers\Client\DashboardController;
use App\Http\Controllers\Client\StaffController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'platform:client'])
    ->prefix('client')
    ->name('client.')
    ->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::resource('access-requests', AccessRequestController::class)->names('access-requests');
        Route::resource('staff', StaffController::class)->names('staff');
    })
;
