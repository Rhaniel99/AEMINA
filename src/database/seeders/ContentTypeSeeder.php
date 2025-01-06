<?php

namespace Database\Seeders;

use App\Models\ContentType;
use Illuminate\Database\Seeder;

class ContentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = ['filme', 'serie', 'anime'];

        foreach ($types as $type) {
            ContentType::create(['type' => $type]);
        }
    }
}
