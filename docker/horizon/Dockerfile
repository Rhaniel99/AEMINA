FROM php:8.2-cli

# Instala dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    libpq-dev \
    ffmpeg \
    libva-dev \
    mesa-va-drivers \
    && docker-php-ext-install zip pdo pdo_pgsql pcntl

# Instala o PHP Redis (extensão)
RUN pecl install redis \
    && docker-php-ext-enable redis

# Instala o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Define o diretório de trabalho
WORKDIR /var/www/html

# Copia o código fonte (para produção)
COPY ./src /var/www/html

# Instala as dependências do Laravel (para produção)
RUN composer install --optimize-autoloader --no-dev --ignore-platform-reqs

# Comando para iniciar o Horizon
CMD ["php", "artisan", "horizon"]
