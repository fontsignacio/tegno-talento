import * as yup from 'yup';

export const profileSearchSchema = yup.object().shape({
  search: yup
    .string()
    .max(100, 'La búsqueda no puede exceder 100 caracteres'),
  
  area: yup
    .string()
    .oneOf(['', 'Tecnología', 'Análisis', 'Diseño', 'Gestión'], 'Área inválida'),
  
  career: yup
    .string()
    .oneOf(['', 'Ingeniería en Sistemas', 'Diseño Gráfico', 'Administración'], 'Carrera inválida'),
  
  experienceLevel: yup
    .string()
    .oneOf(['', 'Junior', 'Semi-Senior', 'Senior'], 'Nivel de experiencia inválido'),
});

export const defaultValues = {
  search: '',
  area: '',
  career: '',
  experienceLevel: '',
};
