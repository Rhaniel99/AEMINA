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
        CREATE VIEW media_schema.content_and_categories_count AS
                SELECT
                    ct.type AS content_type,
                    c.name AS category_name,
                    COUNT(m.id) AS media_count
                FROM
                    media_schema.media AS m
                JOIN
                    media_schema.content_types AS ct ON m.content_type_id = ct.id
                JOIN
                    media_schema.media_category AS mc ON m.id = mc.media_id
                JOIN
                    media_schema.categories AS c ON mc.category_id = c.id
                GROUP BY
                    ct.type, c.name;
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
