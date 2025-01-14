<?php

namespace Database\Seeders;

use App\Models\Categories;
use App\Models\ContentType;
use App\Models\Media;
use App\Models\MediaCategory;
use App\Models\MediaFiles;
use Illuminate\Database\Seeder;

class MediaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contentTypeFilm = ContentType::where('type', 'filme')->first(); // Corrigido para 'film'
        $categories = Categories::all();

        // Define o profile_id fixo fornecido
        $userId = '15d6f290-055a-4161-9f5f-7732c27c6fba';

        // Cria os filmes
        $films = [
            [
                'title' => 'Inception',
                'description' => 'A mind-bending thriller about dreams within dreams.',
                'release_date' => '2010-07-16',
                'content_type_id' => $contentTypeFilm->id,
                'cover_image_path' => 'covers/inception.jpg',

            ],
            [
                'title' => 'The Matrix',
                'description' => 'A hacker discovers the shocking truth about his world.',
                'release_date' => '1999-03-31',
                'content_type_id' => $contentTypeFilm->id,
                'cover_image_path' => 'covers/the_matrix.jpg',

            ],
            [
                'title' => 'Interstellar',
                'description' => 'Exploring the far reaches of space to save humanity.',
                'release_date' => '2014-11-07',
                'content_type_id' => $contentTypeFilm->id,
                'cover_image_path' => 'covers/interstellar.jpg',
            ],
        ];

        // Inserir filmes na tabela 'media'
        foreach ($films as $film) {
            $newFilm = Media::create([
                'profile_id' => $userId,
                'title' => $film['title'],
                'description' => $film['description'],
                'release_date' => $film['release_date'],
                'content_type_id' => $film['content_type_id'],
                'cover_image_path' => $film['cover_image_path'],
            ]);

            // Associa as categorias ao filme
            $selectedCategories = $categories->take(2); // Pega as 2 primeiras categorias
            foreach ($selectedCategories as $category) {
                MediaCategory::create([
                    'media_id' => $newFilm->id,
                    'category_id' => $category->id,
                ]);
            }

            $normalized_title = strtolower(str_replace(' ', '_', $film['title']));
            // Adiciona os arquivos de mídia
            MediaFiles::create([
                'media_id' => $newFilm->id,
                'file_path' => "films/{$normalized_title}/{$normalized_title}_720p.mp4",
                'upload_status' => 'completed',
                'upload_progress' => 100,
            ]);
        }
    }
}
