<?php

namespace App\Imports;

use App\Models\PlanoAcao;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Events\AfterImport;

class PlanoDeAcaoImport implements ToModel, WithChunkReading
{
    protected $contador = 0; // Contador de linhas processadas

    public function model(array $row)
    {
        $this->contador++; // Incrementa o contador

        return null;
    }

    public function chunkSize(): int
    {
        return 500; // Define o tamanho do lote
    }

    public function registerEvents(): array
    {
        return [
            AfterImport::class => function (AfterImport $event) {
                // Log do total de linhas processadas ao final da importação
                \Log::info('Total de linhas processadas: ' . $this->contador);
            },
        ];
    }
}
