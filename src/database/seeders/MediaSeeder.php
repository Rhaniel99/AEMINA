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

        // Define o user_id fixo fornecido
        $userId = '3a21efd4-8d13-420e-85bc-84207387934f';

        // Cria os filmes
        $films = [
            [
                'title' => 'Inception',
                'description' => 'A mind-bending thriller about dreams within dreams.',
                'release_date' => '2010-07-16',
                'content_type_id' => $contentTypeFilm->id,
                'cover_image_path' => 'covers/inception.jpg',
                'status' => 'active',
            ],
            [
                'title' => 'The Matrix',
                'description' => 'A hacker discovers the shocking truth about his world.',
                'release_date' => '1999-03-31',
                'content_type_id' => $contentTypeFilm->id,
                'cover_image_path' => 'covers/matrix.jpg',
                'status' => 'active',
            ],
            [
                'title' => 'Interstellar',
                'description' => 'Exploring the far reaches of space to save humanity.',
                'release_date' => '2014-11-07',
                'content_type_id' => $contentTypeFilm->id,
                'cover_image_path' => 'covers/interstellar.jpg',
                'status' => 'active',
            ],
        ];

        // Inserir filmes na tabela 'media'
        foreach ($films as $film) {
            $newFilm = Media::create([
                'user_id' => $userId,
                'title' => $film['title'],
                'description' => $film['description'],
                'release_date' => $film['release_date'],
                'content_type_id' => $film['content_type_id'],
                'cover_image_path' => $film['cover_image_path'],
                'status' => $film['status'],
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
            ]);
        }
    }
}
