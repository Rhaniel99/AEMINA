<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\UserProfiles;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {

        // Verifica se o usuário está autenticado
        if (auth()->check()) {
            $current_profile = null;

            // Carrega o perfil selecionado
            if ($profile_id = $request->session()->get('selected_profile')) {
                $current_profile = UserProfiles::where('id', $profile_id)->first(
                    ['id', 'username', 'avatar']
                );
            }

            // Obtem a contagem de mídias por categoria e tipo
            $content_categories = \DB::table('media_schema.content_and_categories_count')
            ->select('content_type', 'category_name')
            ->groupBy('content_type', 'category_name')
            ->get();

            $content_categories->map(function ($item) {
                $item->content_type = \Str::ucfirst($item->content_type);
                $item->category_name = \Str::ucfirst($item->category_name);
                return $item;
            });
            
            // Retorna os dados compartilhados
            return array_merge(parent::share($request), [
                'flash' => [
                    'success' => fn() => $request->session()->get('success') ?? [],
                    'errors' => fn() => $request->session()->get('errors') ? $request->session()->get('errors')->getBag('default')->getMessages() : [],
                ],
                'auth.user' => fn() => auth()->user()->only('id', 'name', 'email'),
                'auth.profile' => fn() => $current_profile ? [
                    'id' => $current_profile->id,
                    'username' => $current_profile->username,
                    'avatar' => \Storage::url($current_profile->avatar),
                ] : null,
                'items_sidebar' => fn() => $content_categories,
            ]);
        }

        // Retorna apenas os dados mínimos quando não autenticado
        return array_merge(parent::share($request), [
            'flash' => [
                'success' => fn() => $request->session()->get('success') ?? [],
                'errors' => fn() => $request->session()->get('errors') ? $request->session()->get('errors')->getBag('default')->getMessages() : [],
            ],
        ]);
    }
}
