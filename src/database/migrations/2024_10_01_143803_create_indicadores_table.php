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
        // ? Dropar o schema antes de criar novamente
        DB::statement('DROP SCHEMA IF EXISTS gestao_schema CASCADE');
        // ? Criar o novo schema
        DB::statement('CREATE SCHEMA IF NOT EXISTS gestao_schema');
        
        Schema::create('gestao_schema.indicadores', function (Blueprint $table) {
            $table->increments('id'); // ID do indicador (auto-incremento)
            $table->string('indicador'); // Nome do indicador

            // Timestamps de criação e atualização
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP SCHEMA IF EXISTS gestao_schema CASCADE');

        Schema::dropIfExists('gestao_schema.indicadores');
    }
};
