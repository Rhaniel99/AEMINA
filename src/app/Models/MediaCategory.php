<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use App\Traits\Uuid; 


class MediaCategory extends Model
{
    use HasFactory;

    protected $table = 'media_schema.media_category';

    // protected $keyType = 'uuid';
    public $incrementing = false;
    
    protected $fillable = [
        'media_id',
        'category_id',
    ];
}
