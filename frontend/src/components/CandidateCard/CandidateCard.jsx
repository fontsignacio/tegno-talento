import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  LocationOn,
  Work,
  Visibility,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const CandidateCard = ({ candidate, showSuitability = false }) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/candidatos/${candidate.id}`);
  };

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

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              mr: 2,
              width: 48,
              height: 48,
              fontSize: '1.2rem',
            }}
          >
            {getInitials(candidate.name)}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 0.5 }}>
              {candidate.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
              <Email sx={{ mr: 0.5, fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {candidate.email}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 0.5, fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {candidate.location}
              </Typography>
            </Box>
          </Box>
        </Box>

        {showSuitability && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Idoneidad:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {candidate.suitabilityPercentage}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={candidate.suitabilityPercentage}
              color={getSuitabilityColor(candidate.suitabilityPercentage)}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        )}

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Habilidades técnicas:
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {candidate.technicalSkills.slice(0, 4).map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
            {candidate.technicalSkills.length > 4 && (
              <Chip
                label={`+${candidate.technicalSkills.length - 4} más`}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            )}
          </Stack>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Habilidades blandas:
          </Typography>
          <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
            {candidate.softSkills.slice(0, 3).map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                color="secondary"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            ))}
            {candidate.softSkills.length > 3 && (
              <Chip
                label={`+${candidate.softSkills.length - 3} más`}
                size="small"
                color="secondary"
                variant="outlined"
                sx={{ fontSize: '0.75rem' }}
              />
            )}
          </Stack>
        </Box>

        {candidate.experience && candidate.experience.length > 0 && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Experiencia reciente:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Work sx={{ mr: 0.5, fontSize: 14, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {candidate.experience[0].position} - {candidate.experience[0].company}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          startIcon={<Visibility />}
          onClick={handleViewDetail}
          fullWidth
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Ver perfil completo
        </Button>
      </CardActions>
    </Card>
  );
};

export default CandidateCard;
