<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NoteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Exemplo de notas para o usuário com ID 1 (pode ajustar conforme necessário)
        DB::table('notes_schema.notes')->insert([
            [
                'user_id' => '283b35cd-05a7-456a-9aa7-6c0c26a89142',
                'title' => 'First Note',
                'content' => '# This is the first note in Markdown!',
                'content_html' => '<h1>This is the first note in Markdown!</h1>',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => '283b35cd-05a7-456a-9aa7-6c0c26a89142',
                'title' => 'Second Note',
                'content' => '## This is the second note with more content.',
                'content_html' => '<h2>This is the second note with more content.</h2>',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
