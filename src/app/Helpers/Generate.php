<?php

if (!function_exists('genDtUniqueID')) {
        function genDtUniqueID()
        {
                // Obtendo a data e hora atual em formato YmdHis (AnoMêsDiaHoraMinutoSegundo)
                $timestamp = date('YmdHis');

                // Adicionar um valor aleatório para garantir a unicidade
                $randomValue = rand(1000, 9999);

                // Retorna o identificador único
                return $timestamp . $randomValue;
        }

}

// ? Função para gerar o caminho da capa
if (!function_exists('genPathCover')) {
        function genPathCover($titulo, $imagem)
        {
                $titulo_normalizado = fPath($titulo);
                $ext_cover = $imagem->getClientOriginalExtension();
                return "covers/{$titulo_normalizado}.{$ext_cover}";
        }
}

if (!function_exists('genPathFile')) {
        function genPathFile($titulo, $arquivo)
        {
                $titulo_normalizado = fPath($titulo);

                if ($arquivo instanceof \Illuminate\Http\UploadedFile) {
                        // Caso seja um arquivo enviado via formulário
                        $ext_file = $arquivo->getClientOriginalExtension();
                } elseif (is_string($arquivo)) {
                        // Caso seja um caminho de arquivo (string)
                        $ext_file = pathinfo($arquivo, PATHINFO_EXTENSION);
                } else {
                        throw new \InvalidArgumentException('O argumento $arquivo deve ser uma string ou uma instância de UploadedFile.');
                }

                return "films/{$titulo_normalizado}/{$titulo_normalizado}_1080p.{$ext_file}";
        }
}