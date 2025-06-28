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

        if ('admin' === $platform and (!$person || !$person->company_id)) {
            return $next($request);
        }

        if ('client' === $platform and $person and $person->company_id) {
            return $next($request);
        }

        abort(403, 'No tienes acceso a esta sección.');
    }
}
