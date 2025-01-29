<?php

use App\Http\Controllers\AeminaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\PlanoAcaoController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    if (Auth::check()) {
        return to_route('aemina.index', ['content' => 'filme','category' => 'lancamento']);
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
    Route::patch('/login/update/{id_user}/{type}', action: [LoginController::class, 'update'])->name('login.update');

    Route::resource('test', TestController::class);
    // Route::post('/tus/tus', [TestController::class, 'store'])->name('test.store');


    Route::resource('aemina', AeminaController::class)->except(['index', 'show', 'store', 'update']);
    Route::post('/aemina/{id_media}/{content}', [AeminaController::class, 'update'])->name('aemina.update');
    Route::post('/aemina/{content}', [AeminaController::class, 'store'])->name('aemina.store');
    Route::get('/aemina/{content}/{category}', [AeminaController::class, 'index'])->name('aemina.index');
    Route::get('/aemina/list-media', [AeminaController::class, 'list_media'])->name('aemina.list.media');
    Route::get('/aemina/{content}/{category}/{movie_id}', [AeminaController::class, 'show'])->name('aemina.show');

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

Route::get('send', function () {
    $message['status'] = request()->query('status', 'success');
    $message['body'] = 'Mensagem padrao notificação...';

    $u = \App\Models\User::first();

    $u->notify(new \App\Notifications\MessageTestNotification($message));

    return 'Notificacao enviada';
});

Route::get('login/{id}', fn ($id) => auth()->loginUsingId($id));

// Route::get('/', function () {
//     sleep(3);
//     return Inertia::render('Home', ['name' => 'rhanis']);
// });

// Route::inertia('/', 'Home');
