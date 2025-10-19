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
  School,
  Work,
  CheckCircle,
  Star,
  CalendarToday,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useProfileQuery } from '../../hooks/useProfilesQuery';
import CandidateCard from '../../components/CandidateCard/CandidateCard';

const ProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useProfileQuery(id);

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
          Error al cargar el perfil. Por favor, intenta de nuevo.
        </Alert>
      </Container>
    );
  }

  if (!data?.data) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          Perfil no encontrado.
        </Alert>
      </Container>
    );
  }

  const profile = data.data;
  const { matchingCandidates } = profile;

  const getExperienceColor = (level) => {
    switch (level) {
      case 'Junior':
        return 'success';
      case 'Semi-Senior':
        return 'warning';
      case 'Senior':
        return 'error';
      default:
        return 'default';
    }
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
          onClick={() => navigate('/perfiles')}
          sx={{ mb: 3 }}
        >
          Volver a Perfiles
        </Button>

        {/* Profile Header */}
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
              <Person />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
                {profile.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                {profile.description}
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                <Chip
                  icon={<Work />}
                  label={profile.area}
                  color="secondary"
                  variant="outlined"
                />
                <Chip
                  label={profile.experienceLevel}
                  color={getExperienceColor(profile.experienceLevel)}
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
                Habilidades Técnicas
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {profile.requirements?.technical?.map((skill, index) => (
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
                Habilidades Blandas
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {profile.requirements?.soft?.map((skill, index) => (
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

          <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <CalendarToday sx={{ mr: 1, fontSize: 16 }} />
            <Typography variant="body2">
              Creado el {formatDate(profile.createdAt)}
            </Typography>
          </Box>
        </Paper>

        {/* Matching Candidates */}
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Estudiantes que Coinciden con este Perfil
          </Typography>

          {!matchingCandidates || matchingCandidates.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Person sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No hay estudiantes que coincidan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                No hay estudiantes que coincidan con este perfil por el momento.
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                {matchingCandidates.length} estudiante{matchingCandidates.length !== 1 ? 's' : ''} encontrado{matchingCandidates.length !== 1 ? 's' : ''}
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 3
              }}>
                {matchingCandidates.map((candidate) => (
                  <Box 
                    key={candidate.id}
                    sx={{ 
                      minWidth: { xs: '100%', sm: 'calc(50% - 12px)', lg: 'calc(33.333% - 16px)' },
                      flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(33.333% - 16px)' }
                    }}
                  >
                    <CandidateCard candidate={candidate} showSuitability={true} />
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfileDetail;
