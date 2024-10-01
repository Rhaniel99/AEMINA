<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class TipoAcao extends Model 
{
    use HasFactory;

    // Define o nome da tabela
    protected $table = 'tipo_acao';

    // Campos que podem ser preenchidos em massa
    protected $fillable = [
        'acao',
    ];
}