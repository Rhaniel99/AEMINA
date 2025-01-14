<?php

// ? Função para formatar um CPF, removendo caracteres não numéricos e retornando formatado com pontos e traço
if (!function_exists('formatCPF')) {
    function formatCPF($cpf)
    {
        // Limpar o CPF removendo caracteres não numéricos
        $cpf = preg_replace('/[^0-9]/', '', $cpf);

        // Formatar o CPF com pontos e traço
        return substr($cpf, 0, 3) . '.' . substr($cpf, 3, 3) . '.' . substr($cpf, 6, 3) . '-' . substr($cpf, 9, 2);
    }
}

if (!function_exists('onSuccess')) {
    function onSuccess($message) {
        return $message . '|' . genDtUniqueID();
    }
}

// ? Função para formatar uma data para o padrão brasileiro (dd/mm/yyyy)
if (!function_exists('fDateBR')) {
    function fDateBR($date)
    {
        // Verifica se a data está em um formato válido
        if (!$date) {
            return null;
        }

        try {
            // Converte a data usando o Carbon
            return \Carbon\Carbon::parse($date)->format('d/m/Y');
        } catch (\Exception $e) {
            // Retorna a data original em caso de erro
            return $date;
        }
    }
}

if (!function_exists('fPath')) {
    function fPath($string)
    {
        // Transformar em minúsculas
        $string = strtolower($string);

        // Remover acentos
        $string = iconv('UTF-8', 'ASCII//TRANSLIT', $string);

        // Substituir espaços por underscores
        $string = str_replace(' ', '_', $string);

        // Remover quaisquer caracteres que não sejam letras, números ou underscores
        $string = preg_replace('/[^a-z0-9_]/', '', $string);

        return $string;
    }
}

if(!function_exists('fnStrings')){
    function fnStrings($string){
        $string = strtolower($string);
        $transliterator = \Transliterator::createFromRules(':: Any-Latin; :: Latin-ASCII; :: NFD; :: [:Nonspacing Mark:] Remove; :: NFC;', \Transliterator::FORWARD);
        return $transliterator->transliterate($string);
    }
}
