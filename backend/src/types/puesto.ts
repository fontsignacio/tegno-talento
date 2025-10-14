export interface CreatePuestoDTO {
  nombre: string;
  descripcion?: string;
  area_id: number;
}

export interface UpdatePuestoDTO {
  nombre?: string;
  descripcion?: string;
  area_id?: number;
}

export interface PuestoResponse {
  id_puesto: number;
  nombre: string;
  descripcion?: string;
  area_id: number;
  area?: {
    id_area: number;
    nombre: string;
  };
  vacantes?: {
    id_vacante: number;
    descripcion?: string;
    fecha_creacion: Date;
    fecha_cierre?: Date;
    peso_experiencia: number;
    peso_educacion: number;
    experiencia_req: number;
    nivel_educ_req: number;
    puntaje_corte: number;
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
  }[];
}
