<?php

namespace App\Http\Controllers;

use App\Models\Podcast;
use App\Models\Sync;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Jobs\SyncEpisode;
use Carbon\Carbon;
use willvincent\Feeds\Facades\FeedsFacade;

class PodcastController extends Controller
{
    public function store(Request $request)
    {
        try {
            $feed = FeedsFacade::make($request->url);
        } catch (\Throwable $th) {
            return back()->withErrors(['url' => 'This podcast feed is invalid.']);
        }
        $payload = [
            'user_id' => Auth::user()->id,
            'description' => strip_tags($feed->get_description()),
            'name' => $feed->get_title(),
            'url' => $request->url
        ];
        $podcast = Podcast::create($payload);
        $items = $podcast->getFeedItems();

        if(count($items) == 0) {
            $podcast->delete();
            return back()->withErrors(['url' => 'This podcast feed has no audio episodes.']);
        }

        $item = $items[0];

        $podcast->initial_sync_date = Carbon::parse($item['date']);
        $podcast->save();

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

    public function update(Request $request)
    {
        $podcast = Auth::user()->podcast;
        $podcast->update($request->all());
        return to_route('dashboard');
    }

    public function destroy(Request $request)
    {
        $podcast = Auth::user()->podcast;
        $podcast->delete();
        return to_route('dashboard');
    }
}
