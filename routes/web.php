<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [App\Http\Controllers\HomeController::class, 'login'])->name('home');
Route::get('/register', [App\Http\Controllers\HomeController::class, 'register'])->name('register');

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__ . '/settings.php';
// require __DIR__ . '/auth.php';
