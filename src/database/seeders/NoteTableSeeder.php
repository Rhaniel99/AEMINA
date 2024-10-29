<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Seeder;

class NoteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(string $user_id): void  // Mude int para string    
    {
        // Exemplo de notas para o usuário
        DB::table('notes_schema.notes')->insert([
            [
                'user_id' => $user_id,
                'title' => 'First Note',
                'content' => '# This is the first note in Markdown!',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $user_id,
                'title' => 'Second Note',
                'content' => '## This is the second note with more content.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
