FROM php:8.2-cli

WORKDIR /var/www/html

# Instala extensões necessárias (pcntl para o Reverb)
RUN docker-php-ext-configure pcntl --enable-pcntl \
  && docker-php-ext-install pcntl

# Instala o PHP Redis (extensão)
RUN pecl install redis \
    && docker-php-ext-enable redis

# Instala o Composer (caso ainda não tenha no ambiente)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copia o código fonte (assumindo que o código fonte está no diretório ./src)
COPY ./src /var/www/html

# Copia o arquivo .env da raiz para o container
COPY .env /var/www/html/.env

# Instalar a extensão zip e os comandos unzip e git no container
RUN apt-get update && apt-get install -y \
    unzip \
    zip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Instala dependências do Laravel, ignorando pacotes que não são necessários para o Reverb
RUN composer install --optimize-autoloader --no-dev --ignore-platform-reqs

EXPOSE 8080

CMD ["php", "artisan", "reverb:start", "--host=0.0.0.0"]
