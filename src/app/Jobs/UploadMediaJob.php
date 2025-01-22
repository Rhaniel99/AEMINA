<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Log;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class UploadMediaJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels, Dispatchable;

    protected $file_path;
    protected $converted_path;
    protected $profileId;
    protected $mediaFileId;
    protected $paths3;

    public function __construct($file_path, $converted_path, $profileId, $mediaFileId, $paths3)
    {
        $this->file_path = $file_path;
        $this->converted_path = $converted_path;
        $this->profileId = $profileId;
        $this->mediaFileId = $mediaFileId;
        $this->paths3 = $paths3;
    }

    public function handle()
    {
        Log::info("Iniciando conversão com FFmpeg.");

        $local_file_path = storage_path($this->file_path);
        $converted_path = storage_path($this->converted_path);

        // Verificar se o arquivo de entrada existe
        if (!file_exists($local_file_path)) {
            Log::error("Arquivo não encontrado: " . $local_file_path);
            return;
        }

        // Construir comando FFmpeg
        $command = [
            'ffmpeg',
            '-vaapi_device',
            '/dev/dri/renderD128',
            '-i',
            $local_file_path,
            '-vf',
            'format=nv12,hwupload',
            '-c:v',
            'h264_vaapi',
            '-qp',
            '28',
            '-preset',
            'fast',
            '-profile:v',
            'main',
            '-b:v',
            '4M',
            '-maxrate',
            '4M',
            '-bufsize',
            '8M',
            '-threads',
            '6',
            '-c:a',
            'copy',
            $converted_path,
        ];

        $process = new Process($command);

        // Executar o processo
        $process->setTimeout(null);

        try {
            $process->mustRun(function ($type, $buffer) {
                Log::warning($buffer);
                if (Process::ERR === $type) {
                    Log::error($buffer);
                } else {
                    Log::info($buffer);
                }
            });

            Log::info("Arquivo convertido com sucesso: " . $converted_path);

            // Enviar para o S3 usando stream
            if (Storage::disk('s3')->put($this->paths3, fopen($converted_path, 'r'))) {
                Log::info("Arquivo enviado para S3 com sucesso.");
            } else {
                Log::error("Falha ao enviar arquivo para S3.");
            }

            // $converted_file_contents = file_get_contents($converted_path);
            // Storage::disk('s3')->put($this->paths3, $converted_file_contents);

            // Limpar arquivos locais
            unlink($local_file_path);
            unlink($converted_path);

            Log::info("Arquivo enviado para S3 e limpo localmente.");
        } catch (ProcessFailedException $e) {
            Log::error("Erro durante a conversão: " . $e->getMessage());
        }
    }
}
