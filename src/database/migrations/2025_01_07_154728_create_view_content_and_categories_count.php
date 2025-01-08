<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('
            CREATE OR REPLACE VIEW media_schema.content_and_categories_count AS
            SELECT 
                ct.type AS content_type,
                c.name AS category_name,
                lower(unaccent(c.name)) AS category_name_normalized, -- Coluna com nomes normalizados (sem acentos e em minúsculas)
                count(m.id) AS media_count
            FROM 
                media_schema.media m
            JOIN 
                media_schema.content_types ct 
                ON m.content_type_id = ct.id
            JOIN 
                media_schema.media_category mc 
                ON m.id = mc.media_id
            JOIN 
                media_schema.categories c 
                ON mc.category_id = c.id
            GROUP BY 
                ct.type, 
                c.name;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_schema.content_and_categories_count');
    }
};
