<?php

namespace App\Jobs;

use App\Models\Media;
use App\Models\MediaFiles;
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
    protected $media_id;
    protected $media_file_id;
    protected $paths3;
    protected $total_frames;

    public function __construct($file_path, $converted_path, $media_id, $media_file_id, $paths3)
    {
        $this->file_path = $file_path;
        $this->converted_path = $converted_path;
        $this->media_id = $media_id;
        $this->media_file_id = $media_file_id;
        $this->paths3 = $paths3;
        $this->total_frames = 0; // Defina o número total de frames ou tamanho do arquivo
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
                if ($type === Process::ERR) {
                    // Captura do número de frames processados
                    if (preg_match('/frame=\s*(\d+)/', $buffer, $matches)) {
                        $frameCount = (int) $matches[1];

                        // Calcular a porcentagem com base no número total de frames
                        if ($this->total_frames > 0) {
                            $progress = ($frameCount / $this->total_frames) * 100;
                            $this->updateProgress($progress);
                            // Log::info("Progresso de conversão: " . round($progress, 2) . "%");
                        }

                        // Log::info("Número de frames: " . $frameCount);
                    }

                    // Tamanho do arquivo processado
                    if (preg_match('/size=\s*(\d+)kB/', $buffer, $matches)) {
                        $size = $matches[1];
                        Log::info("Tamanho do arquivo processado: " . $size . "kB");
                    }
                } else {
                    Log::info("Saída padrão (stdout): " . $buffer);
                }
            });

            Log::info("Arquivo convertido com sucesso: " . $converted_path);

            // Enviar para o S3 usando stream
            if (Storage::disk('s3')->put($this->paths3, fopen($converted_path, 'r'))) {
                Log::info("Arquivo enviado para S3 com sucesso.");
            } else {
                Log::error("Falha ao enviar arquivo para S3.");
            }

            // Limpar arquivos locais
            unlink($local_file_path);
            unlink($converted_path);

            Log::info("Arquivo enviado para S3 e limpo localmente.");
        } catch (ProcessFailedException $e) {
            Log::error("Erro durante a conversão: " . $e->getMessage());
        }
    }

    private function updateProgress($progress)
    {
        // Atualize o progresso no banco de dados
        $mediaFile = MediaFiles::find($this->media_file_id);
        Log::info(json_encode($mediaFile));
        Log::warning(round($progress));
        
        if ($mediaFile) {
            $mediaFile->update([
                'upload_progress' => round($progress),
                'upload_status' => $progress >= 100 ? 'completed' : 'in_progress',
            ]);
        }
    }
}