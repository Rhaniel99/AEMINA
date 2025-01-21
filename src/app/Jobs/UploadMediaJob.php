<?php

namespace App\Jobs;

use App\Models\MediaFiles;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use FFMpeg;
use Log;

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
        Log::info("CHEGOU AQUI");

        $local_file_path = storage_path($this->file_path);
        $converted_path = storage_path($this->converted_path);


        $ffmpeg = FFMpeg\FFMpeg::create();

        Log::info("Verificando arquivo de entrada: " . $local_file_path);
        if (!file_exists($local_file_path)) {
            Log::error("Arquivo não encontrado: " . $local_file_path);
        }
        $video = $ffmpeg->open($local_file_path);

        $format = new FFMpeg\Format\Video\X264('aac', 'libx264');
        $format->setAudioCodec('aac');
        $format->setVideoCodec('libx264');
        $format->setKiloBitrate(1500);
        $format->setAudioKiloBitrate(256);
        
        // $format->setAdditionalParameters(['-profile:v', 'main', '-level:v', '4.0', '-pix_fmt', 'yuv420p']);
        $format->on('progress', function ($video, $format, $percentage) {
            Log::info($percentage);
            // echo "$percentage % transcoded"s;
        });
        // Salvar o arquivo convertido
        $video->save($format, $converted_path);
        $converted_file_contents = file_get_contents($converted_path);

        Storage::disk('s3')->put($this->paths3, $converted_file_contents);

        unlink($local_file_path);
        unlink($converted_path);
    }
}
