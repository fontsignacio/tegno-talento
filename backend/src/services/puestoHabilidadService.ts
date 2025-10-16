import prisma from "../config/db";
import { CreatePuestoHabilidadDTO, UpdatePuestoHabilidadDTO } from "../types/vacanteHabilidad";

export const getAllPuestoHabilidades = async () => {
  return prisma.puesto_habilidad.findMany({
    include: {
      puesto: true,
      habilidad: true
    }
  });
};

export const getPuestoHabilidadById = async (id: number) => {
  return prisma.puesto_habilidad.findUnique({
    where: { id_vacante_habilidad: id },
    include: {
      puesto: true,
      habilidad: true
    }
  });
};

export const getHabilidadesByPuesto = async (puestoId: number) => {
  return prisma.puesto_habilidad.findMany({
    where: { puesto_id: puestoId },
    include: {
      puesto: true,
      habilidad: true
    }
  });
};

export const createPuestoHabilidad = async (data: CreatePuestoHabilidadDTO) => {
  return prisma.puesto_habilidad.create({
    data,
    include: {
      puesto: true,
      habilidad: true
    }
  });
};

export const updatePuestoHabilidad = async (id: number, data: UpdatePuestoHabilidadDTO) => {
  return prisma.puesto_habilidad.update({
    where: { id_vacante_habilidad: id },
    data,
    include: {
      puesto: true,
      habilidad: true
    }
  });
};

export const deletePuestoHabilidad = async (id: number) => {
  return prisma.puesto_habilidad.delete({
    where: { id_vacante_habilidad: id }
  });
};
