import * as yup from 'yup';

export const contactSchema = yup.object().shape({
  name: yup
    .string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),
  
  email: yup
    .string()
    .required('El email es obligatorio')
    .email('Debe ser un email válido')
    .max(100, 'El email no puede exceder 100 caracteres'),
  
  subject: yup
    .string()
    .required('El asunto es obligatorio')
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(100, 'El asunto no puede exceder 100 caracteres'),
  
  message: yup
    .string()
    .required('El mensaje es obligatorio')
    .min(10, 'El mensaje debe tener al menos 10 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
  
  type: yup
    .string()
    .oneOf(['consulta', 'sugerencia', 'problema', 'otro'], 'Tipo de contacto inválido')
    .required('El tipo de contacto es obligatorio'),
});

export const defaultValues = {
  name: '',
  email: '',
  subject: '',
  message: '',
  type: 'consulta',
};
