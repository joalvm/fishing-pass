<?php

// @phpcs:disable PSR1.Files.lineLength

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login.create');
})->name('root');

Route::middleware('cguest')->group(function () {
    Route::get('/login', [App\Http\Controllers\LoginController::class, 'create'])->name('login.create');
    Route::post('/login', [App\Http\Controllers\LoginController::class, 'store'])
        ->name('login.store')
        ->middleware('throttle:6,1')
    ;
    Route::get('/register', [App\Http\Controllers\RegisterController::class, 'create'])->name('register.create');
    Route::post('/register', [App\Http\Controllers\RegisterController::class, 'store'])
        ->name('register.store')
        ->middleware('throttle:6,1')
    ;
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [App\Http\Controllers\LoginController::class, 'destroy'])->name('logout');
});

require __DIR__ . '/admin.php';
require __DIR__ . '/client.php';
