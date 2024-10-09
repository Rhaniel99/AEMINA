<?php

namespace App\Helpers;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;


class Normalize
{
    // Função para normalizar a letra
    public static function nLower($string)
    {
        return Str::lower($string);
    }

    // Função para remover acentos
    public static function nAccent($text)
    {
        $transliterator = \Transliterator::createFromRules(':: Any-Latin; :: Latin-ASCII; :: NFD; :: [:Nonspacing Mark:] Remove; :: NFC;', \Transliterator::FORWARD);
        return $transliterator->transliterate($text);
    }


    /**
     * ? Função para normalizar datas
     * ! Caso a data seja um inteiro, considera que é um timestamp do Excel
     * ! Caso seja uma string, considera que é uma data no formato d/m/Y
     */
    public static function nDate($dateString)
    {
        // Verifica se o valor é nulo ou vazio
        if (empty($dateString)) {
            return null;
        }
    
        if (is_numeric($dateString)) {
            // Lógica para data numérica (se for necessário, dependendo do formato)
            $dateValue = Carbon::createFromFormat('Y-m-d', gmdate('Y-m-d', ($dateString - 25569) * 86400))->toDateString();
        } else {
            // Lógica para data no formato d/m/Y
            try {
                $dateValue = Carbon::createFromFormat('d/m/Y', $dateString)->toDateString();
            } catch (\Exception $e) {
                \Log::error('Erro ao processar data: '  . $dateString);
                throw new \Exception('Erro ao processar data: ' . $e->getMessage());
            }
        }
    
        return $dateValue;
    }
    
}