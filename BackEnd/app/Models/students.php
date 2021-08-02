<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class students extends Model
{
    use HasFactory;
    protected $fillable = [
        'FName', 'LName','Number','Image', 'Email', 'SectionId',
        'BloodType','BirthDate','Adress'
    ];
}