import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Divider,
  Grid,
} from '@mui/material';
import {
  Send,
  ContactMail,
  CheckCircle,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema, defaultValues } from '../schemas/contactSchema';

const ContactForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues,
  });

  const contactTypes = [
    { value: 'consulta', label: 'Consulta General' },
    { value: 'sugerencia', label: 'Sugerencia' },
    { value: 'problema', label: 'Reportar Problema' },
    { value: 'otro', label: 'Otro' },
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Datos del formulario:', data);
      
      // Mostrar mensaje de éxito
      setIsSubmitted(true);
      reset();
      
      // Ocultar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
        <Container maxWidth="md">
          <Paper sx={{ p: 6, textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 3 }} />
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
              ¡Mensaje Enviado!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos pronto.
            </Typography>
            <Button
              variant="contained"
              onClick={() => setIsSubmitted(false)}
              startIcon={<ContactMail />}
            >
              Enviar Otro Mensaje
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
            Contáctanos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            ¿Tienes alguna pregunta, sugerencia o necesitas ayuda? Estamos aquí para ayudarte.
          </Typography>
        </Box>

        {/* Form */}
        <Paper sx={{ p: 4 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {/* Basic Information */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Información de Contacto
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>

              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3
              }}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Nombre completo"
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      required
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Correo electrónico"
                      type="email"
                      error={!!errors.email}
                      helperText={errors.email?.message}
                      required
                    />
                  )}
                />
              </Box>

              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3
              }}>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.type}>
                      <InputLabel>Tipo de contacto</InputLabel>
                      <Select
                        {...field}
                        label="Tipo de contacto"
                      >
                        {contactTypes.map((type) => (
                          <MenuItem key={type.value} value={type.value}>
                            {type.label}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.type && (
                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                          {errors.type.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name="subject"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label="Asunto"
                      error={!!errors.subject}
                      helperText={errors.subject?.message}
                      required
                    />
                  )}
                />
              </Box>

              {/* Message */}
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Mensaje
                </Typography>
                <Divider sx={{ mb: 3 }} />
              </Box>

              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Tu mensaje"
                    multiline
                    rows={6}
                    error={!!errors.message}
                    helperText={errors.message?.message}
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  />
                )}
              />

              {/* Actions */}
              <Box>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => reset()}
                    disabled={isSubmitting}
                  >
                    Limpiar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<Send />}
                    disabled={isSubmitting}
                    sx={{ minWidth: 120 }}
                  >
                    {isSubmitting ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Paper>

        {/* Contact Information */}
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
            Información de Contacto
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Correo Electrónico
              </Typography>
              <Typography variant="body2" color="text.secondary">
                contacto@talentosistema.com
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Teléfono
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +1 (555) 123-4567
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                Horario de Atención
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lunes - Viernes: 9:00 AM - 6:00 PM
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactForm;
