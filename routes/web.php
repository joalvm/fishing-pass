<?php

// @phpcs:disable PSR1.Files.lineLength

use Illuminate\Support\Facades\Route;

Route::get('/', [App\Http\Controllers\LoginController::class, 'create'])->name('login');
Route::get('/register', [App\Http\Controllers\RegisterController::class, 'create'])->name('register.create');
Route::post('/register', [App\Http\Controllers\RegisterController::class, 'store'])
    ->name('register.store')
    ->middleware('throttle:6,1')
;
