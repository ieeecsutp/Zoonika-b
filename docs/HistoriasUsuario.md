# Historias de Usuario - Zoonika

Este documento recoge las historias de usuario que han guiado el desarrollo de las funcionalidades clave del backend de la aplicación Zoonika.

## Roles de Usuario

*   **Visitante:** Cualquier persona que accede a la aplicación sin haberse registrado o iniciado sesión.
*   **Usuario Registrado:** Un usuario que ha creado una cuenta y ha iniciado sesión en la aplicación.
*   **Especialista:** Un profesional cuyos trabajos se muestran en las galerías.

---

## Épica: Gestión de Cuentas de Usuario

### HU-01: Registro de nuevo usuario

**Como** un visitante,
**quiero** poder registrarme en la aplicación con mi nombre, email y contraseña,
**para poder** acceder a funcionalidades exclusivas como comentar en las galerías.

*   **Criterios de Aceptación:**
    *   El sistema debe solicitar nombre, email y una contraseña.
    *   La contraseña debe almacenarse de forma segura (hasheada).
    *   No se puede registrar un email que ya existe en el sistema.
    *   Al registrarse con éxito, el usuario es creado en la base de datos.

### HU-02: Inicio de sesión

**Como** un usuario registrado,
**quiero** poder iniciar sesión con mi email y contraseña,
**para poder** acceder a mi perfil y a las funciones personalizadas de la aplicación.

*   **Criterios de Aceptación:**
    *   El sistema debe validar el email y la contraseña.
    *   Si las credenciales son correctas, el sistema debe devolver un token de autenticación (JWT).
    *   Si las credenciales son incorrectas, se debe mostrar un mensaje de error claro.

### HU-03: Actualización de perfil

**Como** un usuario registrado,
**quiero** poder actualizar la información de mi perfil (nombre y email),
**para poder** mantener mis datos personales al día.

*   **Criterios de Aceptación:**
    *   El usuario debe estar autenticado para poder actualizar su perfil.
    *   Un usuario solo puede modificar su propia información.

---

## Épica: Exploración de Contenido

### HU-04: Ver lista de galerías

**Como** un visitante,
**quiero** poder ver una lista de todas las galerías de trabajos disponibles,
**para poder** explorar el contenido que ofrece la aplicación y descubrir especialistas.

*   **Criterios de Aceptación:**
    *   La lista de galerías debe mostrar una imagen representativa y el nombre de cada galería.
    *   Cada galería en la lista debe mostrar el nombre del especialista asociado.

### HU-05: Ver detalle de una galería

**Como** un visitante,
**quiero** poder seleccionar una galería y ver su contenido en detalle, incluyendo las imágenes, la descripción y los comentarios de otros usuarios,
**para poder** evaluar la calidad del trabajo y la opinión de la comunidad.

*   **Criterios de Aceptación:**
    *   La vista de detalle debe mostrar toda la información de la galería.
    *   Debe incluir una sección con los comentarios, mostrando el texto, la valoración y el nombre del usuario que lo escribió.

### HU-06: Ver lista de especialistas

**Como** un visitante,
**quiero** poder ver una lista de todos los especialistas que participan en la plataforma,
**para poder** conocer a los profesionales detrás de los trabajos.

*   **Criterios de Aceptación:**
    *   La lista debe mostrar el nombre y la especialidad de cada profesional.

---

## Épica: Interacción y Comunidad

### HU-07: Añadir un comentario a una galería

**Como** un usuario registrado,
**quiero** poder añadir un comentario y una valoración (puntuación) a una galería,
**para poder** compartir mi opinión sobre el trabajo con otros usuarios.

*   **Criterios de Aceptación:**
    *   El usuario debe estar autenticado para poder comentar.
    *   Un usuario solo puede añadir un comentario por galería.
    *   El comentario debe quedar asociado a la galería y al usuario que lo creó.

### HU-08: Editar mi comentario

**Como** un usuario registrado,
**quiero** poder editar un comentario que he publicado previamente,
**para poder** corregir errores o actualizar mi opinión.

*   **Criterios de Aceptación:**
    *   El usuario debe estar autenticado.
    *   Un usuario solo puede editar sus propios comentarios.

### HU-09: Eliminar mi comentario

**Como** un usuario registrado,
**quiero** poder eliminar un comentario que he publicado,
**para poder** retirar mi opinión si ya no es relevante.

*   **Criterios de Aceptación:**
    *   El usuario debe estar autenticado.
    *   Un usuario solo puede eliminar sus propios comentarios.
