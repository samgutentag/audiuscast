<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Podcast;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use App\Models\Sync;
use App\Jobs\SyncEpisode;

class AudiusSync extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'audius:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync auto sync podcasts ';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $podcasts = Podcast::where('auto_sync', true)
            ->where('synced_at', '<=', Carbon::now()->subHours(4)->toDateTimeString())->get();

        foreach ($podcasts as $podcast) {
            $episode = $podcast->getFreshFeedItems();
            foreach ($episode as $episode) {
                $sync = Sync::where('guid', $episode['guid'])->where('user_id', $podcast->user->id)->first();
                if(!$sync && Carbon::parse($episode['date']) > Carbon::parse($podcast->initial_sync_date)) {
                    $sync = Sync::create([
                        'user_id' => $podcast->user->id,
                        'podcast_id' => $podcast->id,
                        'title' => $episode['title'],
                        'image' => $episode['image'],
                        'source' => $episode['source'],
                        'guid' => $episode['guid'],
                        'status' => 'queued',
                        'automated' => true
                    ]);
                    dispatch(new SyncEpisode($sync));
                }
            }

        }

    }
}
