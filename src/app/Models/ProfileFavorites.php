<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProfileFavorites extends Model
{
    use HasFactory;
    protected $table = 'media_schema.profile_favorites';
    public $incrementing = false;

    protected $fillable = [
        'profile_id',
        'media_id',
    ];

}
