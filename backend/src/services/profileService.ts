import { tipo_empleado } from "@prisma/client";
import prisma from "../config/db";

export type ProfileFilters = {
  area?: string;
  experienceLevel?: string;
  search?: string;
};

function mapExperienceLevel(experienciaReq?: number | null): "Junior" | "Semi-Senior" | "Senior" {
  if (!experienciaReq || experienciaReq <= 2) return "Junior";
  if (experienciaReq <= 5) return "Semi-Senior";
  return "Senior";
}

export const getProfiles = async (filters: ProfileFilters = {}) => {
  const puestos = await prisma.puesto.findMany({
    include: {
      area: true,
      vacantes: {
        include: {
          vacante_habilidades: {
            include: { habilidad: true }
          }
        },
        orderBy: { fecha_creacion: "desc" }
      }
    }
  });

  const mapped = puestos.map(p => {
    const latestVacante = p.vacantes[0];
    const experienciaReq = latestVacante?.experiencia_req ?? null;
    
    // Separar habilidades técnicas y blandas
    const technicalSkills = latestVacante?.vacante_habilidades
      ?.filter(vh => vh.habilidad.tipo === 'tecnica')
      ?.map(vh => vh.habilidad.nombre) ?? [];
    
    const softSkills = latestVacante?.vacante_habilidades
      ?.filter(vh => vh.habilidad.tipo === 'blanda')
      ?.map(vh => vh.habilidad.nombre) ?? [];
    
    return {
      id: p.id_puesto,
      name: p.nombre,
      description: p.descripcion ?? "",
      career: p.area?.nombre ?? "",
      area: p.area?.nombre ?? "",
      experienceLevel: mapExperienceLevel(experienciaReq),
      requirements: {
        technical: technicalSkills,
        soft: softSkills
      },
      benefits: [],
      createdAt: latestVacante?.fecha_creacion ?? new Date(),
    };
  });

  let filtered = mapped;
  if (filters.area) {
    const term = filters.area.toLowerCase();
    filtered = filtered.filter(p => p.area.toLowerCase().includes(term));
  }
  if (filters.experienceLevel) {
    filtered = filtered.filter(p => p.experienceLevel === filters.experienceLevel);
  }
  if (filters.search) {
    const term = filters.search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
  }

  return filtered;
};

export const getProfileById = async (id: number) => {
  const puesto = await prisma.puesto.findUnique({
    where: { id_puesto: id },
    include: {
      area: true,
      vacantes: {
        include: {
          vacante_habilidades: { include: { habilidad: true } }
        },
        orderBy: { fecha_creacion: "desc" }
      }
    }
  });

  if (!puesto) return null;
  
  const matchingCandidates = await prisma.empleado.findMany({
    where: {
      puesto_id: puesto.id_puesto,
      tipo_empleado: tipo_empleado.EXTERNO
    },
    include: {
      puesto: true,
    }
  });

  const latestVacante = puesto.vacantes[0];
  const experienciaReq = latestVacante?.experiencia_req ?? null;
  
  // Separar habilidades técnicas y blandas
  const technicalSkills = latestVacante?.vacante_habilidades
    ?.filter(vh => vh.habilidad.tipo === 'tecnica')
    ?.map(vh => vh.habilidad.nombre) ?? [];
  
  const softSkills = latestVacante?.vacante_habilidades
    ?.filter(vh => vh.habilidad.tipo === 'blanda')
    ?.map(vh => vh.habilidad.nombre) ?? [];

  const profile = {
    id: puesto.id_puesto,
    name: puesto.nombre,
    description: puesto.descripcion ?? "",
    career: puesto.area?.nombre ?? "",
    area: puesto.area?.nombre ?? "",
    experienceLevel: mapExperienceLevel(experienciaReq),
    requirements: {
      technical: technicalSkills,
      soft: softSkills
    },
    benefits: [],
    createdAt: latestVacante?.fecha_creacion ?? new Date(),
    matchingCandidates,
  };

  return profile;
};


