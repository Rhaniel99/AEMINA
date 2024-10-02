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
RUN addgroup -g ${GID} --system ${USER}
RUN adduser -G ${USER} --system -D -s /bin/sh -u ${UID} ${USER}

# Modify php fpm configuration to use the new user's priviledges.
RUN sed -i "s/user = www-data/user = '${USER}'/g" /usr/local/etc/php-fpm.d/www.conf
RUN sed -i "s/group = www-data/group = '${USER}'/g" /usr/local/etc/php-fpm.d/www.conf
RUN echo "php_admin_flag[log_errors] = on" >> /usr/local/etc/php-fpm.d/www.conf

# Installing php extensions
RUN apk update && apk upgrade

RUN apk add --no-cache postgresql-dev 

RUN docker-php-ext-install pdo pdo_pgsql bcmath

# Installing redis extension
RUN mkdir -p /usr/src/php/ext/redis \
    && curl -fsSL https://github.com/phpredis/phpredis/archive/5.3.4.tar.gz | tar xvz -C /usr/src/php/ext/redis --strip 1 \
    && echo 'redis' >> /usr/src/php-available-exts \
    && docker-php-ext-install redis

# Installing zip extension
RUN apk add --no-cache libzip-dev \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip  \
    && docker-php-ext-install pcntl

# Installing pcntl extension
# RUN apk add --no-cache php82-pcntl

# Establecer permisos
RUN mkdir -p /var/www/html/storage /var/www/html/bootstrap/cache
RUN chown -R ${UID}:${GID} /var/www/html
RUN chown -R ${UID}:${GID} /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

CMD ["php-fpm", "-y", "/usr/local/etc/php-fpm.conf", "-R"]