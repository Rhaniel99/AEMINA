FROM php:8.2-fpm-alpine

# environment arguments
ARG UID
ARG GID
ARG USER

ENV UID=${UID}
ENV GID=${GID}
ENV USER=${USER}

# Dialout group in alpine linux conflicts with MacOS staff group's gid, whis is 20. So we remove it.
RUN delgroup dialout

# Creating user and group
RUN addgroup -g ${GID} --system ${USER} \
    && adduser -G ${USER} --system -D -s /bin/sh -u ${UID} ${USER}

# Modify php fpm configuration to use the new user's privileges.
RUN sed -i "s/user = www-data/user = '${USER}'/g" /usr/local/etc/php-fpm.d/www.conf \
    && sed -i "s/group = www-data/group = '${USER}'/g" /usr/local/etc/php-fpm.d/www.conf \
    && echo "php_admin_flag[log_errors] = on" >> /usr/local/etc/php-fpm.d/www.conf

# Install necessary PHP extensions and system dependencies in one step
RUN apk add --no-cache wget \
    && mkdir -p /usr/src/php/ext/redis \
    && wget -O /tmp/phpredis.tar.gz https://github.com/phpredis/phpredis/archive/5.3.4.tar.gz \
    && tar xvz -C /usr/src/php/ext/redis --strip 1 -f /tmp/phpredis.tar.gz \
    && echo 'redis' >> /usr/src/php-available-exts \
    && docker-php-ext-install redis \
    && apk add --no-cache postgresql-dev libzip-dev icu-dev \
    && docker-php-ext-install pdo pdo_pgsql bcmath zip pcntl intl \
    && docker-php-ext-configure zip \
    && rm -rf /var/cache/apk/* /tmp/phpredis.tar.gz

# Set permissions for Laravel storage and cache directories
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache \
    && chown -R ${UID}:${GID} /var/www/html \
    && chown -R ${UID}:${GID} /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]