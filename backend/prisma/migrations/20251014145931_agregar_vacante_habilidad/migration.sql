/*
  Warnings:

  - You are about to drop the column `experiencia_req` on the `puesto` table. All the data in the column will be lost.
  - You are about to drop the column `nivel_educ_req` on the `puesto` table. All the data in the column will be lost.
  - You are about to drop the column `peso_educacion` on the `puesto` table. All the data in the column will be lost.
  - You are about to drop the column `peso_experiencia` on the `puesto` table. All the data in the column will be lost.
  - You are about to drop the column `puntaje_corte` on the `puesto` table. All the data in the column will be lost.
  - You are about to drop the `puesto_habilidad` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `experiencia_req` to the `vacante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nivel_educ_req` to the `vacante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso_educacion` to the `vacante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso_experiencia` to the `vacante` table without a default value. This is not possible if the table is not empty.
  - Added the required column `puntaje_corte` to the `vacante` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."puesto_habilidad" DROP CONSTRAINT "puesto_habilidad_habilidad_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."puesto_habilidad" DROP CONSTRAINT "puesto_habilidad_puesto_id_fkey";

-- AlterTable
ALTER TABLE "puesto" DROP COLUMN "experiencia_req",
DROP COLUMN "nivel_educ_req",
DROP COLUMN "peso_educacion",
DROP COLUMN "peso_experiencia",
DROP COLUMN "puntaje_corte";

-- AlterTable
ALTER TABLE "vacante" ADD COLUMN     "experiencia_req" INTEGER NOT NULL,
ADD COLUMN     "nivel_educ_req" INTEGER NOT NULL,
ADD COLUMN     "peso_educacion" DECIMAL(5,2) NOT NULL,
ADD COLUMN     "peso_experiencia" DECIMAL(5,2) NOT NULL,
ADD COLUMN     "puntaje_corte" DECIMAL(5,2) NOT NULL;

-- DropTable
DROP TABLE "public"."puesto_habilidad";

-- CreateTable
CREATE TABLE "vacante_habilidad" (
    "id_vacante_habilidad" SERIAL NOT NULL,
    "vacante_id" INTEGER NOT NULL,
    "habilidad_id" INTEGER NOT NULL,
    "nivel_requerido" INTEGER NOT NULL,
    "critica" BOOLEAN NOT NULL DEFAULT false,
    "peso" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "vacante_habilidad_pkey" PRIMARY KEY ("id_vacante_habilidad")
);

-- AddForeignKey
ALTER TABLE "vacante_habilidad" ADD CONSTRAINT "vacante_habilidad_vacante_id_fkey" FOREIGN KEY ("vacante_id") REFERENCES "vacante"("id_vacante") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vacante_habilidad" ADD CONSTRAINT "vacante_habilidad_habilidad_id_fkey" FOREIGN KEY ("habilidad_id") REFERENCES "habilidad"("id_habilidad") ON DELETE RESTRICT ON UPDATE CASCADE;
