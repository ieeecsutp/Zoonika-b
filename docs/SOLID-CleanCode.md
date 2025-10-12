# Principios SOLID y Clean Code en el Backend de Zoonika

Este documento describe cómo los principios SOLID y las prácticas de Clean Code se han aplicado en la refactorización y desarrollo del backend de Zoonika.

## 1. Principio de Responsabilidad Única (SRP)

La refactorización del backend usa SRP.

*   **Rutas (`src/routes/`):** Su única responsabilidad es definir los endpoints y dirigir las solicitudes a los controladores adecuados.

    ```typescript
    // src/routes/authRoutes.ts
    import { Router } from 'express';
    import { register, login } from '../controllers/authController';

    const router = Router();

    router.post('/register', register);
    router.post('/login', login);

    export default router;
    ```
    *Explicación:* Este fragmento muestra cómo `authRoutes.ts` se limita a definir las rutas y a delegar la lógica a las funciones del controlador, sin contener ninguna lógica de negocio o de base de datos.

*   **Controladores (`src/controllers/`):** Su responsabilidad principal es manejar la lógica de la solicitud HTTP (validación de entrada, orquestación de la lógica de negocio) y preparar la respuesta. Delegan las operaciones de base de datos a la capa de servicios.

    ```typescript
    // src/controllers/authController.ts (fragmento)
    import { Request, Response, NextFunction } from 'express';
    import { registerUser, findUserByEmail, comparePassword } from '../services/authService';

    export const register = async (req: Request, res: Response, next: NextFunction) => {
      const { nombre, email, password } = req.body;
      try {
        const user = await registerUser(nombre, email, password);
        res.status(201).json(user);
      } catch (e) {
        next(e);
      }
    };
    ```
    *Explicación:* Aquí, `authController.ts` recibe la solicitud, extrae los datos y llama a `registerUser` del servicio. El controlador no sabe cómo `registerUser` interactúa con la base de datos, solo que realiza el registro.

*   **Servicios (`src/services/`):** Su responsabilidad es encapsular la lógica de negocio específica y las interacciones con la base de datos (Prisma), desacoplando los controladores de la implementación de la persistencia.

    ```typescript
    // src/services/authService.ts (fragmento)
    import { prisma } from '../db';
    import bcrypt from 'bcryptjs';

    export const registerUser = async (nombre: string, email: string, passwordPlain: string) => {
      const hashed = await bcrypt.hash(passwordPlain, 10);
      const user = await prisma.usuario.create({
        data: { nombre, email, password: hashed }
      });
      return { id: user.id, nombre: user.nombre, email: user.email };
    };
    ```
    *Explicación:* `authService.ts` contiene la lógica directa para interactuar con Prisma y `bcrypt` para el hasheo de contraseñas. Esta función tiene una única responsabilidad: registrar un usuario en la base de datos.

## 2. Principio Abierto/Cerrado (OCP)

Se pueden añadir nuevas funcionalidades sin modificar el código existente en otras capas.

## 3. Principio de Sustitución de Liskov (LSP)

Se mantiene la coherencia en el uso de interfaces (como las de Express `Request`, `Response`, `NextFunction`) y tipos de datos, asegurando que los componentes se comporten como se espera.

## 4. Principio de Segregación de Interfaces (ISP)

En TypeScript, se usa tipos específicos para las funciones y objetos, asegurando que los componentes solo dependan de la funcionalidad que realmente necesitan.

## 5. Principio de Inversión de Dependencias (DIP)

Los servicios dependen de una abstracción (la instancia de Prisma) en lugar de una implementación concreta, facilitando el mocking en pruebas y la posible sustitución de la capa de persistencia.

    ```typescript
    // src/db.ts
    import { PrismaClient } from '@prisma/client';

    export const prisma = new PrismaClient();
    ```
    *Explicación:* `src/db.ts` exporta una única instancia de `PrismaClient`. Los servicios la importan y utilizan, lo que significa que dependen de una abstracción (la interfaz de `PrismaClient`) en lugar de una implementación específica de cómo se conecta a la base de datos.

## Clean Code

Además de SOLID, se han aplicado prácticas de Clean Code:

*   **Manejo de Errores Centralizado:** La implementación de `errorHandler.ts` asegura que los errores se capturen y manejen de manera uniforme en toda la aplicación, mejorando la robustez y la experiencia del desarrollador.

    ```typescript
    // src/middlewares/errorHandler.ts
    import { Request, Response, NextFunction } from 'express';

    export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Ocurrió un error inesperado en el servidor.' });
    };
    ```
    *Explicación:* Este middleware captura cualquier error que se propague a través de `next(e)` en los controladores o servicios, proporcionando una respuesta estandarizada al cliente y registrando el error internamente.

*   **Uso de TypeScript:** El uso de TypeScript añade tipado estático, lo que mejora la legibilidad, la mantenibilidad y ayuda a prevenir errores en tiempo de desarrollo.

*   **Estructura de Carpetas Clara:** La organización en `routes`, `controllers`, `services`, `middlewares` y `db` proporciona una estructura lógica y fácil de navegar, siguiendo un patrón de capas que mejora la comprensión del proyecto.

## Conclusión

La refactorización y las nuevas implementaciones han transformado el backend de Zoonika en una aplicación más modular, mantenible, escalable y segura.
