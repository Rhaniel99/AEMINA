<?php

use App\Http\Controllers\AeminaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\PlanoAcaoController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

Route::get(
    '/',
    fn() => Auth::check()
    ? to_route('aemina.index', ['content' => 'filme', 'category' => 'lancamento'])
    : inertia('Public/Home/index')
)->name('home');

Route::middleware(['auth'])->group(function () {
    Route::inertia('/create-profile', 'Public/Profile/create')->name('profile.create');
    Route::post('/create-profile/{id_user}', [ProfileController::class, 'store'])->name('profile.store');
});

Route::middleware(['auth', 'ensure.profile.exists'])->group(function () {
    Route::get('/index-profile', [ProfileController::class, 'index'])->name('profile.index');
    Route::get('/selected-profile/{id_user}', [ProfileController::class, 'selected'])->name('profile.selected');
});

Route::middleware(['auth', 'ensure.profile.exists', 'check.selected.profile'])->group(function () {
    // ? Rotas de atualização para Login
    Route::patch('/login/update/{id_user}/{type}', [LoginController::class, 'update'])->name('login.update');

    Route::resource('test', TestController::class);
    // Route::post('/tus/tus', [TestController::class, 'store'])->name('test.store');

    Route::controller(AeminaController::class)->group(function () {
        //* Get
        Route::get('/aemina/repository', 'repository')->name('aemina.repository');
        Route::get('/aemina/{content?}/{category?}', 'index')
            ->defaults('content', 'filme')
            ->defaults('category', 'lancamento')
            ->name('aemina.index');
        Route::get('/aemina/{content}/{category}/{movie_id}', 'show')->name('aemina.show');

        //* Post
        Route::post('/aemina/favorite/{id_media}', 'favorite')->name('aemina.favorite');
        Route::post('/aemina/{id_media}/{content}', 'update')->name('aemina.update');
        Route::post('/aemina/{content}', 'store')->name('aemina.store');
    });

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
    Route::get('/auth/google', 'auth_google')->name('auth.google');
    Route::get('/auth/google-callback', 'auth_google_callback')->name('auth.google.callback');
});

Route::get('send', function () {
    $message['status'] = request()->query('status', 'success');
    $message['body'] = 'Mensagem padrao notificação...';

    $u = \App\Models\User::first();

    $u->notify(new \App\Notifications\MessageTestNotification($message));

    return 'Notificacao enviada';
});

Route::get('login/{id}', fn($id) => auth()->loginUsingId($id));

// Route::get('/', function () {
//     sleep(3);
//     return Inertia::render('Home', ['name' => 'rhanis']);
// });

// Route::inertia('/', 'Home');
