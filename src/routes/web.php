<?php

use App\Http\Controllers\AeminaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PostController::class,'index']);

Route::resource('posts', PostController::class)->except('index');


Route::resource('aemina', AeminaController::class);


Route::controller(LoginController::class)->group(function () {
    Route::get('/login', 'index')->name('login.index');
    Route::post('/login', 'store')->name('login.store');
    Route::post('/logout', 'destroy')->name('logout');
});

// Route::resource('login', LoginController::class);


// Route::get('/', function () {
//     sleep(3);
//     return Inertia::render('Home', ['name' => 'rhanis']);
// });

// Route::inertia('/', 'Home');
