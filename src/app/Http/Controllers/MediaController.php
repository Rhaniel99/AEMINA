<?php

namespace App\Http\Controllers;

use App\Helpers\Normalize;
use App\Models\Media;
use Illuminate\Http\Request;
use Storage;

class MediaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $medias_collection = Media::ofContentType('filme')->get();

        $medias = $medias_collection->map(function ($media) {
            // Formata a data para o padrão brasileiro
            $media->release_date = fDateBR($media->release_date);
            
            // Converte o caminho da imagem para a URL completa usando Storage
            $media->cover_image_path = Storage::url($media->cover_image_path);
            
            return $media;
            // dd(Storage::url($media->cover_image_path)); 
        });
        return inertia('Media/Index', ['medias' => $medias]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return inertia('Media/Show');
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
