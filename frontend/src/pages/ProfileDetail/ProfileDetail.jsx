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
                  icon={<School />}
                  label={profile.career}
                  color="primary"
                  variant="outlined"
                />
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

          <Grid container spacing={4}>
            {/* Requirements */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Requisitos Principales
              </Typography>
              <Stack spacing={1}>
                {profile.requirements.map((requirement, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircle sx={{ mr: 1, color: 'success.main', fontSize: 20 }} />
                    <Typography variant="body1">{requirement}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Benefits */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Beneficios Ofrecidos
              </Typography>
              <Stack spacing={1}>
                {profile.benefits.map((benefit, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star sx={{ mr: 1, color: 'warning.main', fontSize: 20 }} />
                    <Typography variant="body1">{benefit}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>

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

              <Grid container spacing={3}>
                {matchingCandidates.map((candidate) => (
                  <Grid item xs={12} sm={6} lg={4} key={candidate.id}>
                    <CandidateCard candidate={candidate} showSuitability={true} />
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ProfileDetail;
