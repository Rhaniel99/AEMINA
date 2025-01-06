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
        Schema::create('media_schema.episodes', function (Blueprint $table) {
            $table->uuid('id')->primary();
            // Relacionamentos
            $table->uuid('season_id');
            
            $table->integer('episode_number');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('file_path')->nullable();
            $table->timestamps();
            // Chave estrangeira
            $table->foreign('season_id')
            ->references('id')
            ->on('media_schema.seasons')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_schema.episodes');
    }
};
