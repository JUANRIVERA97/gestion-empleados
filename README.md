# Gestión de Empleados — Aplicación web full stack

Evidencia **GA8-220501096-AA1-EV01** · *Desarrollar software a partir de la integración de sus módulos componentes*
SENA · Tecnólogo en Análisis y Desarrollo de Software

Aplicación web para **registrar, consultar, editar y eliminar empleados** (CRUD), construida con una arquitectura de tres capas:

```
┌──────────────────────┐   HTTP / JSON    ┌──────────────────────┐   Mongoose   ┌──────────────┐
│  FRONTEND (Angular)  │ ───────────────► │ BACKEND (Node.js +   │ ───────────► │   MongoDB    │
│  + Materialize       │ ◄─────────────── │ Express) – API REST  │ ◄─────────── │ (base datos) │
│  localhost:4200      │                  │ localhost:3000       │              │  :27017      │
└──────────────────────┘                  └──────────────────────┘              └──────────────┘
```

## Tecnologías

| Tecnología  | Función en el proyecto |
|-------------|------------------------|
| Node.js     | Entorno para ejecutar JavaScript en el servidor |
| Express     | Servidor y API REST |
| MongoDB     | Base de datos NoSQL |
| Mongoose    | Modelado de datos y comunicación con MongoDB |
| Angular     | Frontend (componentes, servicio HTTP) |
| Materialize | Diseño de la interfaz |
| Postman     | Pruebas de la API |
| Git/GitHub  | Control de versiones |

## Estructura del proyecto

```
gestion-empleados/
├── backend/
│   ├── api/index.js                           # Entrada para Vercel (serverless)
│   ├── vercel.json                            # Configuración de Vercel
│   ├── src/
│   │   ├── config/database.js                 # Conexión a MongoDB
│   │   ├── models/empleado.model.js           # Esquema del empleado (Mongoose)
│   │   ├── controllers/empleado.controller.js # Lógica del CRUD
│   │   ├── routes/empleado.routes.js          # Rutas de la API REST
│   │   ├── app.js                             # Configuración de Express
│   │   └── index.js                           # Punto de entrada del servidor
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── scripts/set-env.js                     # Escribe API_URL antes de compilar
│   ├── vercel.json
│   └── src/app/
│       ├── models/empleado.ts                 # Interfaz del empleado
│       ├── services/empleado.ts               # Servicio HTTP que consume la API
│       ├── components/
│       │   ├── navbar/                        # Barra de navegación
│       │   ├── empleado-form/                 # Formulario crear / editar
│       │   └── empleado-list/                 # Tabla con editar / eliminar
│       ├── app.ts / app.html                  # Componente principal
│       └── app.config.ts                      # Proveedores (HttpClient, idioma)
└── postman/
    └── Gestion-Empleados.postman_collection.json
```

## API REST

URL base: `http://localhost:3000/api/empleados`

| Método | Ruta    | Acción                    |
|--------|---------|---------------------------|
| GET    | `/`     | Listar todos los empleados |
| GET    | `/:id`  | Consultar un empleado      |
| POST   | `/`     | Crear un empleado          |
| PUT    | `/:id`  | Actualizar un empleado     |
| DELETE | `/:id`  | Eliminar un empleado       |

Ejemplo de cuerpo (JSON) para POST / PUT:

```json
{
  "nombre": "Ana Pérez",
  "cargo": "Desarrolladora",
  "oficina": "Cartagena",
  "salario": 3500000
}
```

## Despliegue en la nube (Vercel + MongoDB Atlas)

| Parte    | Dónde         | Root Directory | Variables de entorno |
|----------|---------------|----------------|----------------------|
| Base de datos | MongoDB Atlas (cluster gratuito M0) | — | — |
| Backend  | Vercel (Framework: Other)   | `backend`  | `MONGODB_URI` = cadena de conexión de Atlas |
| Frontend | Vercel (Framework: Angular) | `frontend` | `API_URL` = URL del backend desplegado |

- **URL Backend:** `https://[tu-backend].vercel.app/api/empleados`
- **URL Frontend:** `https://[tu-frontend].vercel.app`

El backend usa `api/index.js` como función serverless de Vercel y `vercel.json` redirige todas las rutas a Express.
El frontend ejecuta `scripts/set-env.js` antes de compilar, que escribe `API_URL` en `src/environments/environment.ts`.

## Cómo ejecutar el proyecto en local (opcional)

**Requisitos:** Node.js 20 o superior, MongoDB Community Server (o MongoDB Atlas).

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Debe aparecer: `✅ Conectado a MongoDB` y `🚀 Servidor activo en http://localhost:3000`.
Si usas MongoDB Atlas, copia `.env.example` como `.env` y cambia `MONGODB_URI`.

### 2. Frontend (en otra terminal)

```bash
cd frontend
npm install
npx ng serve -o
```

Se abre `http://localhost:4200` con la aplicación.

### 3. Pruebas con Postman

Importa `postman/Gestion-Empleados.postman_collection.json` en Postman y ejecuta las peticiones en orden (1 → 5).

## Autor(a)

**[Tu nombre completo]** — Ficha 3186670
