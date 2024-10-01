<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Excel;

class PlanoAcaoController extends Controller
{
    public function uploadCSV(Request $request)
    {
        $request->validate([
            "planoAcao" => "required|mimes:xls,xlsx,csv",
        ], [
            'planoAcao.required' => 'O envio do arquivo plano de ação é obrigatório.',
            'planoAcao.mimes' => 'O arquivo plano de ação deve ser um dos seguintes formatos: xls, xlsx, csv.',
        ]);

        $arquivo_plano_acao = $request->file('planoAcao');
        // $data = Excel::toArray(null, $arquivo_plano_acao);
        // $rows = $data[0];
        // dd($request->all());

        //
    }
}