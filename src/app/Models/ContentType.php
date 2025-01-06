<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid; 


class ContentType extends Model
{
    use HasFactory, Uuid;

    protected $table = 'media_schema.content_types';

    // Campos que podem ser preenchidos em massa
    protected $fillable = [
        'type',
    ];

    protected $keyType = 'uuid';

    public $incrementing = false;

    public function media()
    {
        return $this->hasMany(Media::class, 'content_type_id');
    }

}
