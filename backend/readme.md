### Backend – TEGNO TALENTO

#### Arquitectura (básico)
- **Express (API HTTP)**: app principal en `src/app.ts`, servidor en `src/server.ts`.
- **Rutas**: `src/routes/*` montadas bajo `/api/v1` (ej: `/api/v1/users`).
- **Controladores**: `src/controllers/*` coordinan la lógica por endpoint.
- **Servicios**: `src/services/*` acceden a la base de datos vía Prisma.
- **Base de datos (PostgreSQL + Prisma)**: esquema en `prisma/schema.prisma`, cliente en `src/config/db.ts`.
- **Middleware de errores**: `src/middlewares/errorHandler.ts`.

#### Requisitos
- Node.js 18+
- PostgreSQL (variable `DATABASE_URL` en `.env`)

#### Configuración
1) Crear `.env` en el root con al menos:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public"
//para hacer pruebas:
//DATABASE_URL=postgresql://postgres.ojhmymnmzfrizvilknwi:bSa8wzHjcLdXWYIF@aws-1-us-east-1.pooler.supabase.com:6543/postgres
PORT=3000
```
2) Instalar dependencias:
```
npm install
```
3) Preparar base de datos (genera/aplica migraciones en desarrollo):
```
npm run migrate
```

Nota: Asegúrate de que el archivo `.env` esté guardado en codificación UTF-8 (sin BOM). Algunos editores en Windows pueden guardar archivos en UTF-16LE, lo que impide que `dotenv` los parse correctamente; si tus variables aparecen como `undefined`, re-guardar `.env` en UTF-8 suele resolverlo.

#### Ejecutar
- Desarrollo (hot reload):
```
npm run dev
```
- Producción:
```
npm run build && npm start
```

Endpoints de ejemplo:
- `GET /api/v1/users`
- `POST /api/v1/users` body: `{ "name": string, "email": string }`

#### Estructura del proyecto
```
backend/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── controllers/
│   │   └── userController.ts
│   ├── routes/
│   │   └── userRoutes.ts
│   ├── services/
│   │   └── userService.ts
│   ├── middlewares/
│   │   └── errorHandler.ts
│   ├── types/
│   │   └── user.ts
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```
