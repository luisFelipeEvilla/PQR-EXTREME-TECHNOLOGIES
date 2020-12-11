# Descripción
Aplicación que permite almacenar, crear y editar PQRs.

## Instalación
Visita el repositorio en [GitHub](https://github.com/luisFelipeEvilla/PQR-EXTREME-TECHNOLOGIES) y descarga el código.

### Creación de base de datos
En la carpeta database, existe un archivo llamado db.pg, el cual contiene todos los
scripts necesarios para configurar la base de datos. Inicia sesión en postgres y ejecuta
los comandos que están en el archivo

### Instalación de librerias y dependencias
Através de la terminal, o linea de comandos dirigirse a la raíz del proyecto y ejecutar npm install.

```console
foo@bar:~$ npm install
```
Se instalaran todas las librerias y dependencias.

## Ejecución
Dirigirse a la carpeta raíz, y correr el comand npm start.

```console
foo@bar:~$ npm start
```

Si se encuentra en desarrollo, en vez de producción, debe ejecutar el siguiente comando:

```console
foo@bar:~$ npm run start:dev
```

## Variables de entorno
Debe crear un archivo .env, en el directorio raiz del proyecto, y declarar las variables de la siguiente manera:

 VARIABLE1=ALGUNVALOR

1. PORT: Puerto en el que el servidor estara recibiendo peticiones http, por defecto es el 3000
1. DB_USER: Usuario  de la base de datos
1. DB_HOST: Dirección del host que almacena la base de datos
1. DB_NAME: Nombre de la base de datos,
1. DB_PASSWORD: Contraseña del usuario de la base de datos,
1. DB_PORT: Puerto para conectarse a la base de datos
1. SECRET: llave secreta para almacenar las sesiones

## Tecnologias

### Backend
* Node 
* Express
* Morgan
* Chalk
* postgresql
* pg
* passport
* flash-connect
* cors
* express-sessions

### Frontend
* Handlebars
* html2pdf
* timeago

