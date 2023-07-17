<?php

namespace App\Http\Controllers;

use App\Models\Podcast;
use App\Models\Sync;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PodcastController extends Controller
{
    public function store(Request $request)
    {
        $url = $request->url;
        $rss = new \SimpleXMLElement(file_get_contents($url));
        $payload = [
            'user_id' => Auth::user()->id,
            'description' => $rss->channel->description->__toString(),
            'name' => rtrim(ltrim($rss->channel->title->__toString())),
            'url' => $url,
            'auto_sync' => true
        ];
        $podcast = Podcast::create($payload);
        $payload['items'] = $podcast->getFeedItems($rss);
        $item = $payload['items'][0];
        // $metadata = [
        //     'releaseDate' => $item['date'],
        //     'description' => $item['description'],
        //     'title' => $item['title'],
        //     'tags' =>  $item['tags']
        // ];
        $sync = Sync::create([
            'user_id' => Auth::user()->id,
            'podcast_id' => $podcast->id,
            'title' => $item['title'],
            'image' => $item['image'],
            'source' => $item['source'],
            'guid' => $item['guid'],
            'status' => 'queued'
        ]);
        // Log::info('dispatching ' . $item['title']);
        // dispatch(new SyncTrack($sync, $item['source'], $metadata, Auth::user()));
        // $sync->feed->getFreshFeedItems();
        // $payload['items'] = $podcast->getFeedItems();
        return to_route('dashboard');
    }

    public function update(Request $request, $id)
    {
        if(!$user = Auth::user()) {
            return response()->json('unauthorized', 401);
        }
        $podcast = Podcast::find($id);
        $podcast->auto_sync = $request->auto_sync;
        $podcast->save();
        $podcast = Podcast::find($id);
        $podcast['items'] = $podcast->getFeedItems();
        return response()->json($podcast);
    }
}
