#!/bin/bash

# Configurar .htaccess para subdirectorio
cat > /var/www/html/.htaccess << 'EOF'
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /wp/
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /wp/index.php [L]
</IfModule>
# END WordPress
EOF

chown www-data:www-data /var/www/html/.htaccess

# Ejecutar el entrypoint original de WordPress
exec docker-entrypoint.sh apache2-foreground
