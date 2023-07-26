<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PodcastController;
use App\Http\Controllers\SyncController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'guest'], function () {
    Route::get('/', function () {
        return view('welcome');
    })->name('home');
});


Route::group(['middleware' => 'auth'], function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/podcasts', [PodcastController::class, 'store'])->name('podcast.store');
    Route::put('/podcasts', [PodcastController::class, 'update'])->name('podcast.update');
    Route::post('/podcasts/refresh', [PodcastController::class, 'refresh'])->name('podcast.refresh');
    Route::post('/syncs', [SyncController::class, 'store'])->name('sync.store');
    Route::post('/syncs/all', [SyncController::class, 'all'])->name('sync.all');
    Route::delete('/podcasts', [PodcastController::class, 'destroy'])->name('podcast.destroy');
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
});
