<?php

namespace App\Jobs;

use App\Models\MediaFiles;
use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class UploadMediaJob implements ShouldQueue
{
    use Queueable, InteractsWithQueue, SerializesModels, Dispatchable;

    protected $filePath;
    protected $fileContent;
    protected $mediaFileId;

    public function __construct($filePath, $fileContent, $mediaFileId)
    {
        $this->filePath = $filePath;
        $this->fileContent = $fileContent;
        $this->mediaFileId = $mediaFileId;
    }

    public function handle()
    {
        ini_set('memory_limit', '-1');

        $chunkSize = 1024 * 1024; // 1MB per chunk (ajuste conforme necessário)
        $totalSize = strlen($this->fileContent);
        $uploaded = 0;

        // Divida o arquivo em chunks e envie para o S3
        foreach (str_split($this->fileContent, $chunkSize) as $chunk) {
            Storage::disk('s3')->put($this->filePath, $chunk, [
                'visibility' => 'public',
            ]);

            $uploaded += strlen($chunk);
            $progress = ($uploaded / $totalSize) * 100;

            // Atualize o progresso no banco de dados
            MediaFiles::where('id', $this->mediaFileId)->update([
                'upload_progress' => (int)$progress
            ]);

            // Atualize o status (se necessário)
            if ($progress === 100) {
                MediaFiles::where('id', $this->mediaFileId)->update([
                    'upload_status' => 'completed'
                ]);
            }

            // Atraso entre os chunks (simulação de tempo)
            sleep(1);
        }
    }
}
