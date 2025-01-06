<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid; 


class MediaFiles extends Model
{
    use HasFactory, Uuid;
    protected $table = 'media_schema.media_files';

    protected $fillable = [
        'media_id',
        'file_path',
    ];

    protected $keyType = 'uuid';
    public $incrementing = false;
    
    public function media()
    {
        return $this->belongsTo(Media::class, 'media_id');
    }
}
