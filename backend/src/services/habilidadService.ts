import prisma from "../config/db";
import { CreateHabilidadDTO, UpdateHabilidadDTO } from "../types/habilidad";

export const getAllHabilidades = async () => {
  return prisma.habilidad.findMany();
};

export const getHabilidadById = async (id: number) => {
  return prisma.habilidad.findUnique({
    where: { id_habilidad: id }
  });
};

export const getHabilidadesByTipo = async (tipo: 'tecnica' | 'blanda') => {
  return prisma.habilidad.findMany({
    where: { tipo }
  });
};

export const createHabilidad = async (data: CreateHabilidadDTO) => {
  return prisma.habilidad.create({
    data
  });
};

export const updateHabilidad = async (id: number, data: UpdateHabilidadDTO) => {
  return prisma.habilidad.update({
    where: { id_habilidad: id },
    data
  });
};

export const deleteHabilidad = async (id: number) => {
  return prisma.habilidad.delete({
    where: { id_habilidad: id }
  });
};
