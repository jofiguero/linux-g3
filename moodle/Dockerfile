FROM php:8.1-apache

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libonig-dev \
    git \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Configurar extensiones de PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    gd \
    mysqli \
    pdo \
    pdo_mysql \
    zip \
    intl \
    soap \
    opcache \
    exif \
    mbstring

# Configurar PHP para Moodle
RUN { \
    echo "max_input_vars = 5000"; \
    echo "upload_max_filesize = 100M"; \
    echo "post_max_size = 100M"; \
    echo "memory_limit = 256M"; \
    } > /usr/local/etc/php/conf.d/moodle.ini

# Habilitar módulos de Apache
RUN a2enmod rewrite headers expires

# Descargar Moodle 4.5 (branch MOODLE_405_STABLE corresponde a 4.5.x)
WORKDIR /var/www/html
RUN git clone --depth 1 --branch MOODLE_405_STABLE https://github.com/moodle/moodle.git moodle \
    && chown -R www-data:www-data /var/www/html/moodle

# Configurar Apache para servir Moodle desde /moodle
RUN echo '<VirtualHost *:80>\n\
    ServerAdmin webmaster@localhost\n\
    DocumentRoot /var/www/html\n\
    \n\
    <Directory /var/www/html>\n\
        Options Indexes FollowSymLinks\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
    \n\
    Alias /moodle /var/www/html/moodle\n\
    <Directory /var/www/html/moodle>\n\
        Options Indexes FollowSymLinks MultiViews\n\
        AllowOverride All\n\
        Require all granted\n\
    </Directory>\n\
    \n\
    ErrorLog ${APACHE_LOG_DIR}/error.log\n\
    CustomLog ${APACHE_LOG_DIR}/access.log combined\n\
</VirtualHost>' > /etc/apache2/sites-available/000-default.conf

# Crear directorio de datos de Moodle
RUN mkdir -p /var/moodledata \
    && chown -R www-data:www-data /var/moodledata \
    && chmod 0777 /var/moodledata

EXPOSE 80

CMD ["apache2-foreground"]
