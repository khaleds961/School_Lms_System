<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Admin extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable =[
        'UserName',
        'Email',
        'password',
        'Image',
        'Number',
    ];


    protected $hidden = [
        'password', 
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
  
      public function getJWTIdentifier()
      {
          return $this->getKey();
      }
  
      public function getJWTCustomClaims()
      {
          return [];
      }
      public function setPasswordAttribute($password)
      {
          if ( !empty($password) ) {
              $this->attributes['password'] = bcrypt($password);
          }
      }    
    
}
