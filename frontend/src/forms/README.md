# Formularios con React Hook Form + Yup

Este directorio contiene todos los formularios del sistema implementados con **React Hook Form** y **Yup** para validaciones.

## Estructura

```
src/
├── schemas/           # Schemas de validación con Yup
│   ├── vacancySchema.js
│   ├── profileSearchSchema.js
│   ├── chatbotSchema.js
│   ├── contactSchema.js
│   └── candidateRegistrationSchema.js
└── forms/            # Componentes de formularios
    ├── VacancyForm.jsx
    ├── ProfileSearchForm.jsx
    ├── ContactForm.jsx
    ├── CandidateRegistrationForm.jsx
    └── README.md
```

## Formularios Implementados

### 1. VacancyForm
- **Propósito**: Crear nuevas vacantes laborales
- **Schema**: `vacancySchema.js`
- **Características**:
  - Validación de campos obligatorios
  - Gestión dinámica de habilidades técnicas y blandas
  - Validación de fechas futuras
  - Integración con React Query para mutaciones

### 2. ProfileSearchForm
- **Propósito**: Búsqueda y filtrado de perfiles
- **Schema**: `profileSearchSchema.js`
- **Características**:
  - Filtros múltiples (área, carrera, experiencia)
  - Búsqueda por texto
  - Chips para mostrar filtros activos
  - Limpieza de filtros

### 3. ContactForm
- **Propósito**: Formulario de contacto y feedback
- **Schema**: `contactSchema.js`
- **Características**:
  - Validación de email
  - Tipos de contacto predefinidos
  - Mensaje de confirmación
  - Información de contacto adicional

### 4. CandidateRegistrationForm
- **Propósito**: Registro de nuevos candidatos
- **Schema**: `candidateRegistrationSchema.js`
- **Características**:
  - Información personal y profesional
  - Gestión de habilidades técnicas y blandas
  - Subida de archivos (CV)
  - Validación de salario esperado

### 5. Chatbot (Integrado)
- **Propósito**: Interfaz de chat con validación
- **Schema**: `chatbotSchema.js`
- **Características**:
  - Validación de mensajes
  - Estado de escritura
  - Manejo de errores

## Patrones de Implementación

### Schema de Validación
```javascript
import * as yup from 'yup';

export const exampleSchema = yup.object().shape({
  field: yup
    .string()
    .required('El campo es obligatorio')
    .min(2, 'Mínimo 2 caracteres')
    .max(50, 'Máximo 50 caracteres'),
});

export const defaultValues = {
  field: '',
};
```

### Componente de Formulario
```javascript
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { exampleSchema, defaultValues } from '../schemas/exampleSchema';

const ExampleForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(exampleSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    // Lógica de envío
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="field"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            error={!!errors.field}
            helperText={errors.field?.message}
          />
        )}
      />
    </form>
  );
};
```

## Características Comunes

### Validaciones
- **Campos obligatorios**: Todos los campos requeridos tienen validación
- **Longitud**: Límites mínimos y máximos para textos
- **Formato**: Validación de email, teléfono, etc.
- **Archivos**: Validación de tipo y tamaño de archivos

### UX/UI
- **Estados de carga**: Indicadores visuales durante el envío
- **Mensajes de error**: Feedback claro y específico
- **Mensajes de éxito**: Confirmación de acciones exitosas
- **Responsive**: Adaptación a diferentes tamaños de pantalla

### Integración
- **React Query**: Mutaciones y cache de datos
- **Material-UI**: Componentes consistentes
- **Flexbox**: Layouts responsivos sin Grid

## Uso

### Importar un formulario
```javascript
import VacancyForm from '../forms/VacancyForm';
import ContactForm from '../forms/ContactForm';
```

### Usar en una página
```javascript
const VacancyFormPage = () => {
  return <VacancyForm />;
};
```

### Personalizar validaciones
```javascript
// En el schema
const customSchema = yup.object().shape({
  customField: yup
    .string()
    .test('custom-validation', 'Mensaje de error', (value) => {
      // Lógica de validación personalizada
      return value && value.length > 0;
    }),
});
```

## Beneficios

1. **Validación robusta**: Yup proporciona validaciones potentes y reutilizables
2. **Performance**: React Hook Form minimiza re-renders
3. **Mantenibilidad**: Código organizado y separado por responsabilidades
4. **UX mejorada**: Feedback inmediato y estados de carga
5. **Consistencia**: Patrones uniformes en todos los formularios
6. **Flexibilidad**: Fácil personalización y extensión

## Próximos Pasos

- [ ] Agregar validación de archivos más robusta
- [ ] Implementar formularios de edición
- [ ] Agregar validación en tiempo real
- [ ] Crear hooks personalizados para formularios comunes
- [ ] Implementar tests unitarios para formularios
