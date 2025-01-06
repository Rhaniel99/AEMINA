<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        // Cria o esquema 'media' caso não exista
        DB::statement('CREATE SCHEMA IF NOT EXISTS media_schema');

        // Cria a tabela dentro do esquema 'media'
        Schema::create('media_schema.content_types', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->enum('type', ['filme', 'serie', 'anime']); // Enum for type
            $table->timestamps(); // Created_at and Updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        // Remove a tabela dentro do esquema 'media'
        Schema::dropIfExists('media_schema.content_types');

        // Opcional: Remova o esquema se não for mais necessário
        DB::statement('DROP SCHEMA IF EXISTS media_schema CASCADE');
    }
};
