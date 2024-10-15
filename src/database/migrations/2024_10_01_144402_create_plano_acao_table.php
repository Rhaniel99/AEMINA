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
        Schema::create('plano_acao', function (Blueprint $table) {

            $table->uuid('id')->primary(); // ID UUID para a tabela
            
            $table->integer('ano_base'); // Ano base do plano de ação
            
            // Chave estrangeira para o tipo de ação
            
            $table->foreignId('id_tipo_acao')
            
            ->constrained('tipo_acao')
            
            ->onDelete('cascade'); // Deletar em cascata quando o tipo de ação for excluído
            
            // Causa relacionada, correlacionada a outra ação
            
            $table->string('causa_correlacionada')->nullable();
            
            // Relacionamento com a escola
            
            $table->integer('cod_escola');
            
            // $table->foreign('cod_escola')
            
            //   ->references('cod_escola')->on('api_escolas')
            
            //   ->onDelete('cascade');
            
            // Relacionamento com o indicador
            
            $table->integer('indicador_id');
            
            $table->foreign('indicador_id')
            
            ->references('id')->on('indicadores')
            
            ->onDelete('cascade');
            
            // Causa e tarefa do plano de ação
            
            $table->text('causa')->nullable();
            
            $table->text('acao')->nullable();
            
            $table->text('tarefa')->nullable();
            
            // Responsável pela execução do plano
            
            $table->foreignUuid('responsavel_id')->nullable()->constrained('users')->onDelete('cascade');
            
            // Datas previstas e reais para o plano
            
            $table->timestamp('inicio_prev')->nullable();
            
            $table->timestamp('fim_prev')->nullable();
            
            $table->timestamp('inicio_real')->nullable();
            
            $table->timestamp('fim_real')->nullable();

            $table->text('fim_real_relato')->nullable();

            $table->enum('status',['Concluido', 'Cancelado'])->nullable();
            
            // Pontos problemáticos e ações futuras
            
            $table->text('cancelamento_relato')->nullable();

            $table->text('ponto_problematico')->nullable();
            
            $table->text('acao_futura_1')->nullable();
            
            $table->text('acao_futura_2')->nullable();
            
            // Responsável pelo problema, reprogramações e timestamps
            
            $table->foreignUuid('problema_responsavel_id')
            
            ->constrained('users')
            
            ->onDelete('cascade');
            
            $table->timestamp('reprogramacao1')->nullable();
            
            $table->timestamp('reprogramacao2')->nullable();
            
            // Timestamps de criação e atualização
            
            $table->timestamps();
            
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plano_acao');
    }
};
