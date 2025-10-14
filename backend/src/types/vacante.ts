export interface VacanteHabilidadDTO {
  habilidad_id: number;
  nivel_requerido: number; // 1 a 5
  critica?: boolean;       // opcional, default false
  peso: number;            // 0 a 100
}

export interface CreateVacanteDTO {
  descripcion?: string;
  fecha_cierre?: Date;
  puesto_id: number;
  peso_experiencia: number; // 0 a 1
  peso_educacion: number;   // 0 a 1
  experiencia_req: number;  // años de experiencia
  nivel_educ_req: number;   // 1 a 5
  puntaje_corte: number;    // puntaje mínimo
  vacante_habilidades?: VacanteHabilidadDTO[];
}

export interface UpdateVacanteDTO {
  descripcion?: string;
  fecha_cierre?: Date;
  puesto_id?: number;
  peso_experiencia?: number;
  peso_educacion?: number;
  experiencia_req?: number;
  nivel_educ_req?: number;
  puntaje_corte?: number;
  vacante_habilidades?: VacanteHabilidadDTO[];
}

export interface VacanteResponse {
  id_vacante: number;
  descripcion?: string;
  fecha_creacion: Date;
  fecha_cierre?: Date;
  puesto_id: number;
  puesto?: {
    id_puesto: number;
    nombre: string;
    descripcion?: string;
    area?: {
      id_area: number;
      nombre: string;
    };
  };
  vacante_habilidades?: {
    id_vacante_habilidad: number;
    nivel_requerido: number;
    critica: boolean;
    peso: number;
    habilidad: {
      id_habilidad: number;
      nombre: string;
      tipo: "tecnica" | "blanda";
    };
  }[];
}
