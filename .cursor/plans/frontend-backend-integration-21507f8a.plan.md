<!-- 21507f8a-062d-4f45-b3cb-019fb53b35e5 83b5abf1-fc18-42c6-98d0-63da0f912f98 -->
# Plan de Integración Frontend-Backend

## Resumen

Integrar completamente el frontend con el backend real, eliminando mocks y adaptando componentes para usar datos de la base de datos PostgreSQL a través de la API REST. Mantener el diseño UI/UX actual pero adaptar toda la lógica de datos.

## Contexto Técnico

- **Backend**: Express + TypeScript + Prisma + PostgreSQL
- **Frontend**: React + Material-UI + React Query + React Router
- **Base URL API**: `/api/v1`
- **Tablas principales**: empleado (con tipo_empleado: INTERNO/EXTERNO), vacante, puesto, area, habilidad

## Fase 1: Backend - Nuevos Endpoints y Mejoras

### 1.1 Endpoint de candidatos por vacante

**Archivo**: `backend/src/controllers/vacanteController.ts`, `backend/src/services/vacanteService.ts`, `backend/src/routes/vacanteRoutes.ts`

Crear nuevo endpoint `GET /api/v1/vacantes/:id/candidatos` que:

- Obtiene empleados que coincidan con el `puesto_id` de la vacante
- Separa candidatos INTERNOS y EXTERNOS
- Devuelve ambos grupos en orden aleatorio (sin ranking real)
- Incluye datos de empleado + sus habilidades

### 1.2 Mejorar endpoint de vacante por ID

**Archivo**: `backend/src/services/vacanteService.ts`

Modificar `getVacanteById` para incluir:

- Datos completos del puesto relacionado (nombre, descripción)
- Datos del área del puesto
- Habilidades requeridas (técnicas y blandas) desde `vacante_habilidades`
- Derivar campos adicionales: `status` (basado en fecha_cierre), `candidatesCount`

### 1.3 Agregar filtros al endpoint de vacantes

**Archivo**: `backend/src/controllers/vacanteController.ts`, `backend/src/services/vacanteService.ts`

Modificar `GET /api/v1/vacantes` para aceptar query params:

- `status`: 'activa' | 'cerrada' (derivado de fecha_cierre)
- `tipo_empleado`: 'INTERNO' | 'EXTERNO' (para filtrar por tipo de búsqueda)
- Agregar conteo de candidatos por vacante en la respuesta

### 1.4 Endpoint para obtener areas y puestos

**Verificar existencia y funcionalidad**

Asegurar que existen y funcionan:

- `GET /api/v1/areas` - listar todas las áreas
- `GET /api/v1/puestos` - listar todos los puestos
- `GET /api/v1/habilidades` - listar todas las habilidades
- `GET /api/v1/habilidades/tipo/:tipo` - filtrar por tipo (tecnica/blanda)

### 1.5 Mejorar endpoint de empleados

**Archivo**: `backend/src/controllers/empleadoController.ts`, `backend/src/services/empleadoService.ts`

Agregar filtros a `GET /api/v1/empleados`:

- `tipo_empleado`: 'INTERNO' | 'EXTERNO'
- `puesto_id`: filtrar por puesto
- Incluir siempre habilidades del empleado en la respuesta

## Fase 2: Frontend - API Service Layer

### 2.1 Actualizar configuración de API

**Archivo**: `frontend/src/services/api.js`

- Mantener configuración base de axios
- Eliminar todas las importaciones de mocks
- Implementar funciones reales para todas las entidades

### 2.2 Implementar servicios de vacantes

**Archivo**: `frontend/src/services/api.js`

```javascript
// GET /api/v1/vacantes (con filtros opcionales)
export const getVacancies = async (filters = {}) => {
  const response = await api.get('/vacantes', { params: filters });
  return response.data;
};

// GET /api/v1/vacantes/:id
export const getVacancyById = async (id) => {
  const response = await api.get(`/vacantes/${id}`);
  return response.data;
};

// GET /api/v1/vacantes/:id/candidatos
export const getCandidatesByVacancy = async (id) => {
  const response = await api.get(`/vacantes/${id}/candidatos`);
  return response.data;
};

// POST /api/v1/vacantes
export const createVacancy = async (data) => {
  const response = await api.post('/vacantes', data);
  return response.data;
};
```

### 2.3 Implementar servicios de candidatos (empleados)

**Archivo**: `frontend/src/services/api.js`

```javascript
// GET /api/v1/empleados/:id
export const getCandidateById = async (id) => {
  const response = await api.get(`/empleados/${id}`);
  return response.data;
};

// GET /api/v1/empleados (con filtros)
export const getCandidates = async (filters = {}) => {
  const response = await api.get('/empleados', { params: filters });
  return response.data;
};
```

### 2.4 Implementar servicios auxiliares

**Archivo**: `frontend/src/services/api.js`

```javascript
// GET /api/v1/areas
export const getAreas = async () => { ... };

// GET /api/v1/puestos
export const getPuestos = async () => { ... };

// GET /api/v1/habilidades
export const getHabilidades = async () => { ... };

// GET /api/v1/habilidades/tipo/:tipo
export const getHabilidadesByTipo = async (tipo) => { ... };
```

### 2.5 Eliminar archivos de mocks

**Archivos a eliminar**:

- `frontend/src/services/mocks/vacancies.js`
- `frontend/src/services/mocks/candidates.js`
- `frontend/src/services/mocks/profiles.js`
- `frontend/src/services/mocks/index.js`

Mantener solo: `frontend/src/services/mocks/chatbot.js` (para futura integración)

## Fase 3: Frontend - Hooks y Queries

### 3.1 Actualizar hooks de vacantes

**Archivo**: `frontend/src/hooks/useVacanciesQuery.js`

- Adaptar `useVacanciesQuery` para usar el nuevo servicio
- Adaptar `useVacancyQuery` para incluir candidatos
- Actualizar `useCreateVacancyMutation` para el nuevo formato de datos

### 3.2 Actualizar hooks de candidatos

**Archivo**: `frontend/src/hooks/useCandidatesQuery.js`

- Adaptar para usar servicios de empleados
- Transformar respuesta del backend al formato esperado por componentes

### 3.3 Actualizar hooks de perfiles

**Archivo**: `frontend/src/hooks/useProfilesQuery.js`

- Ya usa la API real, verificar que funcione correctamente
- Adaptar transformaciones si es necesario

## Fase 4: Frontend - Componentes

### 4.1 Actualizar VacancyCard

**Archivo**: `frontend/src/components/VacancyCard/VacancyCard.jsx`

Adaptar para mostrar:

- `puesto.nombre` como título (en lugar de `title`)
- `descripcion` del puesto o vacante
- Status derivado de `fecha_cierre`
- `candidatesCount` desde el backend
- Eliminar campos que no existen en el backend

### 4.2 Actualizar CandidateCard

**Archivo**: `frontend/src/components/CandidateCard/CandidateCard.jsx`

Adaptar para mostrar:

- Datos de empleado: `nombre`, `correo`
- Habilidades desde `empleado_habilidades`
- Puesto actual desde `puesto.nombre`
- Eliminar: phone, location, availability, suitabilityPercentage (o mostrar valor fijo)

### 4.3 Actualizar ProfileCard

**Archivo**: `frontend/src/components/ProfileCard/ProfileCard.jsx`

Verificar que use correctamente los datos del backend (ya implementado en profileService)

## Fase 5: Frontend - Páginas

### 5.1 Rediseñar Vacancies

**Archivo**: `frontend/src/pages/Vacancies/Vacancies.jsx`

- Adaptar estadísticas para usar datos reales
- Implementar filtros de status (activa/cerrada)
- Adaptar cards para mostrar información del backend
- Actualizar tabla para campos del backend

### 5.2 Rediseñar VacancyDetail

**Archivo**: `frontend/src/pages/VacancyDetail/VacancyDetail.jsx`

- Usar endpoint `/api/v1/vacantes/:id/candidatos`
- Mostrar candidatos internos y externos separadamente
- Adaptar cards de candidatos a estructura real del backend
- Habilidades desde `vacante_habilidades`
- Eliminar: suitabilityPercentage, appliedAt (o valores por defecto)

### 5.3 Rediseñar CandidateDetail

**Archivo**: `frontend/src/pages/CandidateDetail/CandidateDetail.jsx`

Adaptar para mostrar solo campos del backend:

- Información básica: nombre, correo, tipo_empleado
- Puesto actual y área
- Habilidades técnicas y blandas (desde empleado_habilidades)
- Experiencia (años) y nivel_educativo
- **Eliminar**: phone, location, availability, interests, experience (array), appliedAt, suitabilityPercentage

### 5.4 Verificar Profiles y ProfileDetail

**Archivos**: `frontend/src/pages/Profiles/Profiles.jsx`, `frontend/src/pages/ProfileDetail/ProfileDetail.jsx`

Ya usan la API real, verificar y ajustar si es necesario.

## Fase 6: Frontend - Formularios

### 6.1 Rediseñar VacancyForm completamente

**Archivo**: `frontend/src/forms/VacancyForm.jsx`

Nuevo diseño del formulario:

1. **Selección de Puesto** (dropdown con puestos existentes)
2. **Descripción** (textarea opcional)
3. **Fecha de cierre** (date picker)
4. **Requisitos de experiencia y educación**:

   - experiencia_req (años - number)
   - nivel_educ_req (1-5 - select)

5. **Pesos de evaluación**:

   - peso_experiencia (0-1, slider o number)
   - peso_educacion (0-1, slider o number)

6. **Puntaje de corte** (0-100, number)
7. **Habilidades requeridas**:

   - Selector múltiple de habilidades existentes
   - Para cada habilidad: nivel_requerido (1-5), peso (0-100), crítica (checkbox)

### 6.2 Actualizar schema de validación

**Archivo**: `frontend/src/schemas/vacancySchema.js`

Reescribir para validar estructura del backend:

```javascript
{
  puesto_id: number,
  descripcion: string (opcional),
  fecha_cierre: date (opcional),
  experiencia_req: number,
  nivel_educ_req: number (1-5),
  peso_experiencia: number (0-1),
  peso_educacion: number (0-1),
  puntaje_corte: number,
  vacante_habilidades: array de {
    habilidad_id: number,
    nivel_requerido: number (1-5),
    peso: number (0-100),
    critica: boolean
  }
}
```

### 6.3 Eliminar formularios innecesarios

Verificar si se usan, si no, eliminar:

- `frontend/src/forms/CandidateRegistrationForm.jsx` (si no se usa)
- `frontend/src/forms/ContactForm.jsx` (si no se usa)

## Fase 7: Testing y Ajustes Finales

### 7.1 Pruebas de integración

- Verificar flujo completo: listar vacantes → ver detalle → ver candidatos
- Verificar creación de vacante con el nuevo formulario
- Probar filtros en vacantes
- Verificar perfiles y su búsqueda

### 7.2 Ajustes de UI/UX

- Asegurar que mensajes de error sean informativos
- Verificar estados de carga en todos los componentes
- Ajustar diseño donde los datos del backend no encajen perfectamente
- Agregar placeholders/valores por defecto donde sea necesario

### 7.3 Limpieza final

- Eliminar código comentado
- Eliminar imports no utilizados
- Verificar que no queden referencias a mocks (excepto chatbot)
- Actualizar mensajes de usuario para reflejar terminología correcta

## Notas Importantes

1. **Mantener chatbot intacto**: No eliminar `frontend/src/services/mocks/chatbot.js` ni componentes relacionados
2. **Terminología**: En frontend usar "Candidatos" aunque en backend sean "Empleados"
3. **Ranking ficticio**: Los candidatos se muestran en orden aleatorio pero la UI los presenta como ranqueados
4. **Sin campos inexistentes**: Eliminar del frontend todos los campos que no existen en el backend
5. **Estilos**: Mantener todos los estilos, componentes Material-UI y diseño actual
6. **Endpoints existentes**: No eliminar endpoints actuales, solo agregar nuevos

### To-dos

- [ ] Crear endpoint GET /api/v1/vacantes/:id/candidatos que retorne empleados internos y externos por puesto_id
- [ ] Mejorar getVacanteById para incluir status derivado, candidatesCount, y datos completos del puesto
- [ ] Agregar filtros status y tipo_empleado al endpoint GET /api/v1/vacantes
- [ ] Agregar filtros tipo_empleado y puesto_id al endpoint GET /api/v1/empleados
- [ ] Reescribir frontend/src/services/api.js para usar endpoints reales y eliminar mocks
- [ ] Eliminar archivos de mocks (vacancies, candidates, profiles, index.js) manteniendo chatbot
- [ ] Actualizar hooks (useVacanciesQuery, useCandidatesQuery) para usar nuevos servicios
- [ ] Adaptar VacancyCard y CandidateCard para mostrar datos del backend
- [ ] Rediseñar página Vacancies para usar datos reales con filtros
- [ ] Rediseñar VacancyDetail para usar endpoint de candidatos y mostrar datos reales
- [ ] Adaptar CandidateDetail eliminando campos inexistentes y mostrando solo datos del backend
- [ ] Rediseñar completamente VacancyForm para crear vacantes con estructura del backend
- [ ] Reescribir vacancySchema para validar estructura del backend
- [ ] Probar flujo completo de vacantes y candidatos, verificar filtros y formularios
- [ ] Limpieza final: eliminar código no usado, imports innecesarios, verificar mensajes de usuario