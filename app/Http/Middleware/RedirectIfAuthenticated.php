<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\RedirectIfAuthenticated as MiddlewareRedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RedirectIfAuthenticated extends MiddlewareRedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(Request): (Response) $next
     */
    public function handle(Request $request, \Closure $next, string ...$guards): Response
    {
        $user = Auth::user();

        if ($user) {
            $person = $user->person;

            if ($person and $person->company_id) {
                return redirect()->intended(route('client.dashboard', absolute: false));
            }

            return redirect()->intended(route('admin.dashboard', absolute: false));
        }

        return $next($request);
    }
}
