FROM php:8.1-apache

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    libonig-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Instalar extensiones de PHP requeridas por Moodle
RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install -j$(nproc) gd mysqli pdo pdo_mysql zip intl soap opcache exif mbstring

# Configurar PHP para Moodle
COPY php-moodle.ini /usr/local/etc/php/conf.d/moodle.ini

# Habilitar módulos de Apache
RUN a2enmod rewrite headers expires

# Descargar Moodle 4.5
WORKDIR /var/www/html
RUN git clone --depth 1 --branch MOODLE_405_STABLE https://github.com/moodle/moodle.git moodle && \
    chown -R www-data:www-data /var/www/html/moodle

# Configurar Apache
COPY apache-moodle.conf /etc/apache2/sites-available/000-default.conf

# Crear directorio de datos de Moodle
RUN mkdir -p /var/moodledata && \
    chown -R www-data:www-data /var/moodledata && \
    chmod 0777 /var/moodledata

EXPOSE 80

CMD ["apache2-foreground"]
