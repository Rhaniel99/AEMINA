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
    
        if (!file_exists($this->filePath)) {
            Log::warning('Arquivo de entrada não encontrado: ' . $this->filePath);
            return;
        }
        
        // Construir o comando FFmpeg para recodificar o vídeo
        // ffmpeg -i arquivo_entrada.mp4 -c:v libx264 -preset medium -crf 23 -profile:v high -c:a aac -b:a 128k arquivo_saida.mp4
        // ffmpeg -i input.mp4 -c:v libx264 -profile:v high10 -pix_fmt yuv420p10le output.mp4

        $command = "ffmpeg -loglevel debug -i {$this->filePath} -c:v libx264 -profile:v high10 -pix_fmt yuv420p10le {$recodedFilePath}";

        // $command = "ffmpeg -i {$this->filePath} -c:v libx264 -preset medium -crf 23 -profile:v main -c:a aac -b:a 128k -movflags +faststart {$recodedFilePath}";
    
        Log::info('Iniciando recodificação do vídeo: ' . $this->filePath);
        $startTime = microtime(true);
    
        // Executar o FFmpeg
        Log::info('Comando FFmpeg: ' . $command);
        exec($command . ' 2>&1', $output, $return_var);
        Log::info('Saída do FFmpeg: ' . implode("\n", $output));
    
        // Calcular o tempo de execução
        $endTime = microtime(true);
        $executionTime = $endTime - $startTime;
        Log::info('Tempo de execução do FFmpeg: ' . $executionTime . ' segundos');
    
        if ($return_var !== 0) {
            Log::warning('Erross ao recodificar o vídeo: ' . implode("\n", $output));
            return;
        }


    
        // Recuperar a mídia associada
        $mediaFile = MediaFiles::find($this->mediaFileId);
    
        if ($mediaFile) {
            // Usar stream para enviar o arquivo recodificado para o S3
            Storage::disk('s3')->put(
                $mediaFile->file_path,
                fopen($recodedFilePath, 'r')
            );
    
            // Apagar o arquivo recodificado localmente após o upload
            unlink($recodedFilePath);
        } else {
            Log::warning('Mídia não encontrada para ID: ' . $this->mediaFileId);
        }
    }
}
