# Descripción
Aplicación que permite almacenar, crear y editar PQRs.

## Instalación
Visita el repositorio en [GitHub](https://github.com/luisFelipeEvilla/PQR-EXTREME-TECHNOLOGIES) y descarga el código.

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

## Tecnologias

### Backend
* Node 
* Express
* Morgan
* Chalk


### Frontend
* Handlebars

