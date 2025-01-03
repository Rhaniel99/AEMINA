<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;


class UserProfiles extends Model
{
    use HasFactory, Uuid;

    protected $fillable = [
        'user_id',
        'username',
        'avatar',
        'is_kids'
    ];

    // Indica que o campo 'id' é do tipo UUID
    protected $keyType = 'uuid';
    // Indica que o valor do campo 'id' será gerado automaticamente
    public $incrementing = false;
}
