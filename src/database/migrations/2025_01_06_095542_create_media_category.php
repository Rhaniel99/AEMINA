<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('media_schema.media_category', function (Blueprint $table) {
            // $table->uuid('id')->primary();
            
            // Relacionamentos
            $table->uuid('media_id');
            $table->uuid('category_id');

            $table->timestamps();

            // Chave estrangeira
            $table->foreign('media_id')
            ->references('id')
            ->on('media_schema.media')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();

            $table->foreign('category_id')
            ->references('id')
            ->on('media_schema.categories')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_schema.media_category');
    }
};
