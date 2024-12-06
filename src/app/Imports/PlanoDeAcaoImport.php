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
    protected $id_user;

    public function __construct($id_user)
    {
        $this->id_user = $id_user; // Recebendo o id do usuário
    }

    public function onRow(Row $row)
    {
        // $data = $this->normalizeData($row->toArray());
        $data = $row->toArray(); // Converte a linha em um array associativo

        // ? Normalizando os dados
            // * Acentos, minúsculas e espaços em branco inicio e fim.
        $tipo_plano = trim(Normalize::nAccent(Normalize::nLower($data['tipo_de_plano'])));
        $indicador_array = trim(Normalize::nAccent(Normalize::nLower($data['indicador'])));

        // ? Causa e relações
        $causa = $data['causa'];
        $causa_correlacionada = $data['causa_correlacionada'];

        // ? Tarefas e Relato de Execução
        $tarefa = $data['tarefa'];
        $relato_exec = $data['relato_de_execucao_da_tarefa'];

        // ? Resp da planilha
        $responsavel = $data['responsavel'];

        // ? Datas
            // * Previstos
        $inicio_previsto = Normalize::nDate($data['inicio_previsto']);
        $fim_previsto = Normalize::nDate($data['fim_previsto']);
            // * Realizado
        $inicio_realizado = Normalize::nDate($data['inicio_realizado']);
        $fim_realizado = ($data['fim_realizado'] != 'CANCELADA') ? Normalize::nDate($data['fim_realizado']) : null;

        if ($fim_realizado == null) {
            $status = 'Cancelado';
        } elseif ($fim_realizado) {
            $status = 'Concluido';
        }

        $cod_escola = $data['sigeam'];
        $pontos_problematicos = $data['pontos_problematicos'];

        // ? Ações
        $acao = $data['acao'];
        $acao_futura = $data['acao_futura'];

        // ? Reprogramações
        $reprogramacao_1 = Normalize::nDate($data['reprogramacao_1']);
        $reprogramacao_2 = Normalize::nDate($data['reprogramacao_2']);

        $tipoAcao = TipoAcao::firstOrCreate(
            [
                'acao' => $tipo_plano
            ],
            [
                'acao' => $tipo_plano
            ]
        );

        $indicador = Indicador::firstOrCreate(
            [
                'indicador' => $indicador_array
            ],
            [
                'indicador' => $indicador_array
            ]
        );

        $ano_atual = date('Y');

        $plano = PlanoAcao::create(
            [
                'ano_base' => $ano_atual,
                'id_tipo_acao' => $tipoAcao->id,
                'indicador_id' => $indicador->id,
                'causa_correlacionada' => $causa_correlacionada,
                'cod_escola' => $cod_escola,
                'causa' => $causa,
                'acao' => $acao,
                'tarefa' => $tarefa,
                'inicio_prev' => $inicio_previsto,
                'fim_prev' => $fim_previsto,
                'inicio_real' => $inicio_realizado,
                'fim_real' => $fim_realizado,
                'status' => $status,
                'ponto_problematico' => $pontos_problematicos,
                'acao_futura_1' => $acao_futura,
                'problema_responsavel_id' => $this->id_user,
                'reprogramacao1' => $reprogramacao_1,
                'reprogramacao2' => $reprogramacao_2
            ]
        );

        if ($status == 'Concluido') {
            $plano->fim_real_relato = $relato_exec;
        } elseif ($status == 'Cancelado') {
            $plano->cancelamento_relato = $relato_exec;
        }

        // ? Salva as alterações
        $plano->save();

        return;
    }
}