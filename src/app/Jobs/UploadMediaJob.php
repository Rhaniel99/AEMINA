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

        // Calcular o total de frames do vídeo
        $this->total_frames = $this->getTotalFrames($local_file_path);
        if ($this->total_frames === 0) {
            Log::error("Falha ao obter o total de frames do arquivo: " . $local_file_path);
            return;
        }

        Log::info("Total de frames no arquivo: " . $this->total_frames);

        // Construir comando FFmpeg
        $command = [
            'ffmpeg',
            '-progress',
            'pipe:1',
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
                if (Process::ERR === $type) {
                    // Log::alert($buffer);
                } else {
                    $lines = explode("\n", $buffer);
                    foreach ($lines as $line) {
                        if (strpos($line, 'frame=') === 0) {
                            $current_frame = (int) substr($line, 6);
                            // Calcular progresso como valor inteiro
                            if ($this->total_frames > 0) {
                                $progress = round(($current_frame / $this->total_frames) * 100);
                                // Log::info("Progresso: {$progress}% (Frames processados: {$current_frame})");

                                // Atualizar progresso no banco de dados
                                $this->updateProgress($progress);
                            }
                        }
                    }
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

    private function getTotalFrames($filePath)
    {
        $command = [
            'ffprobe',
            '-v',
            'error',
            '-select_streams',
            'v:0',
            '-show_entries',
            'stream=nb_frames',
            '-of',
            'default=nokey=1:noprint_wrappers=1',
            $filePath,
        ];

        $process = new Process($command);
        $process->setTimeout(60); // Define um tempo limite razoável
        $process->mustRun();

        $output = trim($process->getOutput());

        return is_numeric($output) ? (int) $output : 0;
    }


    private function updateProgress($progress)
    {
        // Atualize o progresso no banco de dados
        $media_file = MediaFiles::find($this->media_file_id);

        if ($media_file) {
            $media_file->update([
                'upload_progress' => $progress,
                'upload_status' => $progress >= 100 ? 'completed' : 'in_progress',
            ]);
        }
    }
}