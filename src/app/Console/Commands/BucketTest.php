<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class BucketTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bucket:test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
            // Obter todos os arquivos
    $files = \Storage::disk('s3')->allFiles();

    // Verificar se há pelo menos um arquivo
    if (!empty($files)) {
        // Listar apenas o primeiro arquivo
        $this->info("File: {$files[0]}");
    } else {
        // Caso não haja arquivos
        $this->info("No files found.");
    }

    return Command::SUCCESS;
    }
}
