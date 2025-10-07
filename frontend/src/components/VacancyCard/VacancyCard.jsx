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
  Work,
  People,
  Schedule,
  Visibility,
  Group,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const VacancyCard = ({ vacancy }) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/vacantes/${vacancy.id}`);
  };

  const handleViewCandidates = () => {
    navigate(`/vacantes/${vacancy.id}`);
  };

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
      month: 'short',
      day: 'numeric',
    });
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
            <Work sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600, flex: 1 }}>
              {vacancy.title}
            </Typography>
          </Box>
          <Chip
            label={getStatusLabel(vacancy.status)}
            color={getStatusColor(vacancy.status)}
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, minHeight: '2.5em' }}
        >
          {vacancy.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <People sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {vacancy.candidatesCount} candidatos
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Schedule sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Cierre: {formatDate(vacancy.closingDate)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Group sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Tipo: {vacancy.type === 'interna' ? 'Interna' : 'Externa'}
            </Typography>
          </Box>
        </Box>

        {vacancy.requirements && (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Habilidades técnicas:
            </Typography>
            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
              {vacancy.requirements.technical.slice(0, 3).map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              ))}
              {vacancy.requirements.technical.length > 3 && (
                <Chip
                  label={`+${vacancy.requirements.technical.length - 3} más`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              )}
            </Stack>
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
        <Button
          variant="outlined"
          startIcon={<Visibility />}
          onClick={handleViewDetail}
          sx={{ flex: 1, textTransform: 'none' }}
        >
          Ver detalle
        </Button>
        <Button
          variant="contained"
          startIcon={<People />}
          onClick={handleViewCandidates}
          sx={{ flex: 1, textTransform: 'none' }}
        >
          Ver candidatos
        </Button>
      </CardActions>
    </Card>
  );
};

export default VacancyCard;
