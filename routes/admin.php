<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\Settings\PasswordController;
use App\Http\Controllers\Admin\Settings\ProfileController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'platform:admin'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

        Route::prefix('settings')
            ->name('settings.')
            ->group(function () {
                Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
                Route::put('profile', [ProfileController::class, 'update'])->name('profile.update');

                Route::get('password', [PasswordController::class, 'edit'])->name('password.edit');
                Route::put('password', [PasswordController::class, 'update'])->name('password.update');

                Route::get('appearance', [DashboardController::class, 'appearance'])->name('appearance');

                Route::redirect('/', 'settings/profile')->name('index');
            })
        ;
    })
;
