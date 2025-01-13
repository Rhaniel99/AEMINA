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
        Schema::create('media_schema.profile_favorites', function (Blueprint $table) {
            $table->uuid('id')->primary();
            // Relacionamentos
            $table->uuid('profile_id');
            $table->uuid('media_id');

            $table->timestamps();

            // Chave estrangeira
            $table->foreign('profile_id')
            ->references('id')
            ->on('user_profiles')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();

            $table->foreign('media_id')
            ->references('id')
            ->on('media_schema.media')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_schema.profile_favorites');
    }
};
