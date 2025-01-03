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
        Schema::create('user_profiles', function (Blueprint $table) {
            $table->uuid('id')->primary(); // Chave primária como UUID
            $table->uuid('user_id'); // FK para a tabela users
            $table->string('username'); // Nome do perfil
            $table->string('avatar')->nullable(); // Avatar do perfil, opcional
            $table->boolean('is_kids')->default(false); // Indica se o perfil é para crianças
            $table->timestamps(); // Campos created_at e updated_at

            // Chave estrangeira para a tabela users
            $table->foreign('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
