<?php

namespace App\Imports;

use App\Models\PlanoAcao;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Row;

class PlanoDeAcaoImport implements OnEachRow, WithHeadingRow
{

    public function onRow(Row $row)
    {
        $data = $row->toArray(); // Converte a linha em um array associativo
        \Log::info($data);

        // Aqui você pode processar os dados da linha como quiser
        // Exemplo: salvar no banco de dados
        // PlanoAcao::create([
        //     'nome' => $data['nome'],
        //     'descricao' => $data['descricao'],
        //     // outros campos...
        // ]);

        // Se ainda houver problema de memória, adicione um retorno explícito
        return;
    }
}