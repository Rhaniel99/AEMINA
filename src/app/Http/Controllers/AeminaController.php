<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\ContentType;
use App\Models\MediaCategory;
use DB;
use Exception;
use Illuminate\Http\Request;
use App\Models\Media;
use App\Models\MediaFiles;
use Log;
use Storage;

class AeminaController extends Controller
{
    /**
     * ? Listar todos os filmes, séries, animes.
     */
    public function index($content, $category)
    {
        // Query básica
        $query = Media::ofContentType($content);

        if ($category === 'lancamento') {
            // Ordenar por data de lançamento (mais recentes primeiro)
            $query->orderBy('release_date', 'desc');
        } elseif ($category) {
            // Filtrar pela categoria fornecida
            $query->whereHas('categories', function ($q) use ($category) {
                $q->whereRaw('LOWER(UNACCENT(categories.name)) = ?', [$category]);
            });
        }

        $medias_collection = $query->with('categories')->get();

        $medias = $medias_collection->map(function ($media) {
            // Formata a data para o padrão brasileiro
            $media->release_date = fDateBR($media->release_date);

            // Converte o caminho da imagem para a URL completa usando Storage
            $media->cover_image_path = Storage::url($media->cover_image_path);
            // Formata as categorias para serem enviadas para o frontend
            $media->categories = $media->categories->map(function ($category) {
                return [
                    'id' => $category->id,
                    'name' => $category->name,
                ];
            });

            return $media;
        });

        return inertia('Aemina/Index', [
            'content' => $content,
            'category' => $category,
            'medias' => $medias,
        ]);
    }

    public function list_media(Request $request)
    {
        $search = fnStrings($request->input('search', ''));

        $media = Media::ofContentType('filme')
            ->when($search, function ($query, $search) {
                $query->whereRaw('LOWER(UNACCENT(title)) LIKE ?', ["%{$search}%"]);
                // $query->where('title', 'like', "%{$search}%");
            })
            ->with('categories')
            ->with('contentType')
            ->with('profile')
            ->paginate(5);

        // Transformar apenas os itens dentro da coleção sem perder a estrutura de paginação
        $media->setCollection(
            $media->getCollection()->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'categories' => $item->categories->pluck('name')->toArray(),
                    'release_date' => $item->release_date,
                    'descricao' => $item->description,
                    'content_type' => $item->contentType->type,
                    'username' => $item->profile->username
                ];
            })
        );

        // dd($media);
        return inertia('Aemina/List', [
            'media' => $media,
        ]);
    }
    /**
     * ? Detalhes de um conteúdo específico.
     */
    public function show($content, $category, $movie_id)
    {
        $media = MediaFiles::where('media_id', $movie_id)->with('media')->first();
        $media->title = $media->media->title;
        $media->file_path = Storage::url($media->file_path);
        return inertia('Aemina/Show', [
            'media' => $media,
            'category' => $category,
            'content' => $content,
            'movie' => $media->title
        ]);
    }

    /**
     * ? Criar um novo filme, série, anime.
     */
    public function create()
    {
        return inertia('Aemina/Create');
    }

    /**
     * ? Salvar um novo filme, série, anime.
     */

    public function store(Request $request, $content)
    {
        try {
            switch ($content) {
                case 'filme':
                    $this->store_movie($request);
                    DB::commit();
                    return to_route('aemina.index', ['content' => 'filme', 'category' => 'lancamento'])
                        ->with(['success' => 'Filme enviado com sucesso!']);
                default:
                    throw new Exception('Tipo de conteúdo não suportado.');
            }
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return back()->withErrors(['error' => 'Houve um erro ao enviar o filme.']);
        }
    }

    private function store_movie($request)
    {
        $request->validate([
            'titulo_filme' => 'required',
            'desc_filme' => 'required',
            'categorias' => 'required',
            'capa_filme' => 'required',
            'dt_lancamento' => 'required',
            'arquivo_filme' => 'required',
        ]);

        $profile_id = session()->get('selected_profile');
        Log::info($profile_id);
        // ? Buscar o Tipo de Conteudo
        $content = ContentType::where('type', 'filme')->first();

        // ? Buscar ou criar categorias
        $categories = collect($request->categorias)->map(function ($categoria) {
            return Categories::firstOrCreate(
                ['name_normalized' => fnStrings($categoria)],
                ['name' => $categoria]
            );
        });

        // ? Normalizar o título e definir o caminho da capa
        $tittle_normalized = fPath($request->titulo_filme);
        $ext_cover = $request->capa_filme->getClientOriginalExtension();
        $path_cover = "covers/{$tittle_normalized}.{$ext_cover}";

        // ? Criar a mídia
        $media = Media::create([
            'profile_id' => $profile_id,
            'title' => $request->titulo_filme,
            'description' => $request->desc_filme,
            'release_date' => $request->dt_lancamento,
            'cover_image_path' => $path_cover,
            'content_type_id' => $content->id,
            'status' => 'active',
        ]);

        // ? Associar as categorias à mídia sem duplicatas
        foreach ($categories as $category) {
            MediaCategory::firstOrCreate([
                'media_id' => $media->id,
                'category_id' => $category->id,
            ]);
        }

        $ext_file = $request->arquivo_filme->getClientOriginalExtension();
        $path_file = "films/{$tittle_normalized}/{$tittle_normalized}_1080p.{$ext_file}";

        MediaFiles::create([
            'media_id' => $media->id,
            'file_path' => $path_file
        ]);

        $encoded_file = file_get_contents($request->arquivo_filme);
        $encoded_cover = file_get_contents($request->capa_filme);

        Storage::disk('s3')->put($path_file, $encoded_file);
        Storage::disk('s3')->put($path_cover, $encoded_cover);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
