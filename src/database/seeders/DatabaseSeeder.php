<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::firstOrCreate(
            ['email' => 'rhanielmonteiro.13@gmail.com'],
            [
                'name' => 'rhaniel monteiro',
                'birth_date' => '1998-04-09',
                'password' => bcrypt(748596)
            ]
        );

        Post::factory(2)->create();

        // Chamar o NoteTableSeeder diretamente
        $noteSeeder = new NoteTableSeeder();
        $noteSeeder->run($user->id);  // Passa o ID do usuário   
    }
}
