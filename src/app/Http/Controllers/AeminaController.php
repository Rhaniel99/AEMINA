<?php

namespace App\Http\Controllers;

use App\Jobs\UploadMediaJob;
use App\Models\Categories;
use App\Models\ContentType;
use App\Models\MediaCategory;
use DB;
use FFMpeg;
use Exception;
use Illuminate\Http\Request;
use App\Models\Media;
use App\Models\MediaFiles;
use Log;
// use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg as ProtoneFFMpeg;
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
            ->with('files')
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
                    'username' => $item->profile->username,
                    'status_upload' => $item->files->first()->upload_status,
                    'progress_upload' => $item->files->first()->upload_progress,
                ];
            })
        );

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
     * ? Salvar um novo filme, série, anime.
     */

    public function store(Request $request, $content)
    {
        try {
            switch ($content) {
                case 'filme':
                    DB::beginTransaction();
                    $this->store_movie($request);
                    DB::commit();
                    return to_route('aemina.list.media')->with(['success' => 'Filme enviado com sucesso!']);
                default:
                    throw new Exception('Tipo de conteúdo não suportado.');
            }
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return back()->withErrors(['error' => $e->getMessage()]);
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
        $content = ContentType::where('type', 'filme')->first();

        // Buscar ou criar categorias
        $categories = collect($request->categorias)->map(function ($categoria) {
            return Categories::firstOrCreate(
                ['name_normalized' => fnStrings($categoria)],
                ['name' => $categoria]
            );
        });

        $path_cover = genPathCover($request->titulo_filme, $request->capa_filme);

        // Criar a mídia
        $media = Media::create([
            'profile_id' => $profile_id,
            'title' => $request->titulo_filme,
            'description' => $request->desc_filme,
            'release_date' => $request->dt_lancamento,
            'cover_image_path' => $path_cover,
            'content_type_id' => $content->id,
        ]);

        // Associar as categorias à mídia sem duplicatas
        foreach ($categories as $category) {
            MediaCategory::firstOrCreate([
                'media_id' => $media->id,
                'category_id' => $category->id,
            ]);
        }

        // Armazenar a capa
        $encoded_cover = file_get_contents($request->capa_filme);
        Storage::disk('s3')->put($path_cover, $encoded_cover);

        $fileName = $request->arquivo_filme;
        $fileBaseName = basename($fileName);
        $jsonFilePath = storage_path("app/private/tus/{$fileBaseName}.json");

        if (file_exists($jsonFilePath)) {
            $jsonData = json_decode(file_get_contents($jsonFilePath), true);

            if (isset($jsonData['extension'])) {
                $extension = $jsonData['extension'];
                // $localFilePath = storage_path("app/private/tus/{$fileBaseName}.{$extension}");

                $local_file_path = "app/private/tus/{$fileBaseName}.{$extension}";

                if (file_exists(storage_path($local_file_path))) {

                    $titulo_normalizado = fPath($request->titulo_filme);
                    $converted_path = "app/private/tus/{$titulo_normalizado}_converted.mp4";

                    $path_file = "films/{$titulo_normalizado}/{$titulo_normalizado}.mp4";

                    MediaFiles::create([
                        'media_id' => $media->id,
                        'file_path' => $path_file,
                        'upload_status' => 'pending',
                        'upload_progress' => 0
                    ]);

                    $localFilePath = "tus/{$fileBaseName}.{$extension}";

                    $ffprobe = FFMpeg\FFProbe::create();

                    // Analisar informações completas dos streams aa
                    $video_info = $ffprobe->streams(Storage::disk('local')->path($localFilePath))
                        ->videos()
                        ->first();

                    // Log::info($video_info->all());

                    if (!$video_info) {
                        throw new Exception('Nao conseguiu pegar as informacoes do video.');
                    }

                    $codec_name = $video_info->get('codec_name'); // Nome do codec (ex: h264)
                    $profile = $video_info->get('profile'); // Perfil do codec (ex: High 10 Profile)

                    if ($codec_name === 'h264' && $profile === 'High 10') {
                        UploadMediaJob::dispatch($local_file_path, $converted_path, 'convertCodec', $media->id, $path_file, $profile_id)->onQueue('media');
                    }

                    if ($codec_name === 'h264' && $profile === 'High') {
                        // Disparar job para conversão e upload
                        UploadMediaJob::dispatch($local_file_path, $converted_path, 'convertMToMp4', $media->id, $path_file, $profile_id)
                            ->onQueue('media');
                    }

                } else {
                    dd('Arquivo não encontrado no diretório local: ' . $local_file_path);
                }
            } else {
                dd('Extensão do arquivo não encontrada no arquivo JSON.');
            }
        } else {
            dd('Arquivo JSON não encontrado: ' . $jsonFilePath);
        }
    }

    /**
     * ? Atualizar um novo filme, série, anime.
     */
    public function update(Request $request, string $id, $content)
    {
        Log::info(json_encode($request->all()));
        try {
            switch ($content) {
                case 'filme':
                    DB::beginTransaction();
                    $this->update_movie($request, $id);
                    DB::commit();
                    return to_route('aemina.list.media')->with(['success' => 'Filme Atualizado com sucesso!']);
                default:
                    break;
            }
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e->getMessage());
            return back()->withErrors(['error' => 'Houve um erro ao enviar o filme.']);
        }
    }

    private function update_movie($request, $id)
    {
        // Atualizar os dados básicos do filme
        $media = Media::findOrFail($id);
        $media->update([
            'title' => $request->titulo_filme,
            'description' => $request->desc_filme,
            'release_date' => $request->dt_lancamento,
        ]);

        $categories = collect($request->categorias)->map(function ($categoria) {
            return Categories::firstOrCreate(
                ['name_normalized' => fnStrings($categoria)],
                ['name' => $categoria]
            );
        })->pluck('id')->toArray();


        $old_categories = MediaCategory::where('media_id', $media->id)->get(['category_id'])->pluck('category_id')->toArray();

        $categoriesToRemove = array_diff($old_categories, $categories);

        $categoriesToAdd = array_diff($categories, $old_categories);

        if (!empty($categoriesToRemove)) {
            Log::info("Executou o Remove");

            $media->categories()->detach($categoriesToRemove);
        }

        if (!empty($categoriesToAdd)) {
            Log::info("Executou o ADD");
            Log::alert($categoriesToAdd);
            Log::warning($media);



            $media->categories()->attach($categoriesToAdd);
        }

        // Uploads (se fornecidos)
        if ($request->capa_filme) {
            $path_cover = genPathCover($request->titulo_filme, $request->capa_filme);
            $encoded_cover = file_get_contents($request->capa_filme);
            Storage::disk('s3')->put($path_cover, $encoded_cover);
        }

        if ($request->arquivo_filme) {
            $path_file = genPathFile($request->titulo_filme, $request->arquivo_filme);
            $encoded_file = file_get_contents($request->arquivo_filme);
            Storage::disk('s3')->put($path_file, $encoded_file);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $media = Media::where('id', $id)
            ->with(['categories', 'contentType', 'profile', 'files'])
            ->first(['id', 'title', 'description', 'release_date', 'content_type_id', 'profile_id']);

        $media = [
            'id' => $media->id,
            'title' => $media->title,
            'categories' => $media->categories->pluck('name')->toArray(),
            'release_date' => $media->release_date,
            'description' => $media->description,
        ];

        return inertia('Aemina/Edit', [
            'media' => $media,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(string $id)
    {
        // Carrega o registro de mídia junto com os tipos de conteúdo e os arquivos relacionados
        $media = Media::where('id', $id)
            ->with('contentType')
            ->with('files')
            ->first();

        if (!$media) {
            return to_route('aemina.list.media')->withErrors(['error' => 'Mídia não encontrada.']);
        }

        // Deletar arquivos do MinIO
        if ($media->files) {
            foreach ($media->files as $file) {
                $filePath = $file->file_path;

                // Verifica se o arquivo existe no MinIO
                if (Storage::disk('s3')->exists($filePath)) {
                    Storage::disk('s3')->delete($filePath);
                }
            }
        }

        // Deletar imagem de capa (se existir)
        if ($media->cover_image_path && Storage::disk('s3')->exists($media->cover_image_path)) {
            Storage::disk('s3')->delete($media->cover_image_path);
        }

        // Deletar o registro de mídia
        $media->delete();

        // Retornar ao listar com mensagem de sucesso
        return to_route('aemina.list.media')->with(['success' => "{$media->contentType->type} removido com sucesso!"]);
    }
}