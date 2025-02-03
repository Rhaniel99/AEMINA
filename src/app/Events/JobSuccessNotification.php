<?php

namespace App\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class JobSuccessNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;
    public $profile_id;

    public function __construct($profile_id, $message)
    {
        $this->profile_id = $profile_id;
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new PrivateChannel("profile.{$this->profile_id}");
    }

    public function broadcastAs()
    {
        return 'job.success'; // Nome do evento para o sucesso
    }

    public function broadcastWith()
    {
        return [
            'message'    => $this->message,
            'profile_id' => $this->profile_id,
        ];
    }
}
