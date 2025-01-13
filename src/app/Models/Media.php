<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\Uuid;


class Media extends Model
{
    use HasFactory, Uuid;

    protected $table = 'media_schema.media';

    protected $fillable = [
        'profile_id',
        'title',
        'description',
        'release_date',
        'content_type_id',
        'cover_image_path',
        'status',
    ];

    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'user_id');
    // }

    public function profile()
    {
        return $this->belongsTo(UserProfiles::class, 'profile_id');
    }

    // ? Content Type
    public function contentType()
    {
        return $this->belongsTo(ContentType::class, 'content_type_id');
    }

    public function scopeOfContentType($query, $type)
    {
        return $query->whereHas('contentType', function ($query) use ($type) {
            $query->where('type', $type);
        });
    }
    // !

    public function categories()
    {
        return $this->belongsToMany(
            Categories::class, 
            'media_schema.media_category', 
            'media_id', 
            'category_id'
        );
    }

    public function files()
    {
        return $this->hasMany(MediaFiles::class, 'media_id');
    }

    public function seasons()
    {
        return $this->hasMany(Seasons::class, 'media_id');
    }

    public function userHistory()
    {
        return $this->hasMany(UserHistory::class, 'media_id');
    }

    public function ratings()
    {
        return $this->hasMany(MediaRatings::class, 'media_id');
    }

    public function favorites()
    {
        return $this->hasMany(UserFavorites::class, 'media_id');
    }

    protected $keyType = 'uuid';
    public $incrementing = false;
}
