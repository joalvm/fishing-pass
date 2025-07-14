<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Settings\ProfileUpdateRequest;
use App\Interfaces\DocumentTypesInterface;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function __construct(protected DocumentTypesInterface $documentTypeRepository)
    {
    }

    public function edit(): \Inertia\Response
    {
        return Inertia::render('settings/profile', [
            'documentTypes' => $this->documentTypeRepository->all(),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());
        $request->user()->person->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->person->update();
        $request->user()->update();

        return back()->with('success', 'Perfil actualizado correctamente.');
    }
}
