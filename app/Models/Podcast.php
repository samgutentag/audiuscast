<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;
use willvincent\Feeds\Facades\FeedsFacade;

class Podcast extends Model
{
    use HasFactory;

    protected $appends = ['items'];
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function syncs()
    {
        return $this->hasMany(Sync::class);
    }

    public function getFreshFeedItems()
    {
        Cache::forget('feed-items:' . $this->id);
        return $this->getFeedItems();
    }

    public function getFeedItems()
    {
        $items = Cache::remember('feed-items:' . $this->id, 60 * 60 * 24, function () {
            $entries = [];
            $feed = FeedsFacade::make($this->url);
            foreach($feed->get_items() as $item) {
                if(str_contains($item->get_enclosure()->get_type(), 'audio')) {
                    $guid = $item->get_id();
                    $title = $item->get_title();
                    $sync = Sync::where('guid', $guid)->first();
                    $thumbnail = $item->get_enclosure()->get_thumbnail();
                    array_push($entries, [
                        'title' => $title,
                        'date' => $item->get_date(),
                        'image' => $thumbnail ? $thumbnail : "",
                        'description' => $item->get_description(),
                        'tags' => $item->get_categories(),
                        'source' => $item->get_enclosure()->get_link(),
                        'guid' => $guid,
                        'status' => $sync !== null ? $sync->status : 'unlisted',
                        'audius_url' => $sync !== null ? $sync->audius_url : '#',
                    ]);
                }
            }
            return $entries;
        });
        return $items;
    }

    public function getItemsAttribute()
    {
        return $this->getFeedItems();
    }
}
