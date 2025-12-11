-- Script de inicialización para MariaDB
-- Crea las bases de datos y usuarios para WordPress, Moodle y Hangman

-- Crear base de datos para Moodle
CREATE DATABASE IF NOT EXISTS moodle_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario para Moodle
CREATE USER IF NOT EXISTS 'moodle_user'@'%' IDENTIFIED BY 'moodle_pass';

-- Otorgar privilegios a Moodle
GRANT ALL PRIVILEGES ON moodle_db.* TO 'moodle_user'@'%';

-- Crear base de datos para WordPress
CREATE DATABASE IF NOT EXISTS wp_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario para WordPress
CREATE USER IF NOT EXISTS 'wp_user'@'%' IDENTIFIED BY 'wp_pass';

-- Otorgar privilegios a WordPress
GRANT ALL PRIVILEGES ON wp_db.* TO 'wp_user'@'%';

-- Crear base de datos para Hangman
CREATE DATABASE IF NOT EXISTS hangman_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Crear usuario para Hangman
CREATE USER IF NOT EXISTS 'hangman_user'@'%' IDENTIFIED BY 'hangman_pass';

-- Otorgar privilegios a Hangman
GRANT ALL PRIVILEGES ON hangman_db.* TO 'hangman_user'@'%';

-- Aplicar cambios
FLUSH PRIVILEGES;

-- Mostrar bases de datos creadas
SHOW DATABASES;
