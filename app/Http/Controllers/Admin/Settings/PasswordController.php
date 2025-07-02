<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Settings\PasswordUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class PasswordController extends Controller
{
    public function edit(): \Inertia\Response
    {
        return Inertia::render('admin/settings/password');
    }

    public function update(PasswordUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        $request->user()->save();

        return to_route('admin.settings.password.edit');
    }
}
