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
        Schema::create('gestao_schema.tipo_acao', function (Blueprint $table) {
            $table->increments('id'); // ID do tipo de ação (auto-incremento)
            $table->string('acao'); // Descrição do tipo de ação

            // Timestamps de criação e atualização
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gestao_schema.tipo_acao');
    }
};
