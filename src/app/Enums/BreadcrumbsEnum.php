<?php

namespace App\Enums;

enum BreadcrumbsEnum: string
{
    case AEMINA_LIST_MEDIA = 'aemina.repository';
    // case AEMINA_INDEX = 'aemina.index';
    // case AEMINA_SHOW = 'aemina.show';
    // case DASHBOARD = 'dashboard';
    // case USER_PROFILE = 'user.profile';

    public static function getLabel(string $routeName, array $parameters = []): ?array
    {
        return match ($routeName) {
            self::AEMINA_LIST_MEDIA->value => [
                'label' => 'Repositório',
                'url' => route(self::AEMINA_LIST_MEDIA->value),
            ],
            // self::DASHBOARD->value => [
            //     'label' => 'Painel de Controle',
            //     'url' => route(self::DASHBOARD->value),
            // ],
            // self::USER_PROFILE->value => [
            //     'label' => 'Perfil do Usuário',
            //     'url' => route(self::USER_PROFILE->value, $parameters),
            // ],
            // self::AEMINA_INDEX->value => [
            //     'label' => ucfirst($parameters['content'] ?? 'Início'),
            //     'url' => route(self::AEMINA_INDEX->value, $parameters),
            // ],
            // self::AEMINA_SHOW->value => [
            //     'label' => ucfirst($parameters['movie'] ?? 'Detalhes'),
            //     'url' => route(self::AEMINA_SHOW->value, $parameters),
            // ],
            default => null,
        };
    }
}
