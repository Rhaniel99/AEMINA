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
