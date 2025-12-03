# 🐾 PetsOnline - Plataforma de Gestión Veterinaria

Sistema integral Fullstack para la gestión de mascotas, productos y servicios veterinarios. Este proyecto implementa una arquitectura segura y escalable utilizando **Spring Boot** y **React**.

---

## 🚀 Tecnologías Utilizadas

### 🔧 Backend (API REST)
* **Java & Spring Boot:** Framework principal para la lógica de negocio.
* **Spring Security & JWT:** Autenticación robusta y gestión de roles (Admin/User).
* **H2 Database:** Base de datos en memoria para persistencia rápida durante el desarrollo.
* **JPA / Hibernate:** Mapeo Objeto-Relacional (ORM).
* **Swagger/OpenAPI:** Documentación interactiva y prueba de endpoints.

### 💻 Frontend (SPA)
* **React JS:** Biblioteca para construir la interfaz de usuario interactiva.
* **Context API:** Gestión de estado global (Sesión de Usuario y Carrito de Compras).
* **Bootstrap 5:** Diseño responsivo, moderno y adaptable a móviles.
* **Axios:** Cliente HTTP para consumir la API REST con interceptores de seguridad.

---

## 🛠️ Instalación y Ejecución

Sigue estos pasos para levantar el proyecto en tu entorno local.

### 1. Backend (Servidor)
Abre una terminal en la carpeta `/backend` y ejecuta:

# Ejecutar el servidor (Windows)
./mvnw.cmd spring-boot:run
El servidor iniciará en: http://localhost:8080

Documentación API (Swagger): http://localhost:8080/swagger-ui/index.html (Úsalo para crear datos iniciales).

2. Frontend (Cliente)
Abre una nueva terminal en la carpeta /frontend-petsonline y ejecuta:

# Instalar dependencias (solo la primera vez)
npm install

# Iniciar la aplicación
npm start
La aplicación se abrirá automáticamente en: http://localhost:3000

🔐 Credenciales de Prueba
Para probar todas las funcionalidades (incluyendo el CRUD completo y la gestión de productos), utiliza el usuario Administrador.

Nota: Si la base de datos H2 se ha reiniciado, debes crear este usuario primero usando el endpoint /auth/register en Swagger.

Usuario (Admin): admin@petsonline.cl
Contraseña: 123
Rol: ROLE_ADMIN
