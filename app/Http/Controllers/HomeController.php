<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     */
    public function login()
    {
        return Inertia::render('login', [
            'message' => 'Welcome to the application! Please log in to continue.',
        ]);
    }

    public function register()
    {
        return Inertia::render('register', [
            'message' => 'Registra a tu empresa para comenzar a usar la aplicación.',
        ]);
    }
}
