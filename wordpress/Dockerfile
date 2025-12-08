FROM wordpress:latest

# Copiar script de configuración
COPY wp-entrypoint.sh /usr/local/bin/wp-entrypoint.sh
RUN chmod +x /usr/local/bin/wp-entrypoint.sh

CMD ["/usr/local/bin/wp-entrypoint.sh"]
