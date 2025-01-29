<?php

use App\Http\Middleware\EnsureUserProfileExists;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {

        $middleware->alias([
            'ensure.profile.exists' => EnsureUserProfileExists::class,
            'check.selected.profile' => App\Http\Middleware\CheckSelectedProfile::class
        ]);

        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);

        $middleware->redirectGuestsTo(fn () => route('home'));
        
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
