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
        // Verifica se o schema já existe, caso contrário cria
        DB::statement('CREATE SCHEMA IF NOT EXISTS notes_schema');

        Schema::create('notes_schema.notes', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('user_id'); // Chave estrangeira para vincular ao usuário
            $table->string('title'); // Título da nota
            $table->text('content'); // Conteúdo da nota (Markdown)
            $table->text('content_html')->nullable(); // Conteúdo em HTML (convertido do Markdown)
            $table->timestamps(); // Criado em / Atualizado em

            // Definindo a relação com a tabela de usuários
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes_schema.notes');
        // Schema::dropIfExists('notes');
    }
};
