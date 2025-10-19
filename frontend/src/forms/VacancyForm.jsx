import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Divider,
  Slider,
  FormControlLabel,
  Checkbox,
  Grid,
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Cancel,
  Add,
  Delete,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateVacancyMutation } from '../hooks/useVacanciesQuery';
import { getPuestos, getHabilidades } from '../services/api';
import { vacancySchema, defaultValues } from '../schemas/vacancySchema';

const VacancyForm = () => {
  const navigate = useNavigate();
  const createVacancyMutation = useCreateVacancyMutation();

  const [puestos, setPuestos] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(vacancySchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'vacante_habilidades'
  });

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        const [puestosData, habilidadesData] = await Promise.all([
          getPuestos(),
          getHabilidades()
        ]);
        setPuestos(puestosData);
        setHabilidades(habilidadesData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const onSubmit = async (data) => {
    try {
      await createVacancyMutation.mutateAsync(data);
      navigate('/vacantes');
    } catch (error) {
      console.error('Error creating vacancy:', error);
    }
  };

  const handleCancel = () => {
    reset();
    navigate('/vacantes');
  };

  const addHabilidad = () => {
    append({
      habilidad_id: '',
      nivel_requerido: 1,
      peso: 50,
      critica: false
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/vacantes')}
            sx={{ mb: 2 }}
          >
            Volver a Vacantes
          </Button>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
            Crear Nueva Vacante
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Completa el formulario para crear una nueva oportunidad laboral.
          </Typography>
        </Box>

        {/* Form */}
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Información Básica */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Información Básica
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>

              <Controller
                name="puesto_id"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.puesto_id}>
                    <InputLabel>Puesto</InputLabel>
                    <Select {...field} label="Puesto">
                      {puestos.map((puesto) => (
                        <MenuItem key={puesto.id_puesto} value={puesto.id_puesto}>
                          {puesto.nombre} - {puesto.area?.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.puesto_id && (
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {errors.puesto_id.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />

              <Controller
                name="descripcion"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Descripción (opcional)"
                    multiline
                    rows={4}
                    error={!!errors.descripcion}
                    helperText={errors.descripcion?.message}
                  />
                )}
              />

              <Controller
                name="fecha_cierre"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Fecha de cierre (opcional)"
                    type="date"
                    error={!!errors.fecha_cierre}
                    helperText={errors.fecha_cierre?.message}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />

              {/* Requisitos */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Requisitos
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="experiencia_req"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label="Experiencia requerida (años)"
                        type="number"
                        error={!!errors.experiencia_req}
                        helperText={errors.experiencia_req?.message}
                        required
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="nivel_educ_req"
                    control={control}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.nivel_educ_req}>
                        <InputLabel>Nivel educativo requerido</InputLabel>
                        <Select {...field} label="Nivel educativo requerido">
                          <MenuItem value={1}>Primaria</MenuItem>
                          <MenuItem value={2}>Secundaria</MenuItem>
                          <MenuItem value={3}>Técnico</MenuItem>
                          <MenuItem value={4}>Universitario</MenuItem>
                          <MenuItem value={5}>Postgrado</MenuItem>
                        </Select>
                        {errors.nivel_educ_req && (
                          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                            {errors.nivel_educ_req.message}
                          </Typography>
                        )}
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>

              {/* Pesos de evaluación */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Pesos de Evaluación
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="peso_experiencia"
                    control={control}
                    render={({ field }) => (
                      <Box>
                        <Typography gutterBottom>
                          Peso de experiencia: {field.value}
                        </Typography>
                        <Slider
                          {...field}
                          min={0}
                          max={1}
                          step={0.1}
                          valueLabelDisplay="auto"
                          valueLabelFormat={(value) => `${(value * 100).toFixed(0)}%`}
                        />
                        {errors.peso_experiencia && (
                          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                            {errors.peso_experiencia.message}
                          </Typography>
                        )}
                      </Box>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="peso_educacion"
                    control={control}
                    render={({ field }) => (
                      <Box>
                        <Typography gutterBottom>
                          Peso de educación: {field.value}
                        </Typography>
                        <Slider
                          {...field}
                          min={0}
                          max={1}
                          step={0.1}
                          valueLabelDisplay="auto"
                          valueLabelFormat={(value) => `${(value * 100).toFixed(0)}%`}
                        />
                        {errors.peso_educacion && (
                          <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                            {errors.peso_educacion.message}
                          </Typography>
                        )}
                      </Box>
                    )}
                  />
                </Grid>
              </Grid>

              <Controller
                name="puntaje_corte"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Puntaje de corte (0-100)"
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    error={!!errors.puntaje_corte}
                    helperText={errors.puntaje_corte?.message}
                    required
                  />
                )}
              />

              {/* Habilidades requeridas */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Habilidades Requeridas
                  </Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={addHabilidad}
                  >
                    Agregar Habilidad
                  </Button>
                </Box>
                <Divider sx={{ mb: 3 }} />
              </Box>

              {fields.map((field, index) => (
                <Paper key={field.id} variant="outlined" sx={{ p: 3 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name={`vacante_habilidades.${index}.habilidad_id`}
                        control={control}
                        render={({ field }) => (
                          <FormControl fullWidth error={!!errors.vacante_habilidades?.[index]?.habilidad_id}>
                            <InputLabel>Habilidad</InputLabel>
                            <Select {...field} label="Habilidad">
                              {habilidades.map((habilidad) => (
                                <MenuItem key={habilidad.id_habilidad} value={habilidad.id_habilidad}>
                                  {habilidad.nombre} ({habilidad.tipo})
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Controller
                        name={`vacante_habilidades.${index}.nivel_requerido`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Nivel (1-5)"
                            type="number"
                            inputProps={{ min: 1, max: 5 }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Controller
                        name={`vacante_habilidades.${index}.peso`}
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label="Peso (0-100)"
                            type="number"
                            inputProps={{ min: 0, max: 100 }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Controller
                        name={`vacante_habilidades.${index}.critica`}
                        control={control}
                        render={({ field }) => (
                          <FormControlLabel
                            control={<Checkbox {...field} checked={field.value} />}
                            label="Crítica"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        startIcon={<Delete />}
                        onClick={() => remove(index)}
                        fullWidth
                      >
                        Eliminar
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              ))}

              {/* Actions */}
              <Box>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={isSubmitting}
                    sx={{ minWidth: 120 }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Guardar Vacante'
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Paper>

        {/* Success/Error Messages */}
        {createVacancyMutation.isSuccess && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Vacante creada correctamente.
          </Alert>
        )}

        {createVacancyMutation.isError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Error al crear la vacante. Por favor, intenta de nuevo.
          </Alert>
        )}
      </Container>
    </Box>
  );
};

export default VacancyForm;
