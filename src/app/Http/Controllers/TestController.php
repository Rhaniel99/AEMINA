<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Storage;

class TestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Test/Index');
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
        // Recupera o nome do arquivo e o caminho do arquivo armazenado localmente
        $fileName = $request->file_name; // O URL do arquivo enviado via Tus
        $fileBaseName = basename($fileName); // Pega o nome base do arquivo (sem caminho)

        // Carregar o arquivo JSON
        $jsonFilePath = storage_path('app/private/tus/' . $fileBaseName . '.json'); // Caminho do arquivo JSON
        if (file_exists($jsonFilePath)) {
            $jsonData = json_decode(file_get_contents($jsonFilePath), true);

            // Verifica se a extensão existe no JSON
            if (isset($jsonData['extension'])) {
                $extension = $jsonData['extension']; // A extensão do arquivo

                // Construir o caminho completo do arquivo com base na extensão
                $localFilePath = storage_path('app/private/tus/' . $fileBaseName . '.' . $extension); // Caminho completo para o arquivo

                // Verifique se o arquivo realmente existe
                if (file_exists($localFilePath)) {
                    // Transfira o arquivo para o MinIO (S3)
                    $s3Path = 'uploads/' . $fileBaseName . '.' . $extension; // Caminho no MinIO
                    $fileContents = file_get_contents($localFilePath);

                    // Armazenar no MinIO (S3)
                    Storage::disk('s3')->put($s3Path, $fileContents);

                    // Opcional: Apagar o arquivo local depois de transferido
                    unlink($localFilePath);

                    dd('Arquivo enviado com sucesso para o MinIO!', $fileName);
                } else {
                    dd('Arquivo não encontrado no diretório local: ' . $localFilePath);
                }
            } else {
                dd('Extensão do arquivo não encontrada no arquivo JSON.');
            }
        } else {
            dd('Arquivo JSON não encontrado: ' . $jsonFilePath);
        }

        // Exibir os dados enviados
        dd($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
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
    public function update(Request $request)
    {
        return response()->json(['message' => 'Upload patch handled'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
