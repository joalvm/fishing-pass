<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Inertia\Response;

class DashboardController
{
    public function index(): Response
    {
        return Inertia::render('admin/dashboard');
    }

    public function profile(): Response
    {
        return Inertia::render('admin/settings/profile');
    }

    public function password(): Response
    {
        return Inertia::render('admin/settings/password');
    }

    public function appearance(): Response
    {
        return Inertia::render('admin/settings/appearance');
    }
}
