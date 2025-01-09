<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Media;
use App\Models\MediaFiles;
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
    public function store(Request $request)
    {
        $request->validate([
            'titulo_filme' => 'required',
            'desc_filme' => 'required',
            'categorias' => 'required',
            'capa_filme' => 'required',
            'dt_lancamento' => 'required',
            // 'arquivo_filme' => 'required',
        ]);
        dd($request->all());
        //
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
