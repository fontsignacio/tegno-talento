-- CreateEnum
CREATE TYPE "tipo_habilidad" AS ENUM ('tecnica', 'blanda');

-- CreateEnum
CREATE TYPE "tipo_empleado" AS ENUM ('EXTERNO', 'INTERNO');

-- CreateEnum
CREATE TYPE "tipo_motivacion" AS ENUM ('crear', 'arreglar', 'coordinar');

-- CreateTable
CREATE TABLE "area" (
    "id_area" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,

    CONSTRAINT "area_pkey" PRIMARY KEY ("id_area")
);

-- CreateTable
CREATE TABLE "puesto" (
    "id_puesto" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" TEXT,
    "peso_experiencia" DECIMAL(5,2) NOT NULL,
    "peso_educacion" DECIMAL(5,2) NOT NULL,
    "experiencia_req" INTEGER NOT NULL,
    "nivel_educ_req" INTEGER NOT NULL,
    "puntaje_corte" DECIMAL(5,2) NOT NULL,
    "area_id" INTEGER NOT NULL,

    CONSTRAINT "puesto_pkey" PRIMARY KEY ("id_puesto")
);

-- CreateTable
CREATE TABLE "habilidad" (
    "id_habilidad" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "tipo" "tipo_habilidad" NOT NULL,

    CONSTRAINT "habilidad_pkey" PRIMARY KEY ("id_habilidad")
);

-- CreateTable
CREATE TABLE "empleado" (
    "id_empleado" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "correo" VARCHAR(100) NOT NULL,
    "experiencia" INTEGER,
    "nivel_educativo" INTEGER,
    "puesto_id" INTEGER NOT NULL,
    "tipo_empleado" "tipo_empleado" NOT NULL DEFAULT 'INTERNO',

    CONSTRAINT "empleado_pkey" PRIMARY KEY ("id_empleado")
);

-- CreateTable
CREATE TABLE "vacante" (
    "id_vacante" SERIAL NOT NULL,
    "descripcion" TEXT,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_cierre" TIMESTAMP(3),
    "puesto_id" INTEGER NOT NULL,

    CONSTRAINT "vacante_pkey" PRIMARY KEY ("id_vacante")
);

-- CreateTable
CREATE TABLE "puesto_habilidad" (
    "id_vacante_habilidad" SERIAL NOT NULL,
    "puesto_id" INTEGER NOT NULL,
    "habilidad_id" INTEGER NOT NULL,
    "nivel_requerido" INTEGER NOT NULL,
    "critica" BOOLEAN NOT NULL DEFAULT false,
    "peso" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "puesto_habilidad_pkey" PRIMARY KEY ("id_vacante_habilidad")
);

-- CreateTable
CREATE TABLE "empleado_habilidad" (
    "id_empleado_habilidad" SERIAL NOT NULL,
    "empleado_id" INTEGER NOT NULL,
    "habilidad_id" INTEGER NOT NULL,
    "nivel_habilidad" INTEGER NOT NULL,

    CONSTRAINT "empleado_habilidad_pkey" PRIMARY KEY ("id_empleado_habilidad")
);

-- CreateTable
CREATE TABLE "empleado_respuesta_formulario" (
    "id_respuesta" SERIAL NOT NULL,
    "empleado_id" INTEGER NOT NULL,
    "fecha_respuesta" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "disfrute_logica" INTEGER NOT NULL,
    "detalle" INTEGER NOT NULL,
    "liderazgo" INTEGER NOT NULL,
    "curiosidad_tecnologica" INTEGER NOT NULL,
    "motivacion" "tipo_motivacion" NOT NULL,

    CONSTRAINT "empleado_respuesta_formulario_pkey" PRIMARY KEY ("id_respuesta")
);

-- CreateIndex
CREATE UNIQUE INDEX "empleado_correo_key" ON "empleado"("correo");

-- AddForeignKey
ALTER TABLE "puesto" ADD CONSTRAINT "puesto_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "area"("id_area") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empleado" ADD CONSTRAINT "empleado_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "puesto"("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacante" ADD CONSTRAINT "vacante_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "puesto"("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "puesto_habilidad" ADD CONSTRAINT "puesto_habilidad_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "puesto"("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "puesto_habilidad" ADD CONSTRAINT "puesto_habilidad_habilidad_id_fkey" FOREIGN KEY ("habilidad_id") REFERENCES "habilidad"("id_habilidad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empleado_habilidad" ADD CONSTRAINT "empleado_habilidad_empleado_id_fkey" FOREIGN KEY ("empleado_id") REFERENCES "empleado"("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empleado_habilidad" ADD CONSTRAINT "empleado_habilidad_habilidad_id_fkey" FOREIGN KEY ("habilidad_id") REFERENCES "habilidad"("id_habilidad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empleado_respuesta_formulario" ADD CONSTRAINT "empleado_respuesta_formulario_empleado_id_fkey" FOREIGN KEY ("empleado_id") REFERENCES "empleado"("id_empleado") ON DELETE RESTRICT ON UPDATE CASCADE;
