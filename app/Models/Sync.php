<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sync extends Model
{
    use HasFactory;

    protected $attributes = ['audius_url'];
    protected $guarded = [];

    public function getAudiusUrlAttribute()
    {
        $audius_host = config('app.audius_url');
        return "{$audius_host}{$this->attributes['audius_url']}";
    }

    public function podcast()
    {
        return $this->belongsTo(Podcast::class);
    }
}
