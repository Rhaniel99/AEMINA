<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    sleep(3);
    return Inertia::render('Home', ['name' => 'rhanis']);
});

// Route::inertia('/', 'Home');
