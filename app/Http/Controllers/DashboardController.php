<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Podcast;

class DashboardController extends Controller
{
    public function index()
    {
        $podcast = Podcast::where('user_id', auth()->user()->id)->first();
        $podcast['items'] = $podcast->getFeedItems(false);

        return Inertia::render('Dashboard')->with([
            'auth' => [
                'user' => auth()->user()
            ],
            'podcast' => $podcast,
        ]);
    }
}
