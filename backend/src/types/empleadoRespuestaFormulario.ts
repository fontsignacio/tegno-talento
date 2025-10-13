export type TipoMotivacion = 'crear' | 'arreglar' | 'coordinar';

export interface CreateEmpleadoRespuestaFormularioDTO {
  empleado_id: number;
  disfrute_logica: number;
  detalle: number;
  liderazgo: number;
  curiosidad_tecnologica: number;
  motivacion: TipoMotivacion;
}

export interface UpdateEmpleadoRespuestaFormularioDTO {
  disfrute_logica?: number;
  detalle?: number;
  liderazgo?: number;
  curiosidad_tecnologica?: number;
  motivacion?: TipoMotivacion;
}

export interface EmpleadoRespuestaFormularioResponse {
  id_respuesta: number;
  empleado_id: number;
  fecha_respuesta: Date;
  disfrute_logica: number;
  detalle: number;
  liderazgo: number;
  curiosidad_tecnologica: number;
  motivacion: TipoMotivacion;
  empleado?: {
    id_empleado: number;
    nombre: string;
    correo: string;
  };
}
