<?php

namespace App\Http\Controllers\Admin;

use App\Interfaces\DocumentTypesInterface;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController
{
    public function __construct(protected DocumentTypesInterface $documentTypeRepository)
    {
    }

    public function index(): Response
    {
        return Inertia::render('admin/dashboard');
    }

    public function profile(): Response
    {
        return Inertia::render('admin/settings/profile', [
            'documentTypes' => $this->documentTypeRepository->all(),
        ]);
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
