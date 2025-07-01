<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'platform:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('settings')
            ->name('settings.')
            ->group(function () {
                Route::get('profile', [DashboardController::class, 'profile'])->name('profile');
                Route::get('password', [DashboardController::class, 'password'])->name('password');
                Route::get('appearance', [DashboardController::class, 'appearance'])->name('appearance');

                Route::redirect('/', 'settings/profile')->name('index');
            })
        ;
    })
;
