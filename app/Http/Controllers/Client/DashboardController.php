<?php

namespace App\Http\Controllers\Client;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController
{
    public function index(Request $request): Response
    {
        return Inertia::render('client/dashboard/dashboard');
    }
}
