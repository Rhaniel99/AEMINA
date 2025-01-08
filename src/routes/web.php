<?php

use App\Http\Controllers\AeminaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\PlanoAcaoController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    if (Auth::check()) {
        return to_route('aemina.index');
    } else {
        return inertia('Public/Home/Index');
    }
})->name('home');

Route::resource('posts', PostController::class);

Route::middleware(['auth'])->group(function () {
    Route::inertia('/create-profile', 'Public/Profile/Create')->name('profile.create');
    Route::post('/create-profile/{id_user}', [ProfileController::class, 'store'])->name('profile.store');
});

Route::middleware(['auth', 'ensure.profile.exists'])->group(function () {
    Route::get('/index-profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/selected-profile/{id_user}', [ProfileController::class, 'selected'])->name('profile.selected');
});

Route::middleware(['auth', 'ensure.profile.exists', 'check.selected.profile'])->group(function () {
    // ? Rotas de atualização para Login
    Route::patch('/login/update/{id_user}/{type}', [LoginController::class, 'update'])->name('login.update');

    Route::resource('media', MediaController::class)->except(['index', 'show']);
    Route::get('/media/{content}/{category}', [MediaController::class, 'index'])->name('media.index');
    Route::get('/media/{content}/{category}/{movie_id}', [MediaController::class, 'show'])->name('media.show');

    Route::resource('aemina', AeminaController::class);

    // ? Rotas de atualização para Plano de Acão antigo projeto!
    Route::controller(PlanoAcaoController::class)->group(function () {
        Route::post('/uploadCSV', 'uploadCSV')->name('planoAcao.upload');
    });

    // ? Projeto Antigo
    Route::resource('note', NoteController::class);
});

Route::controller(LoginController::class)->group(function () {
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
