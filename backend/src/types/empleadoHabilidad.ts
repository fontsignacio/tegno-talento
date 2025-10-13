export interface CreateEmpleadoHabilidadDTO {
  empleado_id: number;
  habilidad_id: number;
  nivel_habilidad: number;
}

export interface UpdateEmpleadoHabilidadDTO {
  nivel_habilidad?: number;
}

export interface EmpleadoHabilidadResponse {
  id_empleado_habilidad: number;
  empleado_id: number;
  habilidad_id: number;
  nivel_habilidad: number;
  empleado?: {
    id_empleado: number;
    nombre: string;
    correo: string;
  };
  habilidad?: {
    id_habilidad: number;
    nombre: string;
    tipo: string;
  };
}
