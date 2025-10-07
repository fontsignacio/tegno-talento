import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Cancel,
  Add,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCreateVacancyMutation } from '../hooks/useVacanciesQuery';
import { vacancySchema, defaultValues } from '../schemas/vacancySchema';

const VacancyForm = () => {
  const navigate = useNavigate();
  const createVacancyMutation = useCreateVacancyMutation();

  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(vacancySchema),
    defaultValues,
  });

  const technicalSkills = watch('technicalSkills') || [];
  const softSkills = watch('softSkills') || [];

  const technicalSkillsOptions = [
    'React', 'Vue.js', 'Angular', 'JavaScript', 'TypeScript', 'Python', 'Java',
    'C#', 'PHP', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot',
    'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Git', 'Docker', 'AWS',
    'Azure', 'Linux', 'Windows', 'macOS', 'Figma', 'Adobe XD', 'Sketch'
  ];

  const softSkillsOptions = [
    'Comunicación', 'Trabajo en equipo', 'Liderazgo', 'Resolución de problemas',
    'Pensamiento crítico', 'Adaptabilidad', 'Creatividad', 'Empatía',
    'Gestión del tiempo', 'Organización', 'Proactividad', 'Aprendizaje continuo',
    'Negociación', 'Mentoría', 'Colaboración', 'Flexibilidad'
  ];

  const handleAddTechnicalSkill = () => {
    if (newTechnicalSkill.trim() && !technicalSkills.includes(newTechnicalSkill.trim())) {
      setValue('technicalSkills', [...technicalSkills, newTechnicalSkill.trim()]);
      setNewTechnicalSkill('');
    }
  };

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim() && !softSkills.includes(newSoftSkill.trim())) {
      setValue('softSkills', [...softSkills, newSoftSkill.trim()]);
      setNewSoftSkill('');
    }
  };

  const handleRemoveTechnicalSkill = (skillToRemove) => {
    setValue('technicalSkills', technicalSkills.filter(skill => skill !== skillToRemove));
  };

  const handleRemoveSoftSkill = (skillToRemove) => {
    setValue('softSkills', softSkills.filter(skill => skill !== skillToRemove));
  };

  const onSubmit = async (data) => {
    try {
      await createVacancyMutation.mutateAsync({
        ...data,
        requirements: {
          technical: data.technicalSkills,
          soft: data.softSkills,
        },
      });
      
      navigate('/vacantes');
    } catch (error) {
      console.error('Error creating vacancy:', error);
    }
  };

  const handleCancel = () => {
    reset();
    navigate('/vacantes');
  };

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
              {/* Basic Information */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Información Básica
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>

              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Título del puesto"
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    required
                  />
                )}
              />

              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Descripción del puesto"
                    multiline
                    rows={4}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    required
                  />
                )}
              />

              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3
              }}>
                <Controller
                  name="experienceRequired"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Experiencia requerida"
                      error={!!errors.experienceRequired}
                      helperText={errors.experienceRequired?.message}
                      placeholder="Ej: 2-3 años en desarrollo frontend"
                      required
                    />
                  )}
                />

                <Controller
                  name="closingDate"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Fecha de cierre"
                      type="date"
                      error={!!errors.closingDate}
                      helperText={errors.closingDate?.message}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  )}
                />
              </Box>

              {/* Type */}
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl component="fieldset" error={!!errors.type}>
                    <FormLabel component="legend">Tipo de vacante</FormLabel>
                    <RadioGroup
                      {...field}
                      row
                    >
                      <FormControlLabel
                        value="interna"
                        control={<Radio />}
                        label="Interna"
                      />
                      <FormControlLabel
                        value="externa"
                        control={<Radio />}
                        label="Externa"
                      />
                    </RadioGroup>
                    {errors.type && (
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {errors.type.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />

              {/* Technical Skills */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Habilidades Técnicas Requeridas
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Agregar habilidad técnica"
                    value={newTechnicalSkill}
                    onChange={(e) => setNewTechnicalSkill(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTechnicalSkill();
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleAddTechnicalSkill}
                    disabled={!newTechnicalSkill.trim()}
                  >
                    Agregar
                  </Button>
                </Box>
                
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                  {technicalSkills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={() => handleRemoveTechnicalSkill(skill)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Stack>

                {errors.technicalSkills && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.technicalSkills.message}
                  </Alert>
                )}

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Habilidades sugeridas:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {technicalSkillsOptions.slice(0, 10).map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        if (!technicalSkills.includes(skill)) {
                          setValue('technicalSkills', [...technicalSkills, skill]);
                        }
                      }}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* Soft Skills */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Habilidades Blandas Requeridas
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Agregar habilidad blanda"
                    value={newSoftSkill}
                    onChange={(e) => setNewSoftSkill(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSoftSkill();
                      }
                    }}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={handleAddSoftSkill}
                    disabled={!newSoftSkill.trim()}
                  >
                    Agregar
                  </Button>
                </Box>
                
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
                  {softSkills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      onDelete={() => handleRemoveSoftSkill(skill)}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Stack>

                {errors.softSkills && (
                  <Alert severity="error" sx={{ mt: 1 }}>
                    {errors.softSkills.message}
                  </Alert>
                )}

                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Habilidades sugeridas:
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {softSkillsOptions.slice(0, 10).map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        if (!softSkills.includes(skill)) {
                          setValue('softSkills', [...softSkills, skill]);
                        }
                      }}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Stack>
              </Box>

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
