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
}
