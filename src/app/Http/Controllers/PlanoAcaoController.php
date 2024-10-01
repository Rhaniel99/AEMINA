<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Excel;

class PlanoAcaoController extends Controller
{
    public function uploadCSV(Request $request)
    {
        $arquivo_plano_acao = $request->file('planoAcao');
        // $data = Excel::toArray(null, $arquivo_plano_acao);
        // $rows = $data[0];
        // dd($request->all());

        //
    }
}