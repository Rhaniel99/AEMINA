<?php

namespace App\Jobs;

use App\Imports\PlanoDeAcaoImport;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Maatwebsite\Excel\Facades\Excel;

class ImportPlanoAcao implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $arquivoPlanoAcao;

    /**
     * Create a new job instance.
     *
     * @param string $arquivoPlanoAcao
     */
    public function __construct(string $arquivoPlanoAcao)
    {
        $this->arquivoPlanoAcao = $arquivoPlanoAcao;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            ini_set('memory_limit', '-1');

            Excel::import(new PlanoDeAcaoImport(), $this->arquivoPlanoAcao);

        } catch (\Exception $e) {
            \Log::error('Erro ao importar o arquivo: ' . $e->getMessage());
            throw $e; // Re-lança a exceção para que o Laravel registre a falha
        }
    }
}
