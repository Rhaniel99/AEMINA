<?php

namespace App\Jobs;

use App\Events\JobSuccessNotification;
use App\Models\MediaFiles;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Log;
use Symfony\Component\Process\Exception\ProcessFailedException;
use App\Services\UploadService;
use App\Events\JobFailedNotification;

class UploadMediaJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels, Dispatchable;

    protected $file_path;
    protected $converted_path;
    protected $type;
    protected $media_file_id;
    protected $paths3;
    protected $profile_id;
    const CONVERT_CODEC = 'convertCodec';
    const CONVERT_MP4 = 'convertMToMp4';

    public function __construct($file_path, $converted_path, $type, $media_file_id, $paths3, $profile_id)
    {
        $this->file_path = $file_path;
        $this->converted_path = $converted_path;
        $this->type = $type;
        $this->media_file_id = $media_file_id;
        $this->paths3 = $paths3;
        $this->profile_id = $profile_id;
    }

    public function handle()
    {
        $uploadService = new UploadService();

        Log::info("Iniciando processo de conversão.");

        $local_file_path = storage_path($this->file_path);
        $converted_path = storage_path($this->converted_path);

        if (!file_exists($local_file_path)) {
            MediaFiles::where('media_id', $this->media_file_id)->update(['upload_status' => 'failed']);
            event(new JobFailedNotification($this->profile_id, "Erro: Arquivo não encontrado."));
            Log::error("Arquivo não encontrado: " . $local_file_path);
            return;
        }

        try {
            
            switch ($this->type) {
                case self::CONVERT_CODEC:
                    $converted_path_final = $uploadService->uploadConvertCodecFile($local_file_path, $converted_path, $this->media_file_id);
                    break;
                case self::CONVERT_MP4:
                    $converted_path_final = $uploadService->uploadConvertMToMp4($local_file_path, $converted_path, $this->media_file_id);
                    break;
                default:
                    throw new \Exception("Tipo de conversão desconhecido.");
            }
            // $this->uploadToS3($converted_path_final);
            Storage::disk('s3')->put($this->paths3, fopen($converted_path_final, 'r'));
            unlink(storage_path($this->file_path));
            unlink($converted_path);
            event(new JobSuccessNotification($this->profile_id, "Filme foi enviado e convertido com sucesso!"));

        } catch (ProcessFailedException $e) {
            MediaFiles::where('media_id', $this->media_file_id)->update(['upload_status' => 'failed']);
            event(new JobFailedNotification($this->profile_id, "Erro durante a conversão... Solicite suporte."));
            Log::error("Erro durante a conversão: " . $e->getMessage());
        }
    }
}