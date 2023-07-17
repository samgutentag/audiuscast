<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Podcast extends Model
{
    use HasFactory;

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

    public function getFeedItems($rss = false)
    {
        $items = Cache::remember('feed-items:' . $this->id, 10, function () use ($rss) {
            $entries = [];
            try {
                if($rss == false) {
                    $rss = new \SimpleXMLElement(file_get_contents($this->url));
                }
                foreach ($rss->channel->item as $item) {
                    $guid = $item->guid->__toString();
                    $sync = Sync::where('guid', $guid)->first();
                    $has_sync = $sync !== null;
                    $is_synced = $has_sync ? $sync->is_synced : false;
                    $is_syncing = $has_sync ? $sync->is_syncing : false;
                    $source = ((array)$item->enclosure->attributes())['@attributes']['url'];
                    $namespaces = $item->getNameSpaces(true);
                    $nodes = $item->children($namespaces['itunes']);
                    try {
                        array_push($entries, [
                            'title' => rtrim(ltrim($item->title->__toString())),
                            'date' => $item->pubDate->__toString(),
                            'image' => $rss->channel->image->url->__toString(),
                            'description' => strip_tags(html_entity_decode(rtrim(ltrim($item->description->__toString())))),
                            'source' => $source,
                            'guid' => $guid,
                            'has_sync' => $has_sync,
                            'status' => $has_sync ? $sync->status : 'unlisted',
                            'audius_url' => $is_synced ? $sync->audius_url : '#',
                            'tags' => $nodes->keywords->__toString()
                        ]);
                    } catch (\Throwable $th) {
                        //throw $th;
                    }
                }
            } catch (\Throwable $th) {
                //throw $th;
            }
            return $entries;
        });
        return $items;
    }
}
