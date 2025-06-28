<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserPlatform
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, \Closure $next, string $platform)
    {
        $user = Auth::user();
        $person = $user?->person;

        if ('admin' === $platform && (!$person || !$person->company_id)) {
            return $next($request);
        }

        if ('client' === $platform && $person && $person->company_id) {
            return $next($request);
        }

        // Redirección amigable según el tipo de usuario
        if ($user) {
            if ($person && $person->company_id) {
                return redirect()->intended(route('client.dashboard', absolute: false));
            }

            return redirect()->intended(route('admin.dashboard', absolute: false));
        }

        return redirect()
            ->intended(route('login.create', absolute: false))
            ->with('error', 'Acceso denegado. No tienes permiso para acceder a esta sección.')
        ;
    }
}
