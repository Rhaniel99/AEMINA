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

        User::firstOrCreate([
            'name' => 'rhaniel monteiro',
            'email' => 'rhanielmonteiro.13@gmail.com',
            'birth_date' => '1998-04-09',
            'password' => bcrypt(748596)
        ]);

        Post::factory(2)->create();
    }
}
