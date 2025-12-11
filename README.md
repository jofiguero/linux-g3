# Proyecto Linux - Grupo 3

Sistema con Moodle y WordPress utilizando Docker Compose, Nginx como proxy inverso y MariaDB como base de datos.

## Integrantes
- Benjamín Ureta
- Joaquín Figueroa
- Joaquín Harcha
- José Villalobos
- Víctor Alfaro

## Estructura del Proyecto

```
linux-g3/
├── docker-compose.yml          # Configuración de servicios Docker
├── proxy/
│   └── nginx.conf              # Configuración del proxy inverso
├── static/
│   ├── index.html              # Página de inicio
│   └── style.css               # Estilos de la página
├── moodle/
│   ├── Dockerfile              # Imagen Docker para Moodle
│   ├── php-moodle.ini          # Configuración de PHP
│   └── apache-moodle.conf      # Configuración de Apache
├── wordpress/
│   ├── Dockerfile              # Imagen Docker para WordPress
│   └── wp-entrypoint.sh        # Script de inicialización
├── mariadb/
│   └── init/
│       └── 01-init.sql         # Script de inicialización de BD
└── certbot/                    # Certificados SSL (producción)
    ├── conf/
    └── www/
```

## Servicios Desplegados

1. **Proxy (Nginx)**: Puerto 8080 (HTTP), 8443 (HTTPS)
2. **MariaDB**: Base de datos compartida (puerto interno 3306)
3. **Moodle 4.5**: Plataforma educativa en `/moodle/`
4. **WordPress**: CMS en `/wp/`

## Credenciales

### MariaDB
- Root password: `cc5308`
- Moodle DB: `moodle_db` (usuario: `moodle_user`, pass: `moodle_pass`)
- WordPress DB: `wp_db` (usuario: `wp_user`, pass: `wp_pass`)

### Moodle
- URL: http://localhost:8080/moodle/
- Configurar en el primer acceso

### WordPress
- URL: http://localhost:8080/wp/
- Configurar en el primer acceso

## Cómo Ejecutar

### Iniciar los servicios
```bash
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f
```

### Verificar estado
```bash
docker-compose ps
```

### Detener servicios
```bash
docker-compose down
```

### Reconstruir imágenes
```bash
docker-compose build
docker-compose up -d
```

### Limpieza completa (elimina volúmenes)
```bash
docker-compose down -v
```

## Acceso

- **Página Principal**: http://localhost:8080/
- **Moodle**: http://localhost:8080/moodle/
- **WordPress**: http://localhost:8080/wp/

## Notas

- La primera vez que se ejecuta Moodle puede tardar varios minutos en inicializar
- WordPress requiere configuración inicial en el navegador
- Los datos se persisten en volúmenes Docker
- Para producción, configurar SSL con certbot
