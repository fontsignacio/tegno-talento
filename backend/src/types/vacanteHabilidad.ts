export interface CreateVacanteHabilidadDTO {
  vacante_id: number;
  habilidad_id: number;
  nivel_requerido: number; // 1 a 5
  critica?: boolean;       // opcional, default false
  peso: number;            // 0 a 100
}

export interface UpdateVacanteHabilidadDTO {
  nivel_requerido?: number;
  critica?: boolean;
  peso?: number;
}

export interface VacanteHabilidadResponse {
  id_vacante_habilidad: number;
  vacante_id: number;
  habilidad_id: number;
  nivel_requerido: number;
  critica: boolean;
  peso: number;
  vacante?: {
    id_vacante: number;
    descripcion?: string;
  };
  habilidad?: {
    id_habilidad: number;
    nombre: string;
    tipo: "tecnica" | "blanda";
  };
}
