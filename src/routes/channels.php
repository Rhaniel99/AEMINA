<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('profile.{profile_id}', function ($user, $profile_id) {
    return \App\Models\UserProfiles::where('id', $profile_id)
        ->where('user_id', $user->id)
        ->exists();
});