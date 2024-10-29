<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    use HasFactory;

    protected $table = 'notes_schema.notes'; // Define a tabela com o schema

    protected $fillable = ['user_id', 'title', 'content'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
