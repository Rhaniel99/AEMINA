<?php

namespace App\Jobs;

use App\Models\MediaFiles;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Log;

class UploadMediaJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels, Dispatchable;

    protected $filePath;
    protected $profileId;
    protected $mediaFileId;

    public function __construct($filePath, $profileId, $mediaFileId)
    {
        $this->filePath = $filePath;
        $this->profileId = $profileId;
        $this->mediaFileId = $mediaFileId;
    }

    public function handle()
    {
        ini_set('memory_limit', '-1');

        // Gerar o caminho correto para o arquivo recodificado
        $recodedFilePath = storage_path("app/private/tus/recoded_" . basename($this->filePath));

        // Construir o comando FFmpeg para recodificar o vídeo
        $command = "ffmpeg -i {$this->filePath} -c:v libx264 -profile:v high10 -c:a aac -level 4.2 -y {$recodedFilePath} 2>&1";
        // $command = "ffmpeg -i {$this->filePath} -c:v libx264 -c:a aac -profile:v main -level 4.2 -y {$recodedFilePath} 2>&1";

        Log::info('Iniciando recodificação do vídeo: ' . $this->filePath);
        $startTime = microtime(true);

        // Executar o FFmpeg
        exec($command, $output, $return_var);

        // Calcular o tempo de execução
        $endTime = microtime(true);
        $executionTime = $endTime - $startTime;
        Log::info('Tempo de execução do FFmpeg: ' . $executionTime . ' segundos');

        if ($return_var !== 0) {
            Log::warning('Erro ao recodificar o vídeo: ' . implode("\n", $output));
            return;
        }


        // Armazenar o arquivo recodificado no MinIO (S3)
        $fileContents = file_get_contents($recodedFilePath);

        // Recuperar a mídia associada
        $mediaFile = MediaFiles::find($this->mediaFileId);

        if ($mediaFile) {
            Storage::disk('s3')->put($mediaFile->file_path, $fileContents);

            // Opcional: Apagar o arquivo recodificado localmente após o upload
            unlink($recodedFilePath);
        } else {
            Log::warning('Mídia não encontrada para ID: ' . $this->mediaFileId);
        }
    }
}
