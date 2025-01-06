<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid; 


class Categories extends Model
{
    use HasFactory, Uuid;

    protected $table = 'media_schema.categories';

    // Campos que podem ser preenchidos em massa
    protected $fillable = [
        'name',
    ];

    protected $keyType = 'uuid';
    public $incrementing = false;

    public function media()
    {
        return $this->belongsToMany(Media::class, 'media_schema.media_category', 'category_id', 'media_id');
    }
}
