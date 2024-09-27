<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PostController::class,'index']);

Route::resource('posts', PostController::class)->except('index');

Route::resource('login', LoginController::class);


// Route::get('/', function () {
//     sleep(3);
//     return Inertia::render('Home', ['name' => 'rhanis']);
// });

// Route::inertia('/', 'Home');
