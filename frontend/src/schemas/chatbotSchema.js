import * as yup from 'yup';

export const chatbotSchema = yup.object().shape({
  message: yup
    .string()
    .required('El mensaje es obligatorio')
    .min(1, 'El mensaje no puede estar vacío')
    .max(500, 'El mensaje no puede exceder 500 caracteres')
    .trim(),
});

export const defaultValues = {
  message: '',
};
