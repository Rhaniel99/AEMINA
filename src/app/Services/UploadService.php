<?php

namespace App\Services;

use App\Models\MediaFiles;
use Log;
use Symfony\Component\Process\Process;
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
        Log::warning("Convertendo para codec: {$media_file_id}");
    
        $this->total_frames = $this->getTotalFrames($local_file_path);
        if ($this->total_frames === 0) {
            Log::error("Falha ao obter o total de frames do arquivo: " . $local_file_path);
            throw new \Exception("Falha ao obter total de frames.");
        }
    
        Log::info("Total de frames no arquivo: " . $this->total_frames);
    
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
        $process->setTimeout(null);
    
        $process->mustRun(function ($type, $buffer) use ($media_file_id) {
            if (Process::ERR === $type) {
                // Se desejar, pode registrar os erros aqui.
            } else {
                // Pode ser interessante tratar a quebra de linha e espaços.
                $lines = explode("\n", $buffer);
                foreach ($lines as $line) {
                    $line = trim($line);
                    if (strpos($line, 'frame=') === 0) {
                        $current_frame = (int) substr($line, 6);
                        if ($this->total_frames > 0) {
                            $progress = round(($current_frame / $this->total_frames) * 100);
                            // Log::info("Progresso: {$progress}% (Frames processados: {$current_frame})");
                            $this->updateProgress($progress, $media_file_id);
                        }
                    }
                }
            }
        });
    
        Log::info("Arquivo convertido com sucesso: " . $converted_path);
        return $converted_path;
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
        MediaFiles::where('media_id', $media_file_id)
            ->update(['upload_progress' => $progress, 'upload_status' => $progress >= 100 ? 'completed' : 'in_progress']);
    }
}
