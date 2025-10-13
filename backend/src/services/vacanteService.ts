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
  return prisma.vacante.create({
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
