<?php

namespace App\Http\Controllers;

use App\Imports\PlanoDeAcaoImport;
use App\Jobs\ImportPlanoAcao;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class PlanoAcaoController extends Controller
{
    public function uploadCSV(Request $request)
    {
        // ini_set('memory_limit', '512M'); // Aumenta o limite de memória

        $request->validate([
            "planoAcao" => "required|mimes:xls,xlsx,csv",
        ], [
            'planoAcao.required' => 'O envio do arquivo plano de ação é obrigatório.',
            'planoAcao.mimes' => 'O arquivo plano de ação deve ser um dos seguintes formatos: xls, xlsx, csv.',
        ]);

        $arquivo_plano_acao = $request->file('planoAcao');

        // Salvar o arquivo temporariamente para processamento
        $path = $arquivo_plano_acao->store('temp'); // O arquivo será armazenado no diretório 'storage/app/temp'

        // Despachar o job com o caminho do arquivo
        ImportPlanoAcao::dispatch($path);

        // ini_set('memory_limit', '256M');
        // $data = Excel::import(new PlanoDeAcaoImport(), $arquivo_plano_acao);
        // $rows = $data[0]; // Assumindo que o arquivo contém apenas uma planilha
        // dd($rows);

        // Excel::import(new CargasHorariasImport($cargas_horarias_vigencias->id), $carga_horaria_file);
        // $rows = $data[0];
        // dd($request->all());

        //
    }
}