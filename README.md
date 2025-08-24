# Backend de Zoonika

## Descripción General

Este backend es el motor de la aplicación Zoonika, una plataforma diseñada para gestionar galerías de imágenes, especialistas, 
usuarios y comentarios. Funciona como una API RESTful que permite a los clientes (como una aplicación web o móvil) 
interactuar con la base de datos para realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en los recursos mencionados.
Las funcionalidades principales incluyen:

**Autenticación de usuarios**: Registro y login seguro con contraseñas hasheadas.
**Gestión de galerías**: Obtener listados y detalles de galerías, incluyendo los comentarios y el especialista asociado.
**Gestión de comentarios**: Crear, leer y actualizar comentarios en las galerías.
**Consulta de datos**: Endpoints para obtener información sobre usuarios y especialistas.

## Tecnologías Utilizadas

**Node.js**: Entorno de ejecución para JavaScript en el servidor.
**Express.js**: Framework para construir la API RESTful y gestionar las rutas.
**Prisma**: ORM para interactuar con la base de datos de una manera moderna y segura.
**Prisma Client**: Cliente de base de datos autogenerado y type-safe.
**MySQL**: Sistema de gestión de bases de datos relacional.
**bcryptjs**: Librería para el hasheo de contraseñas.
**cors**: Middleware para habilitar el Cross-Origin Resource Sharing.

## Estructura del Proyecto

25 El backend sigue una estructura sencilla y funcional, ideal para un desarrollo rápido y mantenible:

`index.js`: Archivo principal que inicializa el servidor Express, define las rutas de la API y gestiona la lógica de negocio.
`package.json`: Define los metadatos del proyecto, dependencias y scripts.
`prisma/`: Carpeta que contiene todo lo relacionado con Prisma.
`schema.prisma`: Archivo donde se define el esquema de la base de datos (modelos y relaciones).
`migrations/`: Directorio con las migraciones generadas por Prisma para mantener la base de datos sincronizada con el esquema.

## Configuración de Prisma

Prisma es el núcleo de la interacción con la base de datos. Su configuración es clave para el funcionamiento del backend.

### Esquema (`schema.prisma`)

El archivo `prisma/schema.prisma` define los modelos de datos de la aplicación (`Especialista`, `Usuario`, `Galeria`, `Comentario`) 
y sus relaciones. Este esquema es la única fuente de verdad para la estructura de la base de datos.

### Migraciones

Para aplicar cambios en el esquema a la base de datos, se utilizan las migraciones de Prisma. 
El siguiente comando crea una nueva 
migración y la aplica:
```bash 
 npx prisma migrate dev --name nombre-de-la-migracion
````
### Generación del Cliente

Después de cualquier cambio en el `schema.prisma`, es necesario regenerar el Prisma Client para que esté actualizado con los modelos de datos.
```bash 
 npx prisma generate
```
Este comando lee el esquema y genera un cliente de base de datos a medida en `node_modules/@prisma/client`.

## Requisitos Técnicos

Para ejecutar este backend, necesitas tener instalado el siguiente software:

**Node.js** (se recomienda v18 o superior)
 **npm** (se instala con Node.js)
 **Una base de datos MySQL** (local o remota)
 
 ### Pasos para la Instalación
 
 **Clonar el repositorio** y navegar al directorio del proyecto.
 
 **Instalar dependencias**:
```bash 
 npm install
```
**Ejecutar las migraciones** de la base de datos:
```bash 
 npx prisma migrate dev
```
 **Iniciar el servidor**:
 ```bash 
 node index.js
```
El servidor se ejecutará en `http://localhost:4000` por defecto.
