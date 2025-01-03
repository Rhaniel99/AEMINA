<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class EnsureUserProfileExists
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        
        // Verifica se o usuário tem ao menos um perfil
        if ($user && $user->profiles()->count() === 0) {
            // Redireciona para uma página que exibe o diálogo de criação
            return to_route('profile.create');
        }

        return $next($request);
    }
}
