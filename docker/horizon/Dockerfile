# Usando a imagem PHP 8.2 FPM com Alpine
FROM php:8.2-fpm-alpine

# Argumentos de ambiente
ARG UID
ARG GID
ARG USER

ENV UID=${UID}
ENV GID=${GID}
ENV USER=${USER}

# Remover o grupo dialout que pode causar conflitos com o MacOS
RUN delgroup dialout

# Criar o grupo e o usuário com as variáveis passadas
RUN addgroup -g ${GID} --system ${USER} \
    && adduser -G ${USER} --system -D -s /bin/sh -u ${UID} ${USER}

# Modificar o arquivo de configuração do PHP-FPM para usar o novo usuário
RUN sed -i "s/user = www-data/user = '${USER}'/g" /usr/local/etc/php-fpm.d/www.conf \
    && sed -i "s/group = www-data/group = '${USER}'/g" /usr/local/etc/php-fpm.d/www.conf \
    && echo "php_admin_flag[log_errors] = on" >> /usr/local/etc/php-fpm.d/www.conf

# Instalar dependências do sistema e extensões PHP necessárias
RUN apk add --no-cache \
    libzip-dev \
    icu-dev \
    wget \
    && apk add --no-cache --virtual .build-deps gcc make autoconf libc-dev \
    && docker-php-ext-install bcmath zip pcntl intl \
    && apk del .build-deps \
    && rm -rf /var/cache/apk/*

# Instalar a extensão Redis para PHP
RUN apk add --no-cache --virtual .build-deps gcc make autoconf libc-dev \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del .build-deps

# Criar diretórios e garantir permissões adequadas para os diretórios de armazenamento e cache
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache \
    && chown -R ${UID}:${GID} /var/www/html \
    && chown -R ${UID}:${GID} /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Definir o comando padrão para o PHP-FPM
CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf"]
