<?php

namespace App\Jobs;

use App\Models\Sync;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;

class SyncEpisode implements ShouldQueue
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    public Sync $sync;

    public function __construct(Sync $sync)
    {
        $this->sync = $sync;
    }

    public function handle(): void
    {
        try {
            $episode = collect($this->sync->podcast->items)->firstWhere('guid', $this->sync->guid);
            $data = json_encode(json_encode([
                "description" =>  $episode['description'],
                "title" => $episode['title'],
                "tags" => implode(',', $episode['tags']),
                "date" => $episode['date'],
                "image" => $episode['image'],
            ]));
            $directory = "syncs/{$this->sync->id}";
            $audio_path = "{$directory}/audio.mp3";
            $absolute_audio_path = storage_path("app/{$audio_path}");
            $image_path = "{$directory}/image.jpg";
            $absolute_image_path = storage_path("app/{$image_path}");
            Storage::disk('local')->makeDirectory($directory);
            $this->sync->update(['status' => 'syncing']);
            $this->sync->podcast->getFreshFeedItems();
            Storage::disk('local')->put($audio_path, Http::get($this->sync->source)->body());
            if($this->sync->image == "") {
                Process::run("ffmpeg -i {$absolute_audio_path} -an -vcodec copy {$absolute_image_path}");
            } else {
                Storage::disk('local')->put($image_path, Http::get($this->sync->image)->body());
            }
            $audius_sync_path = base_path('audius.ts');
            $command = "npx tsx {$audius_sync_path} ";
            $command.= "--user {$this->sync->podcast->user->audius_id} ";
            $command.= "--data {$data} ";
            $command.= "--audio {$absolute_audio_path} ";
            if(File::exists($absolute_image_path)) {
                $command.= "--image {$absolute_image_path} ";
            }
    
            Log::info($command);
            $process = Process::timeout(600)->run($command);
            Log::info($process->output());
            if($process->successful()) {
                $this->sync->update(['status' => 'synced', 'audius_url' => $process->output()]);
                $this->sync->podcast->getFreshFeedItems();
            }
            if($process->failed()) {
                Log::error($process->output());
                Log::error($process->errorOutput());
                $this->sync->update(['status' => 'failed']);
                $this->sync->podcast->getFreshFeedItems();
                $this->fail();
            }
        } catch (\Exception $e) {
            Log::error('Failed to sync episode: ' . $e->getMessage());
            $this->sync->update(['status' => 'failed']);
            $this->sync->podcast->getFreshFeedItems();
            $this->fail();
        }
    }
}
