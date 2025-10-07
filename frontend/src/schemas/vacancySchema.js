import * as yup from 'yup';

export const vacancySchema = yup.object().shape({
  title: yup
    .string()
    .required('El título es obligatorio')
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  
  description: yup
    .string()
    .required('La descripción es obligatoria')
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(1000, 'La descripción no puede exceder 1000 caracteres'),
  
  experienceRequired: yup
    .string()
    .required('La experiencia requerida es obligatoria')
    .min(5, 'La experiencia requerida debe tener al menos 5 caracteres')
    .max(200, 'La experiencia requerida no puede exceder 200 caracteres'),
  
  technicalSkills: yup
    .array()
    .of(yup.string())
    .min(1, 'Debe agregar al menos una habilidad técnica')
    .max(20, 'No puede agregar más de 20 habilidades técnicas'),
  
  softSkills: yup
    .array()
    .of(yup.string())
    .min(1, 'Debe agregar al menos una habilidad blanda')
    .max(15, 'No puede agregar más de 15 habilidades blandas'),
  
  type: yup
    .string()
    .oneOf(['interna', 'externa'], 'Tipo de vacante inválido')
    .required('El tipo de vacante es obligatorio'),
  
  closingDate: yup
    .date()
    .required('La fecha de cierre es obligatoria')
    .min(new Date(), 'La fecha de cierre debe ser futura')
    .test(
      'is-future',
      'La fecha de cierre debe ser futura',
      function(value) {
        if (!value) return false;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return new Date(value) > today;
      }
    ),
});

export const defaultValues = {
  title: '',
  description: '',
  experienceRequired: '',
  technicalSkills: [],
  softSkills: [],
  type: 'externa',
  closingDate: '',
};
