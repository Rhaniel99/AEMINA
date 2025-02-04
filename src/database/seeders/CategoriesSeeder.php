<?php

namespace Database\Seeders;

use App\Models\Categories;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = ['ação', 'drama', 'comédia'];

        foreach ($types as $type) {
            Categories::create([
                'name' => $type,
                'name_normalized' => fnStrings($type),
            ]);
        }
    }
}
