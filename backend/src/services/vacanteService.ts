import prisma from "../config/db";
import { CreateVacanteDTO, UpdateVacanteDTO } from "../types/vacante";

export const getAllVacantes = async () => {
  return prisma.vacante.findMany({
    include: {
      puesto: {
        include: {
          area: true
        }
      }
    }
  });
};

export const getVacanteById = async (id: number) => {
  return prisma.vacante.findUnique({
    where: { id_vacante: id },
    include: {
      puesto: {
        include: {
          area: true
        }
      }
    }
  });
};

export const getVacantesByPuesto = async (puestoId: number) => {
  return prisma.vacante.findMany({
    where: { puesto_id: puestoId },
    include: {
      puesto: {
        include: {
          area: true
        }
      }
    }
  });
};

export const getVacantesActivas = async () => {
  const now = new Date();
  return prisma.vacante.findMany({
    where: {
      OR: [
        { fecha_cierre: null },
        { fecha_cierre: { gt: now } }
      ]
    },
    include: {
      puesto: {
        include: {
          area: true
        }
      }
    }
  });
};

export const createVacante = async (data: CreateVacanteDTO) => {
  const {
    descripcion,
    puesto_id,
    peso_experiencia,
    peso_educacion,
    experiencia_req,
    nivel_educ_req,
    puntaje_corte,
    fecha_cierre,
    vacante_habilidades,
  } = data;

  try {
    const vacante = await prisma.vacante.create({
      data: {
        descripcion,
        puesto_id,
        peso_experiencia,
        peso_educacion,
        experiencia_req,
        nivel_educ_req,
        puntaje_corte,
        fecha_cierre: fecha_cierre ? new Date(fecha_cierre) : null,
        vacante_habilidades: {
          create: vacante_habilidades?.map((h) => ({
            habilidad_id: h.habilidad_id,
            nivel_requerido: h.nivel_requerido,
            critica: h.critica,
            peso: h.peso,
          })),
        },
      },
      include: {
        puesto: {
          include: {
            area: true,
          },
        },
        vacante_habilidades: {
          include: {
            habilidad: true,
          },
        },
      },
    });

    // Preparar la respuesta filtrando solo los campos necesarios
    return {
      message: "Vacante creada correctamente",
      data: {
        puesto: vacante.puesto.nombre,
        id_vacante: vacante.id_vacante,
        peso_experiencia: vacante.peso_experiencia,
        peso_educacion: vacante.peso_educacion,
        experiencia_req: vacante.experiencia_req,
        nivel_educ_req: vacante.nivel_educ_req,
        puntaje_corte: vacante.puntaje_corte,
        descripcion: vacante.descripcion,
        fecha_creacion: vacante.fecha_creacion,
        fecha_cierre: vacante.fecha_cierre,
        vacante_habilidades: vacante.vacante_habilidades.map((vh) => ({
          nombre: vh.habilidad.nombre,
          tipo: vh.habilidad.tipo,
          nivel_requerido: vh.nivel_requerido,
          critica: vh.critica,
          peso: vh.peso,
        })),
      },
    };
  } catch (error: any) {
    console.error("Error creando vacante:", error);
    throw new Error("No se pudo crear la vacante: " + (error.message || "Error interno"));
  }
};



export const updateVacante = async (id: number, data: UpdateVacanteDTO) => {
  return prisma.vacante.update({
    where: { id_vacante: id },
    data,
    include: {
      puesto: {
        include: {
          area: true
        }
      }
    }
  });
};

export const deleteVacante = async (id: number) => {
  return prisma.vacante.delete({
    where: { id_vacante: id }
  });
};
