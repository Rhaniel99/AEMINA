<?php

namespace App\Http\Middleware;

use Closure;

class CheckSelectedProfile
{
    public function handle($request, Closure $next)
    {
        $user = \Auth::user();

        // Verifica se o usuário está autenticado
        if ($user) {
            // Verifica se há um perfil selecionado na sessão
            if (!$request->session()->has('selected_profile')) {
                return redirect()->route('profile.index'); // Redireciona para a página de seleção de perfil
            }
        }

        return $next($request);
    }
}
