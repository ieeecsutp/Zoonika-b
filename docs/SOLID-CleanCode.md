# SOLID y Clean Code del Backend de Zoonika

## S – Single Responsibility Principle (SRP)

Cada función o módulo debe tener una única y bien definida responsabilidad.

📌 **Evidencia:** La arquitectura del proyecto se ha estructurado en capas (rutas, controladores, servicios), donde cada capa tiene una responsabilidad clara.

1.  **Capa de Rutas:** Define los endpoints y delega la gestión a los controladores.

    ```typescript
    // ✅ Correcto: src/routes/galleryRoutes.ts
    import { Router } from 'express';
    import { getAllGalleries, getGalleryById } from '../controllers/galleryController';

    const router = Router();
    router.get('/', getAllGalleries);
    router.get('/:id', getGalleryById);

    export default router;
    ```

2.  **Capa de Controladores:** Orquesta el flujo de la petición HTTP y llama a los servicios. No contiene lógica de negocio compleja.

    ```typescript
    // ✅ Correcto: src/controllers/galleryController.ts
    export const getGalleryById = async (req: Request, res: Response, next: NextFunction) => {
      const id = parseInt(req.params.id);
      try {
        const galeria = await galleryService.getGalleryDetailById(id);
        if (!galeria) return res.status(404).json({ error: 'No encontrada' });
        res.json(galeria);
      } catch (e) {
        next(e);
      }
    };
    ```

3.  **Capa de Servicios:** Encapsula la lógica de negocio y la interacción con la base de datos.

    ```typescript
    // ✅ Correcto: src/services/galleryService.ts
    export const getGalleryDetailById = async (id: number) => {
      return await prisma.galeria.findUnique({
        where: { id },
        include: { especialista: true, comentarios: { include: { usuario: true } } }
      });
    };
    ```

## O – Open/Closed Principle (OCP)

El código debe estar abierto a la extensión, pero cerrado a la modificación.

📌 **Evidencia:** El uso de middlewares en Express permite añadir nuevas funcionalidades sin alterar los controladores existentes. Por ejemplo, para proteger las rutas de comentarios, simplemente añadimos `authMiddleware`.

```typescript
// ✅ Correcto: Se puede añadir nuevo middleware sin tocar el controlador 'createComment'
import { Router } from 'express';
import { createComment, updateComment } from '../controllers/commentController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// La ruta está "abierta" a añadir más middlewares (ej. un futuro validationMiddleware)
router.post('/', authMiddleware, createComment);
router.put('/:id', authMiddleware, updateComment);
```

## L – Liskov Substitution Principle (LSP)

Los módulos o funciones intercambiables deben cumplir el mismo contrato.

📌 **Evidencia:** Aunque el proyecto no usa herencia de clases de forma extensiva, el principio se observa en cómo Express trata los controladores. Cualquier función que cumpla con la firma `(req, res, next)` puede ser usada como un controlador o middleware, haciéndolos sustituibles.

```typescript
// ✅ Correcto: Ambas funciones cumplen el "contrato" de un controlador de Express

// src/controllers/userController.ts
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  // ...
};

// src/controllers/galleryController.ts
export const getAllGalleries = async (req: Request, res: Response, next: NextFunction) => {
  // ...
};
```

## I – Interface Segregation Principle (ISP)

Ningún cliente debe ser forzado a depender de interfaces (o módulos) que no utiliza.

📌 **Evidencia:** En lugar de exportar una única clase monolítica por servicio, cada archivo de servicio exporta múltiples funciones pequeñas y específicas. Los controladores pueden importar únicamente las que necesitan.

```typescript
// ✅ Correcto: El servicio exporta funciones granulares.
// src/services/authService.ts
export const registerUser = async (...) => { /* ... */ };
export const findUserByEmail = async (...) => { /* ... */ };
export const comparePassword = async (...) => { /* ... */ };

// ✅ Correcto: El controlador solo importa lo que necesita.
// src/controllers/authController.ts
import { registerUser } from '../services/authService'; // No necesita findUserByEmail aquí

export const register = async (req: Request, res: Response, next: NextFunction) => {
  // ... usa solo registerUser
};
```

## D – Dependency Inversion Principle (DIP)

El código de alto nivel no debe depender de implementaciones concretas, sino de abstracciones.

📌 **Evidencia:** Aunque no se usa inyección de dependencias por constructor, se aplica el principio al abstraer la creación del cliente de Prisma. Ningún servicio crea su propia instancia `new PrismaClient()`, sino que dependen de un módulo centralizado (`src/db.ts`).

```typescript
// Abstracción de la conexión a la BD
// ✅ Correcto: src/db.ts
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

// El servicio depende de la abstracción, no de la implementación
// ✅ Correcto: src/services/userService.ts
import { prisma } from '../db'; // Depende del módulo central

export const getAllUsersFromDb = async () => {
  return await prisma.usuario.findMany(...);
};
```
Esto facilita las pruebas (se puede hacer mock de `src/db.ts`) y centraliza la configuración de la base de datos.

---

## Evidencias de Clean Code

Se han aplicado buenas prácticas de legibilidad, modularidad y mantenibilidad.

#### Nombres claros y significativos

Los nombres de variables y funciones deben revelar su intención para que el código sea más fácil de leer y entender.

```typescript
// ❌ Malo
const data = get(id);

// ✅ Bueno: El nombre describe exactamente lo que hace la función y lo que contiene la variable.
const gallery = await getGalleryDetailById(id);
```

#### Funciones pequeñas y concisas

Cada función debe tener una única responsabilidad bien definida. Esto las hace más fáciles de entender, probar y reutilizar.

```typescript
// ✅ Bueno: La función solo se encarga de buscar un usuario por su email.
// src/services/authService.ts
export const findUserByEmail = async (email: string) => {
  return await prisma.usuario.findUnique({ where: { email } });
};
```

#### Evitar "Números Mágicos"

Los valores literales codificados directamente (números o strings mágicos) deben ser evitados. Es mejor definirlos como constantes con un nombre claro, lo que mejora la legibilidad y el mantenimiento.

```typescript
// ❌ Malo
const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' });
res.status(201).json(user);

// ✅ Bueno: Usar constantes para valores recurrentes o importantes.
const JWT_EXPIRATION_TIME = '1h';
const HTTP_STATUS_CREATED = 201;

const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
res.status(HTTP_STATUS_CREATED).json(user);
```

#### Código Asíncrono Legible con Async/Await

El uso de `async/await` en lugar de cadenas de `.then()` y `.catch()` hace que el código asíncrono se lea de manera secuencial y sea mucho más fácil de seguir.

```typescript
// ❌ Malo (con promesas anidadas)
findUserByEmail(email).then(user => {
  if (user) {
    comparePassword(password, user.password).then(valid => {
      if (valid) {
        // ... Lógica de login
      }
    });
  }
});

// ✅ Bueno: El flujo es lineal y fácil de entender.
// src/controllers/authController.ts
const user = await findUserByEmail(email);
if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

const valid = await comparePassword(password, user.password);
if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });

// ... Lógica de login
```