<?php

namespace App\Http\Middleware;

use App\Enums\BreadcrumbsEnum;
use App\Models\Media;
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
        // \Log::info(json_encode($request->route()->getName()));
        // 

        // \Log::info($request->route()->parameters());

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
                ->select('content_type', 'category_name', 'category_name_normalized')
                ->groupBy('content_type', 'category_name', 'category_name_normalized')
                ->get();

            $content_categories->map(function ($item) {
                $item->title_content = \Str::ucfirst($item->content_type);
                $item->title_category = \Str::ucfirst($item->category_name);
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
                    'avatar' => \Storage::disk('s3_public')->temporaryUrl(
                        $current_profile->avatar,
                        now()->addMinutes(120)
                    ),
                ] : null,
                'items_sidebar' => fn() => $content_categories,
                'breadcrumbs' => fn() => $this->generateBreadcrumbs($request),
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

    private function generateBreadcrumbs(Request $request): array
    {
        $route_name = $request->route()->getName();
        $parameters = $request->route()->parameters();
        $breadcrumbs = [];
    
        // \Log::info($route_name);
        // Verifica se há um breadcrumb fixo no Enum
        if ($custom_breadcrumb = BreadcrumbsEnum::getLabel($route_name, $parameters)) {
            $breadcrumbs[] = $custom_breadcrumb;
        }
    
        // Primeiro item: categoria
        if (isset($parameters['category']) && isset($parameters['content'])) {
            $breadcrumbs[] = [
                'label' => ucfirst($parameters['category']),
                'url' => route('aemina.index', [$parameters['content'], $parameters['category']]),
            ];
        }
    
        // Último item: filme (sem link)
        if (isset($parameters['movie_id'])) {
            $movie_title = Media::where('id', $parameters['movie_id'])->first('title')->title ?? 'Filme Desconhecido';
    
            $breadcrumbs[] = [
                'label' => ucfirst($movie_title),
                'url' => null, // Sem link
            ];
        }
    
        // Se houver apenas um item, remove a URL
        if (count($breadcrumbs) === 1) {
            $breadcrumbs[0]['url'] = null;
        }
    
        return $breadcrumbs;
    }
    
}
