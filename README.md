# API de Asistencia

## Descripción

Este proyecto es una API RESTful desarrollada utilizando **Node.js** y **Express**, diseñada específicamente para gestionar la asistencia de estudiantes de manera eficiente y escalable.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor, que permite construir aplicaciones rápidas y escalables.
- **Express**: Framework web minimalista y flexible para Node.js, que facilita la creación de aplicaciones web y APIs.
- **TypeORM**: Un ORM que simplifica el trabajo con bases de datos, permitiendo realizar operaciones de manera intuitiva y eficiente.
- **PostgreSQL**: Un sistema de gestión de bases de datos relacional robusto y escalable, ideal para aplicaciones que requieren integridad y rendimiento.
- **Docker**: Plataforma que permite la creación, despliegue y gestión de contenedores de manera eficiente, asegurando la consistencia en diferentes entornos.
- **GitLab CI/CD**: Sistema de automatización que optimiza el flujo de trabajo en la creación y despliegue de contenedores, mejorando la productividad del equipo.
- **Swagger**: Herramienta que facilita la documentación y prueba de la API, permitiendo a los desarrolladores y usuarios interactuar con la API de manera sencilla.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Augusto0414/API_ASISTENCIA.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd API_ASISTENCIA
   ```

3. Crea un archivo `.env` con las variables de entorno necesarias, ejemplo:

   ```bash
   PORT=3000
   DB_USER=postgres
   DB_HOST=db
   DB_DATABASE=api_asistencia
   DB_PASSWORD=password
   DB_PORT=5432
   ```

4. Construye la imagen de Docker:

   ```bash
   docker build -t prueba .
   ```

5. Inicia los contenedores:

   ```bash
   docker compose up -d
   ```

6. Accede a la API en [http://localhost:3000/api/v1/docs](http://localhost:3000/api/v1/docs).

## Documentación

La documentación de la API está disponible en [Documentación de la API](https://api-asistencia-j85v.onrender.com/api/v1/docs/#/Asistencia/get_asistencia).
