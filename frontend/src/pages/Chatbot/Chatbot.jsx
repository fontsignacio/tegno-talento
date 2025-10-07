import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import {
  ArrowBack,
  SmartToy,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ChatbotInterface from '../../components/Chatbot/Chatbot';

const Chatbot = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ mb: 2 }}
          >
            Volver
          </Button>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SmartToy sx={{ mr: 2, fontSize: 40, color: 'primary.main' }} />
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                Asistente Virtual
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Obtén ayuda instantánea y respuestas a tus preguntas sobre el sistema
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Chatbot Interface */}
        <Paper sx={{ height: '70vh', overflow: 'hidden' }}>
          <ChatbotInterface />
        </Paper>

        {/* Help Section */}
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            ¿Cómo puedo ayudarte?
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                📋 Perfiles Profesionales
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Pregunta sobre los perfiles disponibles, requisitos, beneficios o cómo encontrar el perfil adecuado para ti.
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                💼 Vacantes Laborales
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Consulta sobre vacantes activas, cómo aplicar, requisitos específicos o el proceso de selección.
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                👥 Candidatos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Información sobre candidatos, perfiles de estudiantes, habilidades o proceso de matching.
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                🎓 Sistema Educativo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Preguntas sobre el sistema, funcionalidades, navegación o características del proyecto.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Chatbot;
