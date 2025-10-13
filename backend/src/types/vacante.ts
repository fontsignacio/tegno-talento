export interface CreateVacanteDTO {
  descripcion?: string;
  fecha_cierre?: Date;
  puesto_id: number;
}

export interface UpdateVacanteDTO {
  descripcion?: string;
  fecha_cierre?: Date;
  puesto_id?: number;
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
  };
}
