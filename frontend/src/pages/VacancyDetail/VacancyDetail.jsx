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
} from '@mui/material';
import {
  ArrowBack,
  Work,
  People,
  Schedule,
  Group,
  TrendingUp,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useVacancyQuery, useCandidatesByVacancyQuery } from '../../hooks/useVacanciesQuery';
import CandidateCard from '../../components/CandidateCard/CandidateCard';

const VacancyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: vacancyData, isLoading: vacancyLoading, error: vacancyError } = useVacancyQuery(id);
  const { data: candidatesData, isLoading: candidatesLoading, error: candidatesError } = useCandidatesByVacancyQuery(id);

  const isLoading = vacancyLoading || candidatesLoading;
  const error = vacancyError || candidatesError;

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
          Error al cargar la vacante. Por favor, intenta de nuevo.
        </Alert>
      </Container>
    );
  }

  if (!vacancyData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          Vacante no encontrada.
        </Alert>
      </Container>
    );
  }

  const vacancy = vacancyData;
  const internalCandidates = candidatesData?.top5Internos || [];
  const externalCandidates = candidatesData?.externos || [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'activa':
        return 'success';
      case 'pendiente':
        return 'warning';
      case 'cerrada':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'activa':
        return 'Activa';
      case 'pendiente':
        return 'Pendiente';
      case 'cerrada':
        return 'Cerrada';
      default:
        return status;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getSuitabilityColor = (percentage) => {
    if (percentage >= 80) return 'success';
    if (percentage >= 60) return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/vacantes')}
          sx={{ mb: 3 }}
        >
          Volver a Vacantes
        </Button>

        {/* Vacancy Header */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 80,
                height: 80,
                mr: 3,
                fontSize: '2rem',
              }}
            >
              <Work />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mr: 2 }}>
                  {vacancy.puesto?.nombre || 'Sin título'}
                </Typography>
                <Chip
                  label={getStatusLabel(vacancy.status)}
                  color={getStatusColor(vacancy.status)}
                  size="large"
                />
              </Box>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {vacancy.descripcion || vacancy.puesto?.descripcion || 'Sin descripción'}
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Chip
                  icon={<People />}
                  label={`${vacancy.candidatesCount || 0} candidatos`}
                  color="info"
                  variant="outlined"
                />
                {vacancy.fecha_cierre && (
                  <Chip
                    icon={<Schedule />}
                    label={`Cierre: ${formatDate(vacancy.fecha_cierre)}`}
                    color="secondary"
                    variant="outlined"
                  />
                )}
                <Chip
                  icon={<Group />}
                  label={vacancy.puesto?.area?.nombre || 'Sin área'}
                  color="primary"
                  variant="outlined"
                />
              </Stack>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4
          }}>
            {/* Technical Skills */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Habilidades Técnicas Requeridas
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {vacancy.requirements?.technical?.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    color="primary"
                    variant="outlined"
                  />
                )) || <Typography variant="body2" color="text.secondary">No especificadas</Typography>}
              </Stack>
            </Box>

            {/* Soft Skills */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Habilidades Blandas Requeridas
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {vacancy.requirements?.soft?.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    color="secondary"
                    variant="outlined"
                  />
                )) || <Typography variant="body2" color="text.secondary">No especificadas</Typography>}
              </Stack>
            </Box>
          </Box>
        </Paper>

        {/* Candidates Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 4
        }}>
          {/* Internal Candidates */}
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 4, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Top 5 Candidatos Internos
                </Typography>
              </Box>

              {!internalCandidates || internalCandidates.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Group sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    No hay suficientes candidatos internos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No hay suficientes candidatos internos disponibles para esta vacante.
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={3}>
                  {internalCandidates.map((candidate, index) => (
                    <Card key={candidate.id_empleado} variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            sx={{
                              bgcolor: 'primary.main',
                              mr: 2,
                              width: 40,
                              height: 40,
                            }}
                          >
                            {candidate.nombre.charAt(0)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {candidate.nombre}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {candidate.correo}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2" color="text.secondary">
                              {candidate.puesto?.nombre || 'Sin puesto'}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Habilidades:
                          </Typography>
                          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                            {candidate.empleado_habilidades?.slice(0, 4).map((eh, skillIndex) => (
                              <Chip
                                key={skillIndex}
                                label={eh.habilidad.nombre}
                                size="small"
                                color={eh.habilidad.tipo === 'tecnica' ? 'primary' : 'secondary'}
                                variant="outlined"
                              />
                            ))}
                            {candidate.empleado_habilidades?.length > 4 && (
                              <Chip
                                label={`+${candidate.empleado_habilidades.length - 4} más`}
                                size="small"
                                variant="outlined"
                              />
                            )}
                          </Stack>
                        </Box>

                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate(`/candidatos/${candidate.id_empleado}`)}
                          fullWidth
                        >
                          Ver Perfil Completo
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              )}
            </Paper>
          </Box>

          {/* External Candidates */}
          <Box sx={{ flex: 1 }}>
            <Paper sx={{ p: 4, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <People sx={{ mr: 1, color: 'secondary.main' }} />
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Candidatos Externos
                </Typography>
              </Box>

              {!externalCandidates || externalCandidates.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Group sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                    No hay suficientes candidatos externos
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No hay suficientes candidatos externos disponibles para esta vacante.
                  </Typography>
                </Box>
              ) : (
                <Stack spacing={3}>
                  {externalCandidates.map((candidate, index) => (
                    <Card key={candidate.id_empleado} variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            sx={{
                              bgcolor: 'secondary.main',
                              mr: 2,
                              width: 40,
                              height: 40,
                            }}
                          >
                            {candidate.nombre.charAt(0)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {candidate.nombre}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {candidate.correo}
                            </Typography>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2" color="text.secondary">
                              {candidate.puesto?.nombre || 'Sin puesto'}
                            </Typography>
                          </Box>
                        </Box>

                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => navigate(`/candidatos/${candidate.id_empleado}`)}
                          fullWidth
                        >
                          Ver Perfil Completo
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              )}
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default VacancyDetail;
