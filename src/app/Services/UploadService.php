<?php

namespace App\Services;

use App\Models\MediaFiles;
use Illuminate\Support\Facades\Storage;
use Log;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use FFMpeg\FFMpeg as FFMpegFFMpeg;
use FFMpeg\Format\Video\X264;

class UploadService
{
    private $total_frames = 0;


    /**
     * Faz o upload de um arquivo para o armazenamento especificado.
     *
     * @param \Illuminate\Http\UploadedFile $file
     * @param string $path
     * @return string|null
     */
    public function uploadConvertCodecFile($local_file_path, $converted_path, $media_file_id)
    {
        try {

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

            $process->mustRun(function ($type, $buffer) use ($media_file_id) {
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
                                $this->updateProgress($progress, $media_file_id);
                            }
                        }
                    }
                }
            });

            Log::info("Arquivo convertido com sucesso: " . $converted_path);

            return $converted_path;

        } catch (ProcessFailedException $e) {
            Log::error("Erro durante a conversão: " . $e->getMessage());
        }


        // // Enviar para o S3 usando stream
        // if (Storage::disk('s3')->put($this->paths3, fopen($converted_path, 'r'))) {
        //     Log::info("Arquivo enviado para S3 com sucesso.");
        // } else {
        //     Log::error("Falha ao enviar arquivo para S3.");
        // }

        // // Limpar arquivos locais
        // unlink($local_file_path);
        // unlink($converted_path);

        // Log::info("Arquivo enviado para S3 e limpo localmente.");

    }

    public function uploadConvertMToMp4($local_file_path, $converted_path, $media_file_id)
    {
        $ffmpeg = FFMpegFFMpeg::create([
            'timeout'          => null, // Timeout em segundos
            'ffmpeg.threads'   => 6,   // Número de threads para o ffmpeg
        ]);
    
        // Abrir o vídeo
        $video = $ffmpeg->open($local_file_path);

        // Definir o formato para MP4, reencodificando o vídeo com libx264 e mantendo o áudio como está
        $format = new X264();
        $format->on('progress', function ($video, $format, $percentage) use ($media_file_id) {
            $this->updateProgress($percentage, $media_file_id);
        });
        $format->setAudioCodec('copy')  // Manter o áudio original sem reencodificar
            ->setVideoCodec('libx264')  // Reencodificar o vídeo com libx264
            ->setAdditionalParameters(['-c:s', 'mov_text']);  // Converter legendas para mov_text para MP4

        // Salvar o arquivo convertido
        $video->save($format, $converted_path);

        Log::info("Arquivo convertido com sucesso: " . $converted_path);

        return $converted_path;
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


    private function updateProgress($progress, $media_file_id)
    {
        // Atualize o progresso no banco de dados
        $media_file = MediaFiles::find($media_file_id);

        if ($media_file) {
            $media_file->update([
                'upload_progress' => $progress,
                'upload_status' => $progress >= 100 ? 'completed' : 'in_progress',
            ]);
        }
    }
}
