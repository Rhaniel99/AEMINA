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

    protected $arquivo_plano_acao;
    protected $id_user;


    /**
     * Create a new job instance.
     *
     * @param string $arquivo_plano_acao
     */
    public function __construct(string $arquivo_plano_acao, $id_user)
    {
        $this->arquivo_plano_acao = $arquivo_plano_acao;
        $this->id_user = $id_user;

    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {

            ini_set('memory_limit', '-1');

            Excel::import(new PlanoDeAcaoImport($this->id_user), $this->arquivo_plano_acao);

        } catch (\Exception $e) {
            \Log::error('Erro ao importar o arquivo: ' . $e->getMessage());
            throw $e; // Re-lança a exceção para que o Laravel registre a falha
        }
    }
}
