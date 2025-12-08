FROM wordpress:latest

# Crear script para configurar WordPress para subdirectorio
RUN echo '#!/bin/bash\n\
# Configurar .htaccess para subdirectorio\n\
cat > /var/www/html/.htaccess << "EOF"\n\
# BEGIN WordPress\n\
<IfModule mod_rewrite.c>\n\
RewriteEngine On\n\
RewriteBase /wp/\n\
RewriteRule ^index\.php$ - [L]\n\
RewriteCond %{REQUEST_FILENAME} !-f\n\
RewriteCond %{REQUEST_FILENAME} !-d\n\
RewriteRule . /wp/index.php [L]\n\
</IfModule>\n\
# END WordPress\n\
EOF\n\
chown www-data:www-data /var/www/html/.htaccess\n\
\n\
# Ejecutar el entrypoint original de WordPress\n\
exec docker-entrypoint.sh apache2-foreground' > /usr/local/bin/wp-custom-entrypoint.sh \
    && chmod +x /usr/local/bin/wp-custom-entrypoint.sh

CMD ["/usr/local/bin/wp-custom-entrypoint.sh"]
