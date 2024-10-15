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
        // set_time_limit(0);
        // ini_set('memory_limit', '-1');

        $request->validate([
            "planoAcao" => "required|mimes:xls,xlsx,csv",
        ], [
            'planoAcao.required' => 'O envio do arquivo plano de ação é obrigatório.',
            'planoAcao.mimes' => 'O arquivo plano de ação deve ser um dos seguintes formatos: xls, xlsx, csv.',
        ]);
    
        $arquivo_plano_acao = $request->file('planoAcao')->store('temp');

        // DB::beginTransaction(); // Inicia a transação
        try {

            $id_usuario = auth()->id();

            ImportPlanoAcao::dispatch($arquivo_plano_acao, $id_usuario)->onQueue('planos');

            // Excel::import(new PlanoDeAcaoImport(), $arquivo_plano_acao);
            
            // DB::commit(); // Confirma a transação se tudo correr bem
        } catch (\Exception $e) {
            // DB::rollBack(); // Desfaz as alterações se houver um erro
            \Log::error('Erro ao importar o arquivo: ' . $e->getMessage());
            return back()->withErrors(['errors' => 'Erro ao importar o arquivo.']);
        }
    }

}