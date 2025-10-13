import prisma from "../config/db";
import { CreateAreaDTO, UpdateAreaDTO } from "../types/area";

export const getAllAreas = async () => {
  return prisma.area.findMany({
    include: {
      puestos: true
    }
  });
};

export const getAreaById = async (id: number) => {
  return prisma.area.findUnique({
    where: { id_area: id },
    include: {
      puestos: true
    }
  });
};

export const createArea = async (data: CreateAreaDTO) => {
  return prisma.area.create({
    data,
    include: {
      puestos: true
    }
  });
};

export const updateArea = async (id: number, data: UpdateAreaDTO) => {
  return prisma.area.update({
    where: { id_area: id },
    data,
    include: {
      puestos: true
    }
  });
};

export const deleteArea = async (id: number) => {
  return prisma.area.delete({
    where: { id_area: id }
  });
};
