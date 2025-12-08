# Proyecto Linux - GrupoX

## Estructura del Proyecto

```
linux-g3/
├── docker-compose.yml
├── proxy/
│   └── nginx.conf
├── mariadb/
│   └── init/
│       └── 01-init.sql
└── README.md
```

## Servicios Desplegados

1. **MariaDB**: Base de datos (puerto interno 3306)
2. **Moodle 4.5**: Plataforma educativa en `/moodle/`
3. **WordPress**: CMS en `/wp/`
4. **Nginx Proxy Reverso**: Maneja el enrutamiento (puertos 8080/8443)

## Credenciales

### Moodle
- URL: http://localhost:8080/moodle/
- Usuario: `admin`
- Contraseña: `Admin123!`
- Email: admin@ejemplo.cl

### WordPress
- URL: http://localhost:8080/wp/
- (Se configurará en el primer acceso)

### MariaDB
- Root password: `cc5308`
- Moodle DB: `moodle_db` (usuario: `moodle_user`, pass: `moodle_pass`)
- WordPress DB: `wp_db` (usuario: `wp_user`, pass: `wp_pass`)

## Cómo Ejecutar

1. Iniciar los servicios:
```bash
docker-compose up -d
```

2. Ver logs:
```bash
docker-compose logs -f
```

3. Verificar estado:
```bash
docker-compose ps
```

4. Detener servicios:
```bash
docker-compose down
```

5. Detener y eliminar volúmenes (limpieza completa):
```bash
docker-compose down -v
```

## Acceso

- Página principal: http://localhost:8080/
- Moodle: http://localhost:8080/moodle/
- WordPress: http://localhost:8080/wp/

## Notas

- La primera vez que se ejecuta Moodle puede tardar varios minutos en inicializar.
- WordPress requiere configuración inicial en el navegador.
- Los datos se persisten en volúmenes Docker.
