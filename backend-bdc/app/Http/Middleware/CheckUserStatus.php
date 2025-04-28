<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckUserStatus
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle($request, Closure $next)
{
    // Si l'utilisateur est inactif → accès refusé
    if (auth()->check() && auth()->user()->statut !== 'actif') {
        return response()->json(['message' => 'Votre compte est désactivé; veuillez contacter votre administrateur.'], 403);
    }

    return $next($request);
}
}
