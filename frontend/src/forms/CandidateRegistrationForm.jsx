import React, { useState } from 'react';
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
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Divider,
  FormHelperText,
} from '@mui/material';
import {
  PersonAdd,
  Save,
  Cancel,
  Add,
  Upload,
  CheckCircle,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { candidateRegistrationSchema, defaultValues } from '../schemas/candidateRegistrationSchema';

const CandidateRegistrationForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(candidateRegistrationSchema),
    defaultValues,
  });

  const technicalSkills = watch('technicalSkills') || [];
  const softSkills = watch('softSkills') || [];

  const careers = ['Ingeniería en Sistemas', 'Diseño Gráfico', 'Administración'];
  const experienceLevels = ['Junior', 'Semi-Senior', 'Senior'];
  const availabilityOptions = [
    { value: 'inmediata', label: 'Inmediata' },
    { value: '1-2 semanas', label: '1-2 semanas' },
    { value: '1 mes', label: '1 mes' },
    { value: 'más de 1 mes', label: 'Más de 1 mes' },
  ];

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
    setIsSubmitting(true);
    
    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Datos del candidato:', data);
      
      // Mostrar mensaje de éxito
      setIsSubmitted(true);
      reset();
      
      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error al registrar el candidato:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
        <Container maxWidth="md">
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
              ¡Registro Exitoso!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Gracias por registrarte en nuestro sistema. Hemos recibido tu información y te contactaremos pronto.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setIsSubmitted(false)}
              startIcon={<PersonAdd />}
            >
              Registrar Otro Candidato
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
            Registro de Candidato
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Completa el formulario para registrarte en nuestro sistema de gestión de talentos.
          </Typography>
        </Box>

        {/* Form */}
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Personal Information */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Información Personal
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>

              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3
              }}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Nombre"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      required
                    />
                  )}
                />

                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Apellido"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      required
                    />
                  )}
                />
              </Box>

              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3
              }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Correo electrónico"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      required
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Teléfono"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      required
                    />
                  )}
                />
              </Box>

              {/* Professional Information */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Información Profesional
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>

              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3
              }}>
                <Controller
                  name="career"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.career}>
                      <InputLabel>Carrera</InputLabel>
                      <Select
                        {...field}
                        label="Carrera"
                      >
                        {careers.map((career) => (
                          <MenuItem key={career} value={career}>
                            {career}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.career && (
                        <FormHelperText>{errors.career.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name="experienceLevel"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.experienceLevel}>
                      <InputLabel>Nivel de experiencia</InputLabel>
                      <Select
                        {...field}
                        label="Nivel de experiencia"
                      >
                        {experienceLevels.map((level) => (
                          <MenuItem key={level} value={level}>
                            {level}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.experienceLevel && (
                        <FormHelperText>{errors.experienceLevel.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Box>

              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3
              }}>
                <Controller
                  name="availability"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.availability}>
                      <InputLabel>Disponibilidad</InputLabel>
                      <Select
                        {...field}
                        label="Disponibilidad"
                      >
                        {availabilityOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.availability && (
                        <FormHelperText>{errors.availability.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name="expectedSalary"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Salario esperado (USD)"
                      type="number"
                      error={!!errors.expectedSalary}
                      helperText={errors.expectedSalary?.message}
                      required
                    />
                  )}
                />
              </Box>

              {/* Technical Skills */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Habilidades Técnicas
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
                  Habilidades Blandas
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

              {/* Additional Information */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Información Adicional
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>

              <Controller
                name="interests"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Intereses y objetivos profesionales"
                    multiline
                    rows={4}
                    error={!!errors.interests}
                    helperText={errors.interests?.message}
                    placeholder="Describe tus intereses, objetivos profesionales y qué te motiva..."
                    required
                  />
                )}
              />

              <Controller
                name="resume"
                control={control}
                render={({ field: { onChange, value, ...field } }) => (
                  <Box>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<Upload />}
                      sx={{ mb: 1 }}
                    >
                      Subir CV (PDF)
                      <input
                        type="file"
                        hidden
                        accept=".pdf"
                        onChange={(e) => onChange(e.target.files[0])}
                        {...field}
                      />
                    </Button>
                    {value && (
                      <Typography variant="body2" color="text.secondary">
                        Archivo seleccionado: {value.name}
                      </Typography>
                    )}
                    {errors.resume && (
                      <FormHelperText error>
                        {errors.resume.message}
                      </FormHelperText>
                    )}
                  </Box>
                )}
              />

              {/* Actions */}
              <Box>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={() => reset()}
                    disabled={isSubmitting}
                  >
                    Limpiar
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
                      'Registrar Candidato'
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CandidateRegistrationForm;
