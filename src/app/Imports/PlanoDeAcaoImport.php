<?php

namespace App\Imports;

use App\Helpers\Normalize;
use App\Models\Indicador;
use App\Models\PlanoAcao;
use App\Models\TipoAcao;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Row;

class PlanoDeAcaoImport implements OnEachRow, WithHeadingRow
{

    public function onRow(Row $row)
    {
        // $data = $this->normalizeData($row->toArray());

        $data = $row->toArray(); // Converte a linha em um array associativo

        $tipo_plano = Normalize::nAccent(Normalize::nLower($data['tipo_de_plano']));
        // $tipo_plano = $data['tipo_de_plano'];
        $indicador_array = Normalize::nAccent(Normalize::nLower($data['indicador']));
        $causa_correlacionada = $data['causa_correlacionada'];

        $causa = $data['causa'];
        $tarefa = $data['tarefa'];

        $responsavel = $data['responsavel'];

        // ? Datas
        $inicio_previsto = Normalize::nDate($data['inicio_previsto']);
        $fim_previsto = Normalize::nDate($data['fim_previsto']);

        $inicio_realizado = Normalize::nDate($data['inicio_realizado']);

        $fim_realizado = ($data['fim_realizado'] != 'CANCELADA') ? Normalize::nDate($data['fim_realizado']) : null;

        // $status = $data['DESCRIÇÃO DO STATUS'];
        
        $cod_escola = $data['sigeam'];
        $pontos_problematicos = $data['pontos_problematicos'];

        $acao = $data['acao'];

        $acao_futura = $data['acao_futura'];

        $reprogramacao_1 = Normalize::nDate($data['reprogramacao_1']);
        $reprogramacao_2 = Normalize::nDate($data['reprogramacao_2']);


        $tipoAcao = TipoAcao::firstOrCreate(
            [
            'acao' => $tipo_plano
        ], [
            'acao' => $tipo_plano
        ]);

        $indicador = Indicador::firstOrCreate(
        [
                    'indicador' => $indicador_array
        ], [
                    'indicador' => $indicador_array
        ]);

        // \Log::warning($data);
        
        $id_usuario = auth()->id();
        $ano_atual = date('Y');

        // PlanoAcao::create(
        // [
        //             'ano_base' => $ano_atual,
        //             'id_tipo_acao' => $tipoAcao->id,
        //             'indicador_id' => $indicador->id,
        //             'causa_correlacionada' => $causa_correlacionada,
        //             'cod_escola' => $cod_escola,
        //             'causa' => $causa,
        //             'acao' => $acao,
        //             'tarefa' => $tarefa,
        //             'inicio_previsto' => $inicio_previsto,
        //             'fim_prev' => $fim_previsto,
        //             'inicio_real' => $inicio_realizado,
        //             'fim_real' => $fim_realizado,
        //             'status' => $status,
        //             'ponto_problematico' => $pontos_problematicos,
        //             'acao_futura_1' => $acao_futura,
        //             'problema_responsavel_id' => $id_usuario,
        //             'reprogramacao1' => $reprogramacao_1,
        //             'reprogramacao2' => $reprogramacao_2
        // ]);


        /* 
        tipo_de_plano !
        causa_correlacionada !
        sigeam !
            codigo ( nao ira precisar)
        indicador !
        causa !
        acao  !
        tarefa !
        responsavel ?
        inicio_previsto !
        fim_previsto !
        inicio_realizado !
        fim_realizado !
            
            status ( nao ira precisar) ?
            descricao_do_status ( nao ira precisar) ?
            relato_de_execucao_da_tarefa ?

        pontos_problematicos !

        acao_futura !
        
        reprogramacao_1
        reprogramacao_2
        
        coordenadoria
        municipio
        coordenador_nig
        assessor_de_gestao

        */

        // \Log::info($tipo_plano);
        // \Log::warning($indicador_array);
        // \Log::alert($data);



        // \Log::info($data);

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