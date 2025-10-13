-- CreateEnum
CREATE TYPE "motivacion_enum" AS ENUM ('crear', 'arreglar', 'coordinar');

-- CreateEnum
CREATE TYPE "tipo_empleado_enum" AS ENUM ('EXTERNO', 'INTERNO');

-- CreateEnum
CREATE TYPE "tipo_habilidad_enum" AS ENUM ('tecnica', 'blanda');

-- CreateTable
CREATE TABLE "area" (
    "id_area" INTEGER NOT NULL,
    "nombre" VARCHAR(50),

    CONSTRAINT "area_pkey" PRIMARY KEY ("id_area")
);

-- CreateTable
CREATE TABLE "empleado" (
    "id_empleado" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "correo" VARCHAR(100) NOT NULL,
    "experiencia" INTEGER,
    "nivel_educativo" INTEGER,
    "puesto_id" INTEGER,
    "tipo_empleado" "tipo_empleado_enum" NOT NULL DEFAULT 'INTERNO',

    CONSTRAINT "empleado_pkey" PRIMARY KEY ("id_empleado")
);

-- CreateTable
CREATE TABLE "empleado_habilidad" (
    "id_empleado_habilidad" INTEGER NOT NULL,
    "empleado_id" INTEGER,
    "habilidad_id" INTEGER,
    "nivel_habilidad" INTEGER,

    CONSTRAINT "empleado_habilidad_pkey" PRIMARY KEY ("id_empleado_habilidad")
);

-- CreateTable
CREATE TABLE "empleado_respuesta_formulario" (
    "id_respuesta" SERIAL NOT NULL,
    "empleado_id" INTEGER,
    "fecha_respuesta" TIMESTAMP(6),
    "disfrute_logica" INTEGER,
    "detalle" INTEGER,
    "liderazgo" INTEGER,
    "curiosidad_tecnologica" INTEGER,
    "motivacion" "motivacion_enum",

    CONSTRAINT "empleado_respuesta_formulario_pkey" PRIMARY KEY ("id_respuesta")
);

-- CreateTable
CREATE TABLE "habilidad" (
    "id_habilidad" INTEGER NOT NULL,
    "nombre" VARCHAR(50),
    "tipo" "tipo_habilidad_enum",

    CONSTRAINT "habilidad_pkey" PRIMARY KEY ("id_habilidad")
);

-- CreateTable
CREATE TABLE "puesto" (
    "id_puesto" INTEGER NOT NULL,
    "nombre" VARCHAR(50),
    "descripcion" TEXT,
    "peso_experiencia" DECIMAL(5,2),
    "peso_educacion" DECIMAL(5,2),
    "experiencia_req" INTEGER,
    "nivel_educ_req" INTEGER,
    "puntaje_corte" DECIMAL(5,2),
    "area_id" INTEGER,

    CONSTRAINT "puesto_pkey" PRIMARY KEY ("id_puesto")
);

-- CreateTable
CREATE TABLE "puesto_habilidad" (
    "id_vacante_habilidad" INTEGER NOT NULL,
    "puesto_id" INTEGER,
    "habilidad_id" INTEGER,
    "nivel_requerido" INTEGER,
    "critica" BOOLEAN,
    "peso" DECIMAL(5,2),

    CONSTRAINT "puesto_habilidad_pkey" PRIMARY KEY ("id_vacante_habilidad")
);

-- CreateTable
CREATE TABLE "vacante" (
    "id_vacante" INTEGER NOT NULL,
    "descripcion" TEXT,
    "fecha_creacion" DATE,
    "fecha_cierre" DATE,
    "puesto_id" INTEGER,

    CONSTRAINT "vacante_pkey" PRIMARY KEY ("id_vacante")
);

-- AddForeignKey
ALTER TABLE "empleado" ADD CONSTRAINT "empleado_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "puesto"("id_puesto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "empleado_habilidad" ADD CONSTRAINT "empleado_habilidad_empleado_id_fkey" FOREIGN KEY ("empleado_id") REFERENCES "empleado"("id_empleado") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "empleado_habilidad" ADD CONSTRAINT "empleado_habilidad_habilidad_id_fkey" FOREIGN KEY ("habilidad_id") REFERENCES "habilidad"("id_habilidad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "empleado_respuesta_formulario" ADD CONSTRAINT "empleado_respuesta_formulario_empleado_id_fkey" FOREIGN KEY ("empleado_id") REFERENCES "empleado"("id_empleado") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "puesto" ADD CONSTRAINT "puesto_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"("id_area") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "puesto_habilidad" ADD CONSTRAINT "puesto_habilidad_habilidad_id_fkey" FOREIGN KEY ("habilidad_id") REFERENCES "habilidad"("id_habilidad") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "puesto_habilidad" ADD CONSTRAINT "puesto_habilidad_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "puesto"("id_puesto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vacante" ADD CONSTRAINT "vacante_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "puesto"("id_puesto") ON DELETE NO ACTION ON UPDATE NO ACTION;
