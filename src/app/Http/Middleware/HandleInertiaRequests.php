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
        $current_profile = null;

        // Verifica se há um ID de perfil na sessão
        if ($profile_id = $request->session()->get('selected_profile')) {
            $current_profile = UserProfiles::where('id', $profile_id)->first(
                ['id', 'username', 'avatar']
            );
        }

        return array_merge(parent::share($request), [
            'flash' => [
                'success' => fn() => $request->session()->get('success') ? $request->session()->get('success') : [],
                'errors' => fn() => $request->session()->get('errors') ? $request->session()->get('errors')->getBag('default')->getMessages() : [],
            ],
            'auth.user' => fn() => $request->user() ? $request->user()->only('id', 'name', 'email') : null,
            'auth.profile' => fn() => $current_profile ? [
                'id' => $current_profile->id,
                'username' => $current_profile->username,
                'avatar' => \Storage::url($current_profile->avatar), // URL completa do avatar
            ] : null,

        ]);
    }
}
