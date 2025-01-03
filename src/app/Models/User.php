<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Traits\Uuid; 

class User extends Authenticatable
{
    use HasFactory, Notifiable, Uuid;

    protected $fillable = [
        'name',
        'email',
        'password',
        'birth_date'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'birth_date' => 'date',
        ];
    }

    public function profiles()
    {
        return $this->hasMany(UserProfiles::class);
    }

    // Indica que o campo 'id' é do tipo UUID
    protected $keyType = 'uuid';
    // Indica que o valor do campo 'id' será gerado automaticamente
    public $incrementing = false;
}
