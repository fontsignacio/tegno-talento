import prisma from "../config/db";
import { CreateEmpleadoRespuestaFormularioDTO, UpdateEmpleadoRespuestaFormularioDTO } from "../types/empleadoRespuestaFormulario";

export const getAllEmpleadoRespuestasFormulario = async () => {
  return prisma.empleado_respuesta_formulario.findMany({
    include: {
      empleado: true
    }
  });
};

export const getEmpleadoRespuestaFormularioById = async (id: number) => {
  return prisma.empleado_respuesta_formulario.findUnique({
    where: { id_respuesta: id },
    include: {
      empleado: true
    }
  });
};

export const getRespuestasByEmpleado = async (empleadoId: number) => {
  return prisma.empleado_respuesta_formulario.findMany({
    where: { empleado_id: empleadoId },
    include: {
      empleado: true
    }
  });
};

export const createEmpleadoRespuestaFormulario = async (data: CreateEmpleadoRespuestaFormularioDTO) => {
  return prisma.empleado_respuesta_formulario.create({
    data,
    include: {
      empleado: true
    }
  });
};

export const updateEmpleadoRespuestaFormulario = async (id: number, data: UpdateEmpleadoRespuestaFormularioDTO) => {
  return prisma.empleado_respuesta_formulario.update({
    where: { id_respuesta: id },
    data,
    include: {
      empleado: true
    }
  });
};

export const deleteEmpleadoRespuestaFormulario = async (id: number) => {
  return prisma.empleado_respuesta_formulario.delete({
    where: { id_respuesta: id }
  });
};
