<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast; // Adicione esta linha
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class JobFailedNotification implements ShouldBroadcast // Implemente a interface
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
        return 'job.failed'; // Nome do evento que será ouvido no frontend
    }

    // Opcional: Personalize os dados enviados para o frontend
    public function broadcastWith()
    {
        return [
            'message' => $this->message,
            'profile_id' => $this->profile_id,
        ];
    }
}