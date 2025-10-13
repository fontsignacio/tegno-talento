import prisma from "../config/db";
import { CreateEmpleadoHabilidadDTO, UpdateEmpleadoHabilidadDTO } from "../types/empleadoHabilidad";

export const getAllEmpleadoHabilidades = async () => {
  return prisma.empleado_habilidad.findMany({
    include: {
      empleado: true,
      habilidad: true
    }
  });
};

export const getEmpleadoHabilidadById = async (id: number) => {
  return prisma.empleado_habilidad.findUnique({
    where: { id_empleado_habilidad: id },
    include: {
      empleado: true,
      habilidad: true
    }
  });
};

export const getHabilidadesByEmpleado = async (empleadoId: number) => {
  return prisma.empleado_habilidad.findMany({
    where: { empleado_id: empleadoId },
    include: {
      empleado: true,
      habilidad: true
    }
  });
};

export const createEmpleadoHabilidad = async (data: CreateEmpleadoHabilidadDTO) => {
  return prisma.empleado_habilidad.create({
    data,
    include: {
      empleado: true,
      habilidad: true
    }
  });
};

export const updateEmpleadoHabilidad = async (id: number, data: UpdateEmpleadoHabilidadDTO) => {
  return prisma.empleado_habilidad.update({
    where: { id_empleado_habilidad: id },
    data,
    include: {
      empleado: true,
      habilidad: true
    }
  });
};

export const deleteEmpleadoHabilidad = async (id: number) => {
  return prisma.empleado_habilidad.delete({
    where: { id_empleado_habilidad: id }
  });
};
