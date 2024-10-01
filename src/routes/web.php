<?php

use App\Http\Controllers\AeminaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PlanoAcaoController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/teste', function () {
//     $redis = Redis::connection();
//     // $redis->set('username', 'rhanis');
//     return $redis->get('username');
// });

Route::inertia('/', 'Homepage')->name('home');

// Route::resource('posts', PostController::class)->except('index');

Route::middleware(['auth'])->group(function () {
    Route::resource('aemina', AeminaController::class);

    Route::controller(PlanoAcaoController::class)->group(function () {
        Route::post('/uploadCSV', 'uploadCSV')->name('planoAcao.upload');
    });
});

Route::controller(LoginController::class)->group(function () {
    Route::get('/login', 'index')->name('login');
    Route::post('/login', 'store')->name('login.store');
    Route::post('/create', 'create')->name('login.create');
    Route::post('/logout', 'destroy')->name('login.logout');
});

// Route::resource('login', LoginController::class);


// Route::get('/', function () {
//     sleep(3);
//     return Inertia::render('Home', ['name' => 'rhanis']);
// });

// Route::inertia('/', 'Home');
