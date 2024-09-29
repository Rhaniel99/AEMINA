<?php

return [
    'required' => 'O campo :attribute é obrigatório.',
    'email' => 'Informe um endereço de e-mail válido para o campo :attribute.',
    'unique' => 'O campo :attribute já está em uso.',
    'same' => 'O campo :attribute e :other tem de ser o mesmo.',
    'max' => [
        'string' => 'O campo :attribute não deve exceder :max caracteres.',
    ],
    'min' => [
        'string' => 'O campo :attribute deverá ter no mínimo :min caracteres.',
        'numeric' => 'O campo :attribute deverá ter no mínimo :min.', // Para campos numéricos
    ],
    'confirmed' => 'O campo :attribute não confere com a confirmação.', // Mensagem personalizada para confirmed
    'validation_message' => 'E mais :count erro(s).', // Mensagem para exibir a contagem de erros restantes
];