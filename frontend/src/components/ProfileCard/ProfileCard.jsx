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
} from '@mui/material';
import {
  Person,
  School,
  Work,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProfileCard = ({ profile }) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/perfiles/${profile.id}`);
  };

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

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Person sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            {profile.name}
          </Typography>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, minHeight: '2.5em' }}
        >
          {profile.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Work sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {profile.area}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Nivel de experiencia:
          </Typography>
          <Chip
            label={profile.experienceLevel}
            color={getExperienceColor(profile.experienceLevel)}
            size="small"
            sx={{ mb: 2 }}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {profile.requirements.technical && (
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Habilidades técnicas:
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                {profile.requirements.technical?.slice(0, 3).map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
                {profile.requirements.technical?.length > 3 && (
                  <Chip
                    label={`+${profile.requirements.technical.length - 3} más`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                )}
              </Stack>
            </Box>
          )}
          {profile.requirements.soft && (
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                Habilidades blandas:
              </Typography>
              <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                {profile.requirements.soft?.slice(0, 3).map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                ))}
                {profile.requirements.soft?.length > 3 && (
                  <Chip
                    label={`+${profile.requirements.soft.length - 3} más`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                )}
              </Stack>
            </Box>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          endIcon={<ArrowForward />}
          onClick={handleViewDetail}
          fullWidth
          sx={{
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Ver detalle
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
