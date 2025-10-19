import * as yup from 'yup';

const vacanteHabilidadSchema = yup.object().shape({
  habilidad_id: yup
    .number()
    .required('La habilidad es obligatoria')
    .positive('ID de habilidad inválido'),
  
  nivel_requerido: yup
    .number()
    .required('El nivel requerido es obligatorio')
    .min(1, 'El nivel mínimo es 1')
    .max(5, 'El nivel máximo es 5')
    .integer('El nivel debe ser un número entero'),
  
  peso: yup
    .number()
    .required('El peso es obligatorio')
    .min(0, 'El peso mínimo es 0')
    .max(100, 'El peso máximo es 100')
    .integer('El peso debe ser un número entero'),
  
  critica: yup
    .boolean()
    .required('El campo crítico es obligatorio'),
});

export const vacancySchema = yup.object().shape({
  puesto_id: yup
    .number()
    .required('El puesto es obligatorio')
    .positive('ID de puesto inválido'),
  
  descripcion: yup
    .string()
    .max(1000, 'La descripción no puede exceder 1000 caracteres'),
  
  fecha_cierre: yup
    .date()
    .nullable()
    .test(
      'is-future',
      'La fecha de cierre debe ser futura',
      function(value) {
        if (!value) return true; // Opcional
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(value) > today;
      }
    ),
  
  experiencia_req: yup
    .number()
    .required('La experiencia requerida es obligatoria')
    .min(0, 'La experiencia no puede ser negativa')
    .max(50, 'La experiencia no puede exceder 50 años')
    .integer('La experiencia debe ser un número entero'),
  
  nivel_educ_req: yup
    .number()
    .required('El nivel educativo requerido es obligatorio')
    .min(1, 'El nivel mínimo es 1')
    .max(5, 'El nivel máximo es 5')
    .integer('El nivel debe ser un número entero'),
  
  peso_experiencia: yup
    .number()
    .required('El peso de experiencia es obligatorio')
    .min(0, 'El peso mínimo es 0')
    .max(1, 'El peso máximo es 1'),
  
  peso_educacion: yup
    .number()
    .required('El peso de educación es obligatorio')
    .min(0, 'El peso mínimo es 0')
    .max(1, 'El peso máximo es 1'),
  
  puntaje_corte: yup
    .number()
    .required('El puntaje de corte es obligatorio')
    .min(0, 'El puntaje mínimo es 0')
    .max(100, 'El puntaje máximo es 100')
    .integer('El puntaje debe ser un número entero'),
  
  vacante_habilidades: yup
    .array()
    .of(vacanteHabilidadSchema)
    .min(1, 'Debe agregar al menos una habilidad requerida')
    .max(20, 'No puede agregar más de 20 habilidades'),
});

export const defaultValues = {
  puesto_id: '',
  descripcion: '',
  fecha_cierre: '',
  experiencia_req: 0,
  nivel_educ_req: 1,
  peso_experiencia: 0.5,
  peso_educacion: 0.5,
  puntaje_corte: 70,
  vacante_habilidades: [],
};
