import { PrismaClient, tipo_motivacion } from '@prisma/client';

const prisma = new PrismaClient();

export class SistemaExperto {
    /**
     * Recibe las 5 respuestas del cuestionario y devuelve
     * el perfil detectado junto con su id_puesto desde la base de datos.
     */
    async inferirPuesto(
        p1: number, // Resolver acertijos
        p2: number, // Detallista
        p3: number, // Organizar personas
        p4: number, // Aprender tecnología
        p5: string  // Motivación principal
    ): Promise<{ perfil: string; id_puesto: number | null }> {
        let perfil: string | null = null;

        // ----------------------------------------------------------
        // 🔹 Reglas de inferencia
        // ----------------------------------------------------------

        // Programador/a – Desarrollador/a de Software
        if ((p1 === 4 || p1 === 5) && p5 === tipo_motivacion.crear) {
            perfil = 'Programador/a - Desarrollador/a de Software';
        }

        // Analista de Sistemas
        else if (
            [3, 4, 5].includes(p1) &&
            [3, 4, 5].includes(p4) &&
            p5 === tipo_motivacion.crear
        ) {
            perfil = 'Analista de Sistemas';
        }

        // Tester / QA (Aseguramiento de la Calidad)
        else if (
            [4, 5].includes(p2) &&
            p5 === tipo_motivacion.arreglar
        ) {
            perfil = 'Tester / QA (Aseguramiento de la Calidad)';
        }

        // Líder de Proyectos en TI
        else if (
            [4, 5].includes(p3) &&
            p5 === tipo_motivacion.coordinar
        ) {
            perfil = 'Líder de Proyectos en TI';
        }

        // Especialista en Inteligencia Artificial / Ciencia de Datos
        else if (
            [4, 5].includes(p1) &&
            [4, 5].includes(p4) &&
            p5 === tipo_motivacion.crear &&
            [3, 4, 5].includes(p2)
        ) {
            perfil = 'Especialista en IA / Ciencia de Datos';
        }

        // Administrador/a de Sistemas y Redes
        else if (
            [3, 4, 5].includes(p2) &&
            [3, 4, 5].includes(p4) &&
            p5 === tipo_motivacion.arreglar &&
            [1, 2, 3].includes(p3)
        ) {
            perfil = 'Administrador/a de Sistemas y Redes';
        }

        // Si ninguna regla aplica
        else {
            perfil = 'Sin coincidencias claras';
        }

        // ----------------------------------------------------------
        // 🔹 Consulta del ID en la base de datos con Prisma
        // ----------------------------------------------------------
        if (perfil && perfil !== 'Sin coincidencias claras') {
            const puesto = await prisma.puesto.findFirst({
                where: { nombre: perfil },
                select: { id_puesto: true },
            });

            return {
                perfil,
                id_puesto: puesto ? puesto.id_puesto : idPuestoAleatorio(),
            };
        }

        return { perfil, id_puesto: idPuestoAleatorio() };
    }
}

const idPuestoAleatorio = () => {
    const puestos = [1, 2, 3, 4, 5];
    const randomIndex = Math.floor(Math.random() * puestos.length);
    return puestos[randomIndex];
}