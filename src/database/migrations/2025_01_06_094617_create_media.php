<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('media_schema.media', function (Blueprint $table) {
            $table->uuid('id')->primary();
            // Relacionamentos
            $table->uuid('content_type_id');
            $table->uuid('profile_id');

            $table->string('title');
            $table->text('description')->nullable();
            $table->date('release_date');
            $table->string('cover_image_path')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        
            // Chaves estrangeiras
            $table->foreign('content_type_id')
                  ->references('id')
                  ->on('media_schema.content_types')
                  ->restrictOnDelete()
                  ->cascadeOnUpdate();
        
            $table->foreign('profile_id')
                  ->references('id')
                  ->on('user_profiles')
                  ->cascadeOnDelete()
                  ->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media_schema.media');
    }
};
