import React from 'react';
import {
  Box,
  Typography,
  Paper,
  LinearProgress,
  Divider,
  Chip,
} from '@mui/material';
import {
  Assignment,
} from '@mui/icons-material';

const FormResponses = ({ responses }) => {
  if (!responses || responses.length === 0) {
    return null;
  }

  // Latest response
  const latestResponse = responses[responses.length - 1];

  // Map backend field names to question labels
  const questionLabels = {
    disfrute_logica: '¿Disfrutas resolver acertijos, rompecabezas o problemas lógicos?',
    detalle: '¿Eres detallista y te gusta encontrar errores en lo que otros hicieron?',
    liderazgo: '¿Te gusta organizar a un grupo de personas para lograr un objetivo?',
    curiosidad_tecnologica: '¿Te entusiasma aprender cosas nuevas en tecnología, aunque no las entiendas al principio?',
    motivacion: '¿Qué te motiva más?',
  };

  // Map values to user-friendly answers
  const getValueLabel = (field, value) => {
    if (field === 'motivacion') {
      const motivacionMap = {
        crear: 'Crear cosas',
        arreglar: 'Arreglar problemas',
        coordinar: 'Coordinar personas',
      };
      return motivacionMap[value] || value;
    }

    if (typeof value === 'number') {
      const valueMap = {
        1: 'Nada',
        2: 'Poco',
        3: 'Más o menos',
        4: 'Bastante',
        5: 'Mucho',
      };
      return valueMap[value] || `${value}/5`;
    }

    return value;
  };

  // Get color for motivation type
  const getMotivacionColor = (motivacion) => {
    const colors = {
      crear: 'primary',
      arreglar: 'error',
      coordinar: 'success',
    };
    return colors[motivacion] || 'default';
  };

  // Get numeric value for progress bar (for rating questions only)
  const getNumericValue = (field, value) => {
    if (field === 'motivacion') return null;
    return value ? (value / 5) * 100 : 0;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Assignment sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Respuestas del Formulario de Evaluación
        </Typography>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Última actualización: {formatDate(latestResponse.fecha_respuesta)}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Loop through all questions except 'motivacion' first */}
        {Object.keys(questionLabels)
          .filter(key => key !== 'motivacion')
          .map((field) => {
            const value = latestResponse[field];
            const valueLabel = getValueLabel(field, value);
            const numericValue = getNumericValue(field, value);

            return (
              <Box key={field}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {questionLabels[field]}
                  </Typography>
                  <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                    {valueLabel}
                  </Typography>
                </Box>
                {numericValue !== null && (
                  <LinearProgress
                    variant="determinate"
                    value={numericValue}
                    sx={{ height: 8, borderRadius: 1 }}
                  />
                )}
              </Box>
            );
          })}

        <Divider />

        {/* Motivation question */}
        {latestResponse.motivacion && (
          <Box>
            <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
              {questionLabels.motivacion}
            </Typography>
            <Chip
              label={getValueLabel('motivacion', latestResponse.motivacion)}
              color={getMotivacionColor(latestResponse.motivacion)}
              size="medium"
              sx={{ fontWeight: 600 }}
            />
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default FormResponses;

