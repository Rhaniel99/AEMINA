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