export interface CreatePuestoHabilidadDTO {
  puesto_id: number;
  habilidad_id: number;
  nivel_requerido: number;
  critica?: boolean;
  peso: number;
}

export interface UpdatePuestoHabilidadDTO {
  nivel_requerido?: number;
  critica?: boolean;
  peso?: number;
}

export interface PuestoHabilidadResponse {
  id_vacante_habilidad: number;
  puesto_id: number;
  habilidad_id: number;
  nivel_requerido: number;
  critica: boolean;
  peso: number;
  puesto?: {
    id_puesto: number;
    nombre: string;
  };
  habilidad?: {
    id_habilidad: number;
    nombre: string;
    tipo: string;
  };
}
