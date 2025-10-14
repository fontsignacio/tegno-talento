# Modelo de datos anterior


```bash
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Modelos principales
model area {
  id_area Int     @id @default(autoincrement())
  nombre  String  @db.VarChar(50)
  puestos puesto[]
}

model puesto {
  id_puesto           Int      @id @default(autoincrement())
  nombre              String   @db.VarChar(50)
  descripcion         String?
  peso_experiencia    Decimal  @db.Decimal(5, 2)
  peso_educacion      Decimal  @db.Decimal(5, 2)
  experiencia_req     Int
  nivel_educ_req      Int
  puntaje_corte       Decimal  @db.Decimal(5, 2)
  area_id             Int
  area                area     @relation(fields: [area_id], references: [id_area])
  vacantes            vacante[]
  puesto_habilidades  puesto_habilidad[]
  empleados           empleado[]
}

model habilidad {
  id_habilidad        Int      @id @default(autoincrement())
  nombre              String   @db.VarChar(50)
  tipo                tipo_habilidad
  puesto_habilidades  puesto_habilidad[]
  empleado_habilidades empleado_habilidad[]
}

model empleado {
  id_empleado         Int      @id @default(autoincrement())
  nombre              String   @db.VarChar(100)
  correo              String   @unique @db.VarChar(100)
  experiencia         Int?
  nivel_educativo     Int?
  puesto_id           Int
  tipo_empleado       tipo_empleado @default(INTERNO)
  puesto              puesto   @relation(fields: [puesto_id], references: [id_puesto])
  empleado_habilidades empleado_habilidad[]
  respuestas_formulario empleado_respuesta_formulario[]
}

model vacante {
  id_vacante    Int      @id @default(autoincrement())
  descripcion   String?
  fecha_creacion DateTime @default(now())
  fecha_cierre  DateTime?
  puesto_id     Int
  puesto        puesto   @relation(fields: [puesto_id], references: [id_puesto])
}

// Modelos de relación
model puesto_habilidad {
  id_vacante_habilidad Int      @id @default(autoincrement())
  puesto_id            Int
  habilidad_id         Int
  nivel_requerido      Int
  critica              Boolean  @default(false)
  peso                 Decimal  @db.Decimal(5, 2)
  puesto               puesto   @relation(fields: [puesto_id], references: [id_puesto])
  habilidad            habilidad @relation(fields: [habilidad_id], references: [id_habilidad])
}

model empleado_habilidad {
  id_empleado_habilidad Int      @id @default(autoincrement())
  empleado_id           Int
  habilidad_id          Int
  nivel_habilidad       Int
  empleado              empleado @relation(fields: [empleado_id], references: [id_empleado])
  habilidad             habilidad @relation(fields: [habilidad_id], references: [id_habilidad])
}

model empleado_respuesta_formulario {
  id_respuesta          Int      @id @default(autoincrement())
  empleado_id           Int
  fecha_respuesta       DateTime @default(now())
  disfrute_logica       Int
  detalle               Int
  liderazgo             Int
  curiosidad_tecnologica Int
  motivacion            tipo_motivacion
  empleado              empleado @relation(fields: [empleado_id], references: [id_empleado])
}

// Enums
enum tipo_habilidad {
  tecnica
  blanda
}

enum tipo_empleado {
  EXTERNO
  INTERNO
}

enum tipo_motivacion {
  crear
  arreglar
  coordinar
}

```

# Problema


El problema principal de tu modelo actual es cómo está definida la relación entre vacante, puesto y habilidades:


```bash

vacante -> puesto -> puesto_habilidad -> habilidad

```

**Problema**:


- Todas las vacantes de un mismo puesto comparten las mismas habilidades.


- No se puede diferenciar si una vacante requiere Python y otra Java.


- No hay manera de obtener las habilidades específicas de una vacante.


- Si consultas vacante -> puesto -> puesto_habilidades, siempre verás todas las habilidades del puesto, no solo las de la vacante.


- Esto limita la flexibilidad si querés crear vacantes con requisitos distintos aunque compartan el mismo puesto.


# Solucion Propuesta

Crear un modelo `vacante_habilidad` que relacione directamente cada vacante con sus habilidades:


```bash

vacante -> vacante_habilidad -> habilidad

```

De esta forma:

- Cada vacante puede tener habilidades diferentes.

- Podés consultar las habilidades de una vacante específica sin depender del puesto.

- Mantienes el modelo de puesto para agrupar vacantes, pero las habilidades ahora son propias de cada vacante.
