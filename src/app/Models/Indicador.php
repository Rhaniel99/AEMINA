<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Indicador extends Model 
{
    use HasFactory;

    protected $table = 'indicadores';

    // Campos que podem ser preenchidos em massa
    protected $fillable = [
        'indicador',
    ];

    // Relação com o modelo PlanoAcao
    public function planoAcoes()
    {
        return $this->hasMany(PlanoAcao::class, 'indicador_id');
    }
}