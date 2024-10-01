<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid; 

class PlanoAcao extends Model
{
    use HasFactory, Uuid;

    // Define o nome da tabela, se diferente do padrão plural
    protected $table = 'plano_acao';

    // Campos que podem ser preenchidos em massa
    protected $fillable = [
        'ano_base',
        'id_tipo_acao',
        'causa_correlacionada',
        'cod_escola',
        'indicador_id',
        'causa',
        'acao',
        'tarefa',
        'responsavel_id',
        'inicio_prev',
        'fim_prev',
        'inicio_real',
        'fim_real',
        'ponto_problematico',
        'acao_futura_1',
        'acao_futura_2',
        'problema_responsavel_id',
        'reprogramacao1',
        'reprogramacao2',
    ];

    // Indica que o campo 'id' é do tipo UUID
    protected $keyType = 'uuid';

    // Desativa a auto-incrementação
    public $incrementing = false;
}
