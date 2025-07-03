<?php

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Settings\PasswordUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PasswordController extends Controller
{
    public function edit(): \Inertia\Response
    {
        return Inertia::render('admin/settings/password');
    }

    public function update(PasswordUpdateRequest $request): RedirectResponse
    {
        if (!Hash::check($request->input('current_password'), $request->user()->password)) {
            return back()->withErrors(['current_password' => 'La contraseña actual es incorrecta.']);
        }

        $validated = $request->validated();

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return to_route('admin.settings.password.edit');
    }
}
