-- CreateTable
CREATE TABLE "puesto_habilidad" (
    "id_puesto_habilidad" SERIAL NOT NULL,
    "puesto_id" INTEGER NOT NULL,
    "habilidad_id" INTEGER NOT NULL,
    "nivel_requerido" INTEGER NOT NULL,
    "critica" BOOLEAN NOT NULL DEFAULT false,
    "peso" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "puesto_habilidad_pkey" PRIMARY KEY ("id_puesto_habilidad")
);

-- AddForeignKey
ALTER TABLE "puesto_habilidad" ADD CONSTRAINT "puesto_habilidad_puesto_id_fkey" FOREIGN KEY ("puesto_id") REFERENCES "puesto"("id_puesto") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "puesto_habilidad" ADD CONSTRAINT "puesto_habilidad_habilidad_id_fkey" FOREIGN KEY ("habilidad_id") REFERENCES "habilidad"("id_habilidad") ON DELETE RESTRICT ON UPDATE CASCADE;
