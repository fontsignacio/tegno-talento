export interface CreatePuestoHabilidadDTO {
  puesto_id: number;
  habilidad_id: number;
  nivel_requerido: number;
  critica: boolean;
  peso: number;
}

export interface UpdatePuestoHabilidadDTO {
  puesto_id?: number;
  habilidad_id?: number;
  nivel_requerido?: number;
  critica?: boolean;
  peso?: number;
}
