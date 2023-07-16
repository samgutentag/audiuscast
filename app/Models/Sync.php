<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sync extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function podcast()
    {
        return $this->belongsTo(Podcast::class);
    }
}
