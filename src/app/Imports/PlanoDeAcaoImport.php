<?php

namespace App\Imports;

use App\Models\PlanoAcao;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class PlanoDeAcaoImport implements ToModel, WithChunkReading
{
    protected $contador = 0; // Contador de linhas processadas
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $this->contador++; // Incrementa o contador

        // Log cada linha do arquivo
        \Log::info($this->contador);
        
        gc_collect_cycles();
        // Aqui você pode criar o modelo ou fazer outras operações
        // return new PlanoAcao([...]);
    }

    public function chunkSize(): int
    {
        return 100; // Defina o tamanho do lote conforme necessário
    }
}
