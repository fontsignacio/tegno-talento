import prisma from "../config/db";
import { CreateEmpleadoDTO, UpdateEmpleadoDTO } from "../types/empleado";

export const getAllEmpleados = async () => {
  return prisma.empleado.findMany({
    include: {
      puesto: {
        include: {
          area: true
        }
      },
      empleado_habilidades: {
        include: {
          habilidad: true
        }
      }
    }
  });
};

export const getEmpleadoById = async (id: number) => {
  return prisma.empleado.findUnique({
    where: { id_empleado: id },
    include: {
      puesto: {
        include: {
          area: true
        }
      },
      empleado_habilidades: {
        include: {
          habilidad: true
        }
      }
    }
  });
};

export const getEmpleadosByPuesto = async (puestoId: number) => {
  return prisma.empleado.findMany({
    where: { puesto_id: puestoId },
    include: {
      puesto: {
        include: {
          area: true
        }
      },
      empleado_habilidades: {
        include: {
          habilidad: true
        }
      }
    }
  });
};

export const createEmpleado = async (data: CreateEmpleadoDTO) => {
  return prisma.empleado.create({
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

export const updateEmpleado = async (id: number, data: UpdateEmpleadoDTO) => {
  return prisma.empleado.update({
    where: { id_empleado: id },
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

export const deleteEmpleado = async (id: number) => {
  return prisma.empleado.delete({
    where: { id_empleado: id }
  });
};
