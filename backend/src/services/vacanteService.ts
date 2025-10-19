import prisma from "../config/db";
import { CreateVacanteDTO, UpdateVacanteDTO } from "../types/vacante";

export const getAllVacantes = async (filters: { status?: string; tipo_empleado?: string } = {}) => {
  const where: any = {};

  // Filtro por status (derivado de fecha_cierre)
  if (filters.status) {
    const now = new Date();
    if (filters.status === 'activa') {
      where.OR = [
        { fecha_cierre: null },
        { fecha_cierre: { gt: now } }
      ];
    } else if (filters.status === 'cerrada') {
      where.fecha_cierre = { lte: now };
    }
  }

  const vacantes = await prisma.vacante.findMany({
    where,
    include: {
      puesto: {
        include: {
          area: true
        }
      },
      vacante_habilidades: {
        include: {
          habilidad: true
        }
      }
    }
  });

  // Si hay filtro por tipo_empleado, filtrar por empleados que coincidan
  if (filters.tipo_empleado) {
    const vacantesFiltradas = [];
    
    for (const vacante of vacantes) {
      const empleadosCount = await prisma.empleado.count({
        where: { 
          puesto_id: vacante.puesto_id,
          tipo_empleado: filters.tipo_empleado as any
        }
      });
      
      if (empleadosCount > 0) {
        vacantesFiltradas.push(vacante);
      }
    }
    
    return vacantesFiltradas;
  }

  // Agregar datos derivados a cada vacante
  return vacantes.map(vacante => {
    const now = new Date();
    const status = !vacante.fecha_cierre || vacante.fecha_cierre > now ? 'activa' : 'cerrada';
    
    const technicalSkills = vacante.vacante_habilidades
      .filter(vh => vh.habilidad.tipo === 'tecnica')
      .map(vh => vh.habilidad.nombre);

    const softSkills = vacante.vacante_habilidades
      .filter(vh => vh.habilidad.tipo === 'blanda')
      .map(vh => vh.habilidad.nombre);

    return {
      ...vacante,
      status,
      requirements: {
        technical: technicalSkills,
        soft: softSkills
      }
    };
  });
};

export const getVacanteById = async (id: number) => {
  const vacante = await prisma.vacante.findUnique({
    where: { id_vacante: id },
    include: {
      puesto: {
        include: {
          area: true
        }
      },
      vacante_habilidades: {
        include: {
          habilidad: true
        }
      }
    }
  });

  if (!vacante) {
    return null;
  }

  // Contar candidatos (empleados) que coincidan con el puesto
  const candidatesCount = await prisma.empleado.count({
    where: { puesto_id: vacante.puesto_id }
  });

  // Derivar status basado en fecha_cierre
  const now = new Date();
  const status = !vacante.fecha_cierre || vacante.fecha_cierre > now ? 'activa' : 'cerrada';

  // Separar habilidades técnicas y blandas
  const technicalSkills = vacante.vacante_habilidades
    .filter(vh => vh.habilidad.tipo === 'tecnica')
    .map(vh => vh.habilidad.nombre);

  const softSkills = vacante.vacante_habilidades
    .filter(vh => vh.habilidad.tipo === 'blanda')
    .map(vh => vh.habilidad.nombre);

  return {
    ...vacante,
    status,
    candidatesCount,
    requirements: {
      technical: technicalSkills,
      soft: softSkills
    }
  };
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
  const { vacante_habilidades, ...vacanteData } = data;
  
  const vacante = await prisma.vacante.update({
    where: { id_vacante: id },
    data: vacanteData,
    include: {
      puesto: {
        include: {
          area: true
        }
      }
    }
  });

  // Si se proporcionan habilidades, actualizarlas
  if (vacante_habilidades) {
    // Eliminar habilidades existentes
    await prisma.vacante_habilidad.deleteMany({
      where: { vacante_id: id }
    });

    // Crear nuevas habilidades
    if (vacante_habilidades.length > 0) {
      await prisma.vacante_habilidad.createMany({
        data: vacante_habilidades.map(vh => ({
          vacante_id: id,
          habilidad_id: vh.habilidad_id,
          nivel_requerido: vh.nivel_requerido,
          critica: vh.critica || false,
          peso: vh.peso
        }))
      });
    }
  }

  return vacante;
};

export const deleteVacante = async (id: number) => {
  return prisma.vacante.delete({
    where: { id_vacante: id }
  });
};

export const getCandidatosByVacante = async (vacanteId: number) => {
  // Primero obtener la vacante para conseguir el puesto_id
  const vacante = await prisma.vacante.findUnique({
    where: { id_vacante: vacanteId },
    select: { puesto_id: true }
  });

  if (!vacante) {
    throw new Error('Vacante no encontrada');
  }

  // Obtener empleados que coincidan con el puesto_id
  const empleados = await prisma.empleado.findMany({
    where: { puesto_id: vacante.puesto_id },
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

  // Separar en internos y externos, y mezclar aleatoriamente
  const internos = empleados
    .filter(emp => emp.tipo_empleado === 'INTERNO')
    .sort(() => Math.random() - 0.5);
  
  const externos = empleados
    .filter(emp => emp.tipo_empleado === 'EXTERNO')
    .sort(() => Math.random() - 0.5);
    
  const top5Internos = internos.slice(0, 5);

  return {
    internos,
    externos,
    top5Internos,
  };
};