export type TipoHabilidad = 'tecnica' | 'blanda';

export interface CreateHabilidadDTO {
  nombre: string;
  tipo: TipoHabilidad;
}

export interface UpdateHabilidadDTO {
  nombre?: string;
  tipo?: TipoHabilidad;
}

export interface HabilidadResponse {
  id_habilidad: number;
  nombre: string;
  tipo: TipoHabilidad;
}
