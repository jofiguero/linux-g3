-- Script de inicialización para MariaDB
-- Crea las bases de datos y usuarios para WordPress

-- Crear base de datos para WordPress
CREATE DATABASE IF NOT EXISTS wp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario para WordPress
CREATE USER IF NOT EXISTS 'wp_user'@'%' IDENTIFIED BY 'wp_pass';

-- Otorgar privilegios
GRANT ALL PRIVILEGES ON wp_db.* TO 'wp_user'@'%';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- Mostrar bases de datos creadas
SHOW DATABASES;
