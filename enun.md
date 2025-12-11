# Bases Proyecto Final

Esta actividad se enfoca principalmente en desplegar un stack amplio en un
servidor Linux, mediante el uso de la tecnología *Docker* y *Docker Compose*.
Para ello, debemos trabajar sobre un *sistema operativo anfitrión (host)*
sobre el cual se desplegarán los servicios utilizando Docker.

## Consideraciones

- Este proyecto puede realizarse en grupos de hasta 5 personas.
- La inscripción de grupos se debe realizar ***hasta el día Lunes 18 de Noviembre***.
- Un integrante de cada grupo debe enviar por U-Cursos un mensaje al Auxiliar y al profesor, indicando los integrantes.
- Cada grupo tendrá una cuenta de usuario exclusiva en el servidor.
- Cada grupo tendrá un número identificador único.
- Cada grupo debe definir un nombre de subdominio a utilizar, el cuál será `<grupo>.ifigueroap.cl`. El nombre escogido debe ser validado y aceptado por el profesor.
- **El sistema host a utilizar será el servidor Hornet utilizado anteriormente en la Tarea 3.**
- **Todos los servicios web deben desplegarse utilizando un proxy reverso con nginx**
    - En el servidor estará configurado un ***proxy reverso maestro*** que maneja los puertos 80 y 443 (HTTP y HTTPS, respectivamente) y delega en los puertos específicos para cada grupo.
    - Los puertos específicos para cada grupo serán:
        - 8080 para conexiones HTTP
        - 8443 para conexiones HTTPS
    - En su configuración:
        - Las conexiones HTTP deben ser redirigidas a HTTPS
        - Los servicios deben desplegarse siempre por HTTPS
        - **Cualquier servicio desplegado que sea accesible de otra forma distinta al proxy reverso será evaluado con 0 puntos.**
    - *Indicaciones:*
        - *Se creó una network con Docker llamada ‘proyecto’ que tienen que utilizar para que el master proxy reverso reconozca sus imagenes.*
        - *El proxy reverso que creen tiene que ser un servicio aparte y el nombre de este debe seguir el formato `<grupo>-proxy` para que el master proxy reverso reconozca los puertos que este expone.*

## Requerimientos

Utilizando Docker Compose, y en base a imágenes predefinidas o personalizadas, usted debe desplegar los siguientes servicios:

1. **Certificado HTTPS (0.5 puntos).** Debe configurar su proxy reverso nginx para la generación del certificado TLS asociado a su subdominio (`<grupo>.ifigueroap.cl`) utilizando el utilitario `certbot` de Let's Encrypt.
2. **Base de datos MariaDB (0.5 puntos).** Debe desplegar una base de datos
MariaDB, donde la contraseña del usuario `root` debe ser `cc5308`. Los datos
del motor de base de datos deben almacenarse en un volumen persistente, y el
puerto de conexión debe ser el `3306`. No debe exponer los puertos hacia el
sistema operativo anfitrión (host). La base de datos sólo debe ser accesible desde la red de contenedores asociado a su archivo de Docker Compose.
3. **Plataforma Moodle (2.0 puntos)**. Debe desplegar una plataforma Moodle, que
se conecte a la base de datos anteriormente desplegada. Debe crear un usuario y
base de datos específica para esta instalación. Utilice la versión 4.5. de
Moodle. 
    1. La plataforma debe estar disponible en `https://<grupo>.ifigueroap.cl/moodle/`
    2. Debe crear un usuario para poder ingresar y verificar la instalación correcta de la plataforma. En su entrega indique las credenciales necesarias.
    
    ⚠️ El despliegue de Moodle prácticamente requiere el uso del servidor Apache. Por lo tanto se recomienda utilizar una imagen que use Apache para desplegar la aplicación, y que el proxy reverso de nginx redirija hacia el servidor Apache. Puede usar alguna imagen preconstruida, o desarrollar una propia.
    
4. **Plataforma Wordpress (2.0 puntos).** Debe desplegar una plataforma
Wordpress, que se conecte a la base de datos anteriormente desplegada. Debe
crear un usuario y base de datos específica para esta instalación. Escoja la
versión más reciente de Wordpress al momento de la entrega. Puede utilizar
imágenes oficiales de Wordpress, o construir imágenes propias.
    1. La plataforma debe estar disponible en `https://<grupo>.ifigueroap.cl/wp/`
    2. Debe crear un usuario para poder ingresar y verificar la instalación correcta de la plataforma. En su entrega indique las credenciales necesarias.
5. **Aplicación personalizada (1.5 puntos).** Escoja una aplicación *realista* de
su interés, utilizando cualquier framework o lenguaje de programación, y
agréguela al despliegue en su servidor. Una aplicación *realista* puede ser un proyecto de alguna asignatura anterior, o levantar algún producto open source disponible.
    1. La plataforma debe estar disponible en `https://<grupo>.ifigueroap.cl/app/`
    2. Provea los datos o credenciales de acceso necesarios para verificar el despliegue correcto de esta aplicación.