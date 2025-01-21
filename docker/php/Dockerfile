FROM php:8.2-fpm

# Argumentos de ambiente
ARG UID
ARG GID
ARG USER

ENV UID=${UID}
ENV GID=${GID}
ENV USER=${USER}

# Remover o grupo dialout
RUN delgroup dialout

# Adicionar o grupo e o usuário
RUN addgroup --gid ${GID} ${USER} \
    && adduser --uid ${UID} --gid ${GID} --disabled-password --gecos "" ${USER}

# Modificar a configuração do PHP-FPM para usar o novo usuário
RUN sed -i "s/user = www-data/user = '${USER}'/g" /usr/local/etc/php-fpm.d/www.conf \
    && sed -i "s/group = www-data/group = '${USER}'/g" /usr/local/etc/php-fpm.d/www.conf \
    && echo "php_admin_flag[log_errors] = on" >> /usr/local/etc/php-fpm.d/www.conf

# Instalar dependências, incluindo vainfo
RUN apt-get update && apt-get install -y \
    libva-dev \
    mesa-va-drivers \
    ffmpeg \
    wget \
    postgresql-server-dev-all \
    libzip-dev \
    libicu-dev \
    x264 \
    x265 \
    vainfo \
    && rm -rf /var/lib/apt/lists/*

# Instalar o Redis e outras extensões PHP necessárias
RUN mkdir -p /usr/src/php/ext/redis \
    && wget -O /tmp/phpredis.tar.gz https://github.com/phpredis/phpredis/archive/5.3.4.tar.gz \
    && tar xvz -C /usr/src/php/ext/redis --strip 1 -f /tmp/phpredis.tar.gz \
    && echo 'redis' >> /usr/src/php-available-exts \
    && docker-php-ext-install redis \
    && docker-php-ext-install pdo pdo_pgsql bcmath zip pcntl intl

# Configuração de diretórios e permissões
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache \
    && chown -R ${UID}:${GID} /var/www/html \
    && chown -R ${UID}:${GID} /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Rodar PHP-FPM
CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]
