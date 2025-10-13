export type TipoEmpleado = 'EXTERNO' | 'INTERNO';

export interface CreateEmpleadoDTO {
  nombre: string;
  correo: string;
  experiencia?: number;
  nivel_educativo?: number;
  puesto_id: number;
  tipo_empleado?: TipoEmpleado;
}

export interface UpdateEmpleadoDTO {
  nombre?: string;
  correo?: string;
  experiencia?: number;
  nivel_educativo?: number;
  puesto_id?: number;
  tipo_empleado?: TipoEmpleado;
}

export interface EmpleadoResponse {
  id_empleado: number;
  nombre: string;
  correo: string;
  experiencia?: number;
  nivel_educativo?: number;
  puesto_id: number;
  tipo_empleado: TipoEmpleado;
  puesto?: {
    id_puesto: number;
    nombre: string;
    descripcion?: string;
  };
}
