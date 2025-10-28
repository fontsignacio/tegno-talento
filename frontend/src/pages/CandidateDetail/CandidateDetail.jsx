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
  Person,
  Work,
  School,
  TrendingUp,
  Email,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useCandidateQuery } from '../../hooks/useCandidatesQuery';
import FormResponses from '../../components/FormResponses/FormResponses';

const CandidateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: candidateData, isLoading, error } = useCandidateQuery(id);

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

  if (!candidateData) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          Candidato no encontrado.
        </Alert>
      </Container>
    );
  }

  const candidate = candidateData;

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
              {getInitials(candidate.nombre)}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
                {candidate.nombre}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {candidate.correo}
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
                    <Work sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {candidate.puesto?.nombre || 'Sin puesto'}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ 
                  minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' },
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {candidate.tipo_empleado === 'INTERNO' ? 'Interno' : 'Externo'}
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
                      {candidate.experiencia || 0} años de experiencia
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ 
                  minWidth: { xs: '100%', sm: 'calc(50% - 8px)', md: 'calc(25% - 12px)' },
                  flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 calc(25% - 12px)' }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <School sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      Nivel educativo: {candidate.nivel_educativo || 'No especificado'}
                    </Typography>
                  </Box>
                </Box>
              </Box>

            </Box>
          </Box>
        </Paper>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Skills */}
          {candidate.empleado_habilidades && candidate.empleado_habilidades.length > 0 && (
            <Box>
              <Paper sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Work sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Habilidades
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {candidate.empleado_habilidades.map((eh, index) => (
                    <Chip
                      key={index}
                      label={eh.habilidad.nombre}
                      color={eh.habilidad.tipo === 'tecnica' ? 'primary' : 'secondary'}
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Stack>
              </Paper>
            </Box>
          )}

          {/* Form Responses */}
          {candidate.respuestas_formulario && candidate.respuestas_formulario.length > 0 && (
            <FormResponses responses={candidate.respuestas_formulario} />
          )}

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
