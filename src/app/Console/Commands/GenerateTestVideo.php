<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class GenerateTestVideo extends Command
{
    protected $signature = 'video:generate-test';
    protected $description = 'Gera um vídeo de teste com FFmpeg';

    public function handle()
    {
        $outputFile = storage_path('app/public/test_video.mp4');
        $command = "/usr/bin/ffmpeg -f lavfi -i testsrc=size=1280x720:rate=30 -f lavfi -i sine=frequency=1000:duration=10 "
            . "-c:v libx264 -profile:v high10 -crf 23 -preset medium "
            . "-c:a aac -b:a 128k -shortest "
            . escapeshellarg($outputFile);

        exec($command, $output, $returnVar);

        if ($returnVar !== 0) {
            $this->error('Erro ao gerar o vídeo.');
        } else {
            $this->info('Vídeo gerado com sucesso: ' . $outputFile);
        }
    }
}
