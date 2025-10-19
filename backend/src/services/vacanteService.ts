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
    include: {
      vacante_habilidades: true,
    }
  });

  if (!vacante) {
    throw new Error('Vacante no encontrada');
  }

  // Obtener empleados que coincidan con el puesto_id
  const empleados = await prisma.empleado.findMany({
    where: { puesto_id: vacante.puesto_id },
    include: {
      empleado_habilidades: { 
        include: {
          habilidad: true
        }
      }
    }
  });

  const empleadosConPuntaje = empleados.map((emp: any) => ({
    ...emp,
    puntaje: calcularPuntaje(emp, vacante)
  }));

  const internos = empleadosConPuntaje
    .filter((emp: any) => emp.tipo_empleado === 'INTERNO')
    .sort((a: any, b: any) => b.puntaje - a.puntaje);

  const externos = empleadosConPuntaje
    .filter((emp: any) => emp.tipo_empleado === 'EXTERNO')
    .sort((a: any, b: any) => b.puntaje - a.puntaje);

  const top5Internos = internos.slice(0, 5);



  return {
    internos,
    externos,
    top5Internos,
  };
};


const calcularPuntaje = (
  empleado: any,
  vacante: any
): number => {
  // Helper para convertir Prisma.Decimal | string | number a number
  const toNumber = (value: any): number => {
    if (value == null) return 0;
    if (typeof value === 'number') return value;
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  };

  // Bloque experiencia/educaciÃ³n
  const pesoExperiencia = toNumber(vacante.peso_experiencia);
  const pesoEducacion = toNumber(vacante.peso_educacion);
  const sumPesoExpEdu = pesoExperiencia + pesoEducacion;
  const W_E = sumPesoExpEdu > 0 ? pesoExperiencia / sumPesoExpEdu : 0.5; // reparto interno
  const W_ED = sumPesoExpEdu > 0 ? pesoEducacion / sumPesoExpEdu : 0.5;   // reparto interno
  const P_EXP_EDU =
    (W_E * Math.min((toNumber(empleado.experiencia) ?? 0) / (toNumber(vacante.experiencia_req) || 1), 1)) +
    (W_ED * Math.min((toNumber(empleado.nivel_educativo) ?? 0) / (toNumber(vacante.nivel_educ_req) || 1), 1));

  // Bloque habilidades
  let P_HABILIDADES = 0;
  const habilidadesVacante = vacante.vacante_habilidades ?? [];
  const totalPesoHabilidadesRaw = habilidadesVacante.reduce((sum: number, h: any) => sum + toNumber(h.peso), 0);
  const totalPesoHabilidades = totalPesoHabilidadesRaw > 0 ? totalPesoHabilidadesRaw : 1;

  habilidadesVacante.forEach((hVac: any) => {
    const hEmpleado = empleado.empleado_habilidades.find((eh: any) => eh.habilidad_id === hVac.habilidad_id);
    const nivelEmpleado = toNumber(hEmpleado?.nivel_habilidad) ?? 0;
    const nivelRequerido = toNumber(hVac.nivel_requerido) || 1;

    const p = Math.min(nivelEmpleado / nivelRequerido, 1);
    P_HABILIDADES += (toNumber(hVac.peso) / totalPesoHabilidades) * p;
  });

  // Pesos de bloque derivados del modelo: comparar el peso total Exp/Edu vs el total de habilidades
  const pesoBloqueExpEdu = sumPesoExpEdu;
  const pesoBloqueHabilidades = totalPesoHabilidadesRaw;
  const totalBloques = pesoBloqueExpEdu + pesoBloqueHabilidades || 1;
  const W_BLOQUE_EXP_EDU = pesoBloqueExpEdu / totalBloques;
  const W_BLOQUE_HABILIDADES = pesoBloqueHabilidades / totalBloques;

  // Puntaje final normalizado entre 0 y 1
  return W_BLOQUE_EXP_EDU * P_EXP_EDU + W_BLOQUE_HABILIDADES * P_HABILIDADES;
};
