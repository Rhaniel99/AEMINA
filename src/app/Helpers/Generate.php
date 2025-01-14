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
                $ext_file = $arquivo->getClientOriginalExtension();
                return "films/{$titulo_normalizado}/{$titulo_normalizado}_1080p.{$ext_file}";
        }
}