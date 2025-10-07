import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Chip,
  Stack,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Divider,
  Card,
  CardContent,
  Avatar,
  LinearProgress,
} from '@mui/material';
import {
  ArrowBack,
  Person,
  Email,
  Phone,
  LocationOn,
  Work,
  School,
  Star,
  CheckCircle,
  TrendingUp,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useCandidateQuery } from '../../hooks/useCandidatesQuery';

const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCandidateQuery(id);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Error al cargar el candidato. Por favor, intenta de nuevo.
        </Alert>
      </Container>
    );
  }

  if (!data?.data) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          Candidato no encontrado.
        </Alert>
      </Container>
    );
  }

  const candidate = data.data;

  const getSuitabilityColor = (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'error';
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Volver
        </Button>

        {/* Candidate Header */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 100,
                height: 100,
                mr: 3,
                fontSize: '2.5rem',
              }}
            >
              {getInitials(candidate.name)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
                {candidate.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {candidate.email}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 2,
                mb: 3
              }}>
                <Box sx={{ 
                  minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' },
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {candidate.phone}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ 
                  minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' },
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {candidate.location}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ 
                  minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' },
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Work sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {candidate.availability}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ 
                  minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' },
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TrendingUp sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Aplicó el {formatDate(candidate.appliedAt)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Suitability Score */}
              <Card variant="outlined" sx={{ p: 2, backgroundColor: 'background.paper' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Idoneidad para la Vacante
                  </Typography>
                  <Typography variant="h4" color="primary.main" sx={{ fontWeight: 700 }}>
                    {candidate.suitabilityPercentage}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={candidate.suitabilityPercentage}
                  color={getSuitabilityColor(candidate.suitabilityPercentage)}
                  sx={{ height: 12, borderRadius: 6 }}
                />
              </Card>
            </Box>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Technical Skills */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4
          }}>
            <Box sx={{ flex: 1 }}>
              <Paper sx={{ p: 4, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Work sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Habilidades Técnicas
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {candidate.technicalSkills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      color="primary"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Box>

            {/* Soft Skills */}
            <Box sx={{ flex: 1 }}>
              <Paper sx={{ p: 4, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Person sx={{ mr: 1, color: 'secondary.main' }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Habilidades Blandas
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {candidate.softSkills.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      color="secondary"
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Box>
          </Box>

          {/* Professional Interests */}
          <Box>
            <Paper sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Star sx={{ mr: 1, color: 'warning.main' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Intereses Profesionales
                </Typography>
              </Box>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {candidate.interests.map((interest, index) => (
                  <Chip
                    key={index}
                    label={interest}
                    color="warning"
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                ))}
              </Stack>
            </Paper>
          </Box>

          {/* Work Experience */}
          <Box>
            <Paper sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <School sx={{ mr: 1, color: 'info.main' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Experiencia Laboral
                </Typography>
              </Box>
              {candidate.experience && candidate.experience.length > 0 ? (
                <Stack spacing={3}>
                  {candidate.experience.map((exp, index) => (
                    <Card key={index} variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                          <CheckCircle sx={{ mr: 1, color: 'success.main', mt: 0.5 }} />
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                              {exp.position}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                              {exp.company}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {exp.period}
                            </Typography>
                            <Typography variant="body1">
                              {exp.description}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Work sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    Sin experiencia laboral registrada
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Este candidato no tiene experiencia laboral registrada en el sistema.
                  </Typography>
                </Box>
              )}
            </Paper>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            size="large"
          >
            Volver
          </Button>
          <Button
            variant="contained"
            startIcon={<Email />}
            size="large"
            sx={{ minWidth: 200 }}
          >
            Contactar Candidato
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CandidateDetail;
