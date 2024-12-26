<?php

use App\Http\Controllers\AeminaController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NoteController;
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

// Route::inertia('/', 'Homepage')->name('home');
Route::get('/', function () {
    if (Auth::check()) {
        // return inertia('Public/Home/Index');
        return inertia('Aemina/Index');
    } else {
        return inertia('Public/Home/Index');
    }

})->name('home');

Route::resource('posts', PostController::class);

Route::middleware(['auth'])->group(function () {
    Route::patch('/login/update/{id_user}/{type}', [LoginController::class, 'update'])->name('login.update');

    Route::resource('aemina', AeminaController::class);

    Route::controller(PlanoAcaoController::class)->group(function () {
        Route::post('/uploadCSV', 'uploadCSV')->name('planoAcao.upload');
    });

    Route::resource('note', NoteController::class);
});

Route::controller(LoginController::class)->group(function () {
    // Route::get('/documentacao_completa/{id_convocado}', [PDFController::class, 'documentacao_convocado'])->name('doc.pdf');
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
