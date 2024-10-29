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
            $table->text('content')->nullable(); // Conteúdo da nota (Markdown)
            $table->timestamps(); // Criado em / Atualizado em

            // Definindo a relação com a tabela de usuários
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Define o índice único composto para garantir unicidade do título por usuário
            $table->unique(['user_id', 'title'], 'user_title_unique');
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
