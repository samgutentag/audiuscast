<?php

namespace App\Http\Controllers;

use App\Models\Podcast;
use App\Models\Sync;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Jobs\SyncEpisode;
use willvincent\Feeds\Facades\FeedsFacade;

class PodcastController extends Controller
{
    public function store(Request $request)
    {
        $feed = FeedsFacade::make($request->url);

        $payload = [
            'user_id' => Auth::user()->id,
            'description' => $feed->get_description(),
            'name' => $feed->get_title(),
            'url' => $request->url,
            'auto_sync' => true
        ];
        $podcast = Podcast::create($payload);
        $items = $podcast->getFeedItems();
        $item = $items[0];

        $sync = Sync::create([
            'user_id' => Auth::user()->id,
            'podcast_id' => $podcast->id,
            'title' => $item['title'],
            'image' => $item['image'],
            'source' => $item['source'],
            'guid' => $item['guid'],
            'status' => 'queued'
        ]);
        $sync->podcast->getFreshFeedItems();

        dispatch(new SyncEpisode($sync));

        return to_route('dashboard');
    }

    public function refresh(Request $request)
    {
        $podcast = Auth::user()->podcast;
        $podcast->getFreshFeedItems();
        return to_route('dashboard');
    }
}
