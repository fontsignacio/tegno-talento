import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Person,
  Work,
  Chat,
  TrendingUp,
  School,
  Group,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <Person sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Puestos',
      description: 'Explora los puestos en nuestro equipo y nosotros',
      action: 'Ver Perfiles',
      path: '/perfiles',
    },
    {
      icon: <Work sx={{ fontSize: 40, color: 'secondary.main' }} />,
      title: 'Panel de Vacantes',
      description: 'Gestiona oportunidades laborales y conecta con el talento adecuado',
      action: 'Gestionar Vacantes',
      path: '/vacantes',
    },
    {
      icon: <Chat sx={{ fontSize: 40, color: 'success.main' }} />,
      title: 'Asistente Virtual',
      description: 'Obtén ayuda instantánea y respuestas a tus preguntas sobre el sistema',
      action: 'Iniciar Chat',
      path: '/chatbot',
    },
  ];

  const stats = [
    { number: '150+', label: 'Perfiles Disponibles' },
    { number: '25+', label: 'Vacantes Activas' },
    { number: '500+', label: 'Estudiantes Registrados' },
    { number: '95%', label: 'Tasa de Satisfacción' },
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Hero Section */}
        <Box
          sx={{
            background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
            color: 'white',
            py: { xs: 8, md: 12 },
          }}
        >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant={isMobile ? 'h3' : 'h2'}
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 3,
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              Sistema de Gestión de Talentos
            </Typography>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{
                mb: 4,
                opacity: 0.9,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Conecta estudiantes de Ingeniería en Sistemas con oportunidades laborales
              relevantes y perfiles profesionales diseñados para su desarrollo académico.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Person />}
                onClick={() => navigate('/perfiles')}
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    backgroundColor: 'grey.100',
                  },
                }}
              >
                Explorar Perfiles
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<Work />}
                onClick={() => navigate('/vacantes')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                Panel de Vacantes
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

        {/* Stats Section */}
        <Box sx={{ py: 6, backgroundColor: 'background.paper' }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 4,
              justifyContent: 'center'
            }}>
              {stats.map((stat, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    textAlign: 'center',
                    minWidth: { xs: 'calc(50% - 16px)', md: 'calc(25% - 24px)' },
                    flex: { xs: '1 1 calc(50% - 16px)', md: '1 1 calc(25% - 24px)' }
                  }}
                >
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      mb: 1,
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
              Características Principales
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
              Descubre las herramientas que hacen de este sistema la plataforma ideal
              para la gestión de talentos universitarios.
            </Typography>
          </Box>

          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4,
            justifyContent: 'center'
          }}>
            {features.map((feature, index) => (
              <Box 
                key={index}
                sx={{ 
                  minWidth: { xs: '100%', md: 'calc(33.333% - 32px)' },
                  flex: { xs: '1 1 100%', md: '1 1 calc(33.333% - 32px)' }
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                    <Button
                      variant="contained"
                      onClick={() => navigate(feature.path)}
                      sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        px: 3,
                        py: 1,
                      }}
                    >
                      {feature.action}
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 600, mb: 2 }}>
              ¿Listo para comenzar?
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
              Explora los perfiles disponibles, gestiona vacantes o chatea con nuestro asistente virtual.
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Chat />}
              onClick={() => navigate('/chatbot')}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                '&:hover': {
                  backgroundColor: 'grey.100',
                },
              }}
            >
              Iniciar con el Chatbot
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
