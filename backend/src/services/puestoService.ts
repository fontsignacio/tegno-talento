import prisma from "../config/db";
import { CreatePuestoDTO, UpdatePuestoDTO } from "../types/puesto";

export const getAllPuestos = async () => {
  return prisma.puesto.findMany({
    include: {
      area: false
    }
  });
};

export const getPuestoById = async (id: number) => {
  return prisma.puesto.findUnique({
    where: { id_puesto: id },
    include: {
      area: true,
      puesto_habilidades: {
        include: {
          habilidad: true
        }
      }
    }
  });
};

export const createPuesto = async (data: CreatePuestoDTO) => {
  return prisma.puesto.create({
    data,
    include: {
      area: true,
      puesto_habilidades: {
        include: {
          habilidad: true
        }
      }
    }
  });
};

export const updatePuesto = async (id: number, data: UpdatePuestoDTO) => {
  return prisma.puesto.update({
    where: { id_puesto: id },
    data,
    include: {
      area: true,
      puesto_habilidades: {
        include: {
          habilidad: true
        }
      }
    }
  });
};

export const deletePuesto = async (id: number) => {
  return prisma.puesto.delete({
    where: { id_puesto: id }
  });
};
