<?php

namespace App\Http\Controllers;

use App\Imports\PlanoDeAcaoImport;
use App\Jobs\ImportPlanoAcao;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use Box\Spout\Reader\Common\Creator\ReaderEntityFactory;
use Box\Spout\Common\Exception\SpoutException;

class PlanoAcaoController extends Controller
{

    public function uploadCSV(Request $request)
    {
        set_time_limit(0);

        $request->validate([
            "planoAcao" => "required|mimes:xls,xlsx,csv",
        ], [
            'planoAcao.required' => 'O envio do arquivo plano de ação é obrigatório.',
            'planoAcao.mimes' => 'O arquivo plano de ação deve ser um dos seguintes formatos: xls, xlsx, csv.',
        ]);
    
        $arquivo_plano_acao = $request->file('planoAcao')->store('temp');

        // DB::beginTransaction(); // Inicia a transação
        try {
            
            Excel::import(new PlanoDeAcaoImport(), $arquivo_plano_acao);
            
            // DB::commit(); // Confirma a transação se tudo correr bem
        } catch (\Exception $e) {
            // DB::rollBack(); // Desfaz as alterações se houver um erro
            \Log::error('Erro ao importar o arquivo: ' . $e->getMessage());
        }
    }


    
    // public function uploadCSV(Request $request)
    // {
    //     $request->validate([
    //         "planoAcao" => "required|mimes:xls,xlsx,csv",
    //     ], [
    //         'planoAcao.required' => 'O envio do arquivo plano de ação é obrigatório.',
    //         'planoAcao.mimes' => 'O arquivo plano de ação deve ser um dos seguintes formatos: xls, xlsx, csv.',
    //     ]);
    
    //     $arquivo_plano_acao = $request->file('planoAcao');
    //     $tempDir = sys_get_temp_dir();
    //     $tempFile = tempnam($tempDir, 'plano_');
    
    //     // Salva o conteúdo do arquivo enviado no arquivo temporário
    //     file_put_contents($tempFile, file_get_contents($arquivo_plano_acao->getRealPath()));
    
    //     \Log::info('Arquivo enviado: ' . $arquivo_plano_acao->getClientOriginalName());
    
    //     try {
    //         // Criar o leitor a partir do arquivo temporário
    //         $reader = ReaderEntityFactory::createReaderFromFile($tempFile);
    //         $reader->open($tempFile); // Abra o arquivo para leitura
    
    //         $rowCount = 0; // Inicializa o contador de linhas
    
    //         foreach ($reader->getSheetIterator() as $sheet) {
    //             foreach ($sheet->getRowIterator() as $row) {
    //                 $rowCount++; // Incrementa o contador para cada linha
    //             }
    //         }
    
    //         $reader->close(); // Fechar o leitor após a leitura
    //         \Log::warning($rowCount);
    //     } catch (SpoutException $e) {
    //         \Log::error('Erro ao ler o arquivo: ' . $e->getMessage());
    //     }
    
    //     unlink($tempFile); // Limpeza do arquivo temporário
    // }
    

            // \Log::info('Arquivo enviado: ' . $arquivo_plano_acao->getClientOriginalName());
        // // Criar o leitor a partir do arquivo
        // $reader = ReaderEntityFactory::createReaderFromFile(storage_path("app/{$path}")); // Certifique-se de usar o caminho correto
        
        // try {
        //     $reader->open(storage_path("app/{$path}")); // Abra o arquivo para leitura
    
        //     $rowCount = 0; // Inicializa o contador de linhas
    
        //     foreach ($reader->getSheetIterator() as $sheet) {
        //         foreach ($sheet->getRowIterator() as $row) {
        //             $rowCount++; // Incrementa o contador para cada linha
        //         }
        //     }
    
        //     $reader->close(); // Fechar o leitor após a leitura
    
        //     \Log::warning($rowCount);
        // } catch (SpoutException $e) {
        //     \Log::error('Erro ao ler o arquivo: ' . $e->getMessage());
        // }

        // Salvar o arquivo temporariamente para processamento
        // $path = $arquivo_plano_acao->store('temp'); // O arquivo será armazenado no diretório 'storage/app/temp'

        // $reader = ReaderEntityFactory::createReaderFromFile($path);


        // Despachar o job com o caminho do arquivo
        // ImportPlanoAcao::dispatch($path);

        // ini_set('memory_limit', '256M');
        // $data = Excel::import(new PlanoDeAcaoImport(), $arquivo_plano_acao);
        // $rows = $data[0]; // Assumindo que o arquivo contém apenas uma planilha
        // dd($rows);

        // Excel::import(new CargasHorariasImport($cargas_horarias_vigencias->id), $carga_horaria_file);
        // $rows = $data[0];
        // dd($request->all());

        //
}