<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\DocumentTypesInterface;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(protected DocumentTypesInterface $documentTypeRepository)
    {
    }

    public function index(): Response
    {
        return Inertia::render('admin/dashboard/dashboard');
    }

    public function appearance(): Response
    {
        return Inertia::render('admin/settings/appearance');
    }
}
