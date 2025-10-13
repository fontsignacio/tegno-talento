export interface CreatePuestoDTO {
  nombre: string;
  descripcion?: string;
  peso_experiencia: number;
  peso_educacion: number;
  experiencia_req: number;
  nivel_educ_req: number;
  puntaje_corte: number;
  area_id: number;
}

export interface UpdatePuestoDTO {
  nombre?: string;
  descripcion?: string;
  peso_experiencia?: number;
  peso_educacion?: number;
  experiencia_req?: number;
  nivel_educ_req?: number;
  puntaje_corte?: number;
  area_id?: number;
}

export interface PuestoResponse {
  id_puesto: number;
  nombre: string;
  descripcion?: string;
  peso_experiencia: number;
  peso_educacion: number;
  experiencia_req: number;
  nivel_educ_req: number;
  puntaje_corte: number;
  area_id: number;
  area?: {
    id_area: number;
    nombre: string;
  };
}
