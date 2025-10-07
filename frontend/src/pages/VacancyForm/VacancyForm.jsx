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
  Grid,
} from '@mui/material';
import {
  ArrowBack,
  Save,
  Cancel,
  Add,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCreateVacancyMutation } from '../../hooks/useVacanciesQuery';

const VacancyForm = () => {
  const navigate = useNavigate();
  const createVacancyMutation = useCreateVacancyMutation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    experienceRequired: '',
    technicalSkills: [],
    softSkills: [],
    type: 'externa',
    closingDate: '',
  });

  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [errors, setErrors] = useState({});

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

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleAddTechnicalSkill = () => {
    if (newTechnicalSkill.trim() && !formData.technicalSkills.includes(newTechnicalSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        technicalSkills: [...prev.technicalSkills, newTechnicalSkill.trim()],
      }));
      setNewTechnicalSkill('');
    }
  };

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim() && !formData.softSkills.includes(newSoftSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        softSkills: [...prev.softSkills, newSoftSkill.trim()],
      }));
      setNewSoftSkill('');
    }
  };

  const handleRemoveTechnicalSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter(skill => skill !== skillToRemove),
    }));
  };

  const handleRemoveSoftSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      softSkills: prev.softSkills.filter(skill => skill !== skillToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria';
    }

    if (!formData.experienceRequired.trim()) {
      newErrors.experienceRequired = 'La experiencia requerida es obligatoria';
    }

    if (formData.technicalSkills.length === 0) {
      newErrors.technicalSkills = 'Debe agregar al menos una habilidad técnica';
    }

    if (formData.softSkills.length === 0) {
      newErrors.softSkills = 'Debe agregar al menos una habilidad blanda';
    }

    if (!formData.closingDate) {
      newErrors.closingDate = 'La fecha de cierre es obligatoria';
    } else {
      const closingDate = new Date(formData.closingDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (closingDate <= today) {
        newErrors.closingDate = 'La fecha de cierre debe ser futura';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await createVacancyMutation.mutateAsync({
        ...formData,
        requirements: {
          technical: formData.technicalSkills,
          soft: formData.softSkills,
        },
      });
      
      navigate('/vacantes');
    } catch (error) {
      console.error('Error creating vacancy:', error);
    }
  };

  const handleCancel = () => {
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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Información Básica
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Título del puesto"
                  value={formData.title}
                  onChange={handleInputChange('title')}
                  error={!!errors.title}
                  helperText={errors.title}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción del puesto"
                  value={formData.description}
                  onChange={handleInputChange('description')}
                  multiline
                  rows={4}
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Experiencia requerida"
                  value={formData.experienceRequired}
                  onChange={handleInputChange('experienceRequired')}
                  error={!!errors.experienceRequired}
                  helperText={errors.experienceRequired}
                  placeholder="Ej: 2-3 años en desarrollo frontend"
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha de cierre"
                  type="date"
                  value={formData.closingDate}
                  onChange={handleInputChange('closingDate')}
                  error={!!errors.closingDate}
                  helperText={errors.closingDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>

              {/* Type */}
              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Tipo de vacante</FormLabel>
                  <RadioGroup
                    row
                    value={formData.type}
                    onChange={handleInputChange('type')}
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
                </FormControl>
              </Grid>

              {/* Technical Skills */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Habilidades Técnicas Requeridas
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12}>
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
                  {formData.technicalSkills.map((skill) => (
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
                    {errors.technicalSkills}
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
                        if (!formData.technicalSkills.includes(skill)) {
                          setFormData(prev => ({
                            ...prev,
                            technicalSkills: [...prev.technicalSkills, skill],
                          }));
                        }
                      }}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Stack>
              </Grid>

              {/* Soft Skills */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Habilidades Blandas Requeridas
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Grid>

              <Grid item xs={12}>
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
                  {formData.softSkills.map((skill) => (
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
                    {errors.softSkills}
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
                        if (!formData.softSkills.includes(skill)) {
                          setFormData(prev => ({
                            ...prev,
                            softSkills: [...prev.softSkills, skill],
                          }));
                        }
                      }}
                      sx={{ cursor: 'pointer' }}
                    />
                  ))}
                </Stack>
              </Grid>

              {/* Actions */}
              <Grid item xs={12}>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    startIcon={<Cancel />}
                    onClick={handleCancel}
                    disabled={createVacancyMutation.isPending}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Save />}
                    disabled={createVacancyMutation.isPending}
                    sx={{ minWidth: 120 }}
                  >
                    {createVacancyMutation.isPending ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Guardar Vacante'
                    )}
                  </Button>
                </Box>
              </Grid>
            </Grid>
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
