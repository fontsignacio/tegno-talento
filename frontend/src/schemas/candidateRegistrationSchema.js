import * as yup from 'yup';

export const candidateRegistrationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  lastName: yup
    .string()
    .required('El apellido es obligatorio')
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El apellido solo puede contener letras y espacios'),
  
  email: yup
    .string()
    .required('El email es obligatorio')
    .email('Debe ser un email válido')
    .max(100, 'El email no puede exceder 100 caracteres'),
  
  phone: yup
    .string()
    .required('El teléfono es obligatorio')
    .matches(/^[\d\s\-\+\(\)]+$/, 'El teléfono solo puede contener números y caracteres de formato')
    .min(10, 'El teléfono debe tener al menos 10 dígitos'),
  
  career: yup
    .string()
    .required('La carrera es obligatoria')
    .oneOf(['Ingeniería en Sistemas', 'Diseño Gráfico', 'Administración'], 'Carrera inválida'),
  
  experienceLevel: yup
    .string()
    .required('El nivel de experiencia es obligatorio')
    .oneOf(['Junior', 'Semi-Senior', 'Senior'], 'Nivel de experiencia inválido'),
  
  technicalSkills: yup
    .array()
    .of(yup.string())
    .min(1, 'Debe agregar al menos una habilidad técnica')
    .max(15, 'No puede agregar más de 15 habilidades técnicas'),
  
  softSkills: yup
    .array()
    .of(yup.string())
    .min(1, 'Debe agregar al menos una habilidad blanda')
    .max(10, 'No puede agregar más de 10 habilidades blandas'),
  
  interests: yup
    .string()
    .required('Los intereses son obligatorios')
    .min(10, 'Los intereses deben tener al menos 10 caracteres')
    .max(500, 'Los intereses no pueden exceder 500 caracteres'),
  
  availability: yup
    .string()
    .required('La disponibilidad es obligatoria')
    .oneOf(['inmediata', '1-2 semanas', '1 mes', 'más de 1 mes'], 'Disponibilidad inválida'),
  
  expectedSalary: yup
    .number()
    .required('El salario esperado es obligatorio')
    .min(0, 'El salario no puede ser negativo')
    .max(1000000, 'El salario no puede exceder $1,000,000'),
  
  resume: yup
    .mixed()
    .test('fileSize', 'El archivo es muy grande (máximo 5MB)', (value) => {
      if (!value) return true; // Archivo opcional
      return value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Solo se permiten archivos PDF', (value) => {
      if (!value) return true; // Archivo opcional
      return value.type === 'application/pdf';
    }),
});

export const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  career: '',
  experienceLevel: '',
  technicalSkills: [],
  softSkills: [],
  interests: '',
  availability: '',
  expectedSalary: '',
  resume: null,
};
