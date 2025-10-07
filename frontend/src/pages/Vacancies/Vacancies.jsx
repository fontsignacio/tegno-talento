import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Paper,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Add,
  Work,
  People,
  Visibility,
  Group,
  Schedule,
  TrendingUp,
  Assignment,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useVacanciesQuery } from '../../hooks/useVacanciesQuery';
import VacancyCard from '../../components/VacancyCard/VacancyCard';

const Vacancies = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data, isLoading, error } = useVacanciesQuery();

  const handleCreateVacancy = () => {
    navigate('/vacantes/nueva');
  };

  const handleViewDetail = (vacancy) => {
    navigate(`/vacantes/${vacancy.id}`);
  };

  const handleViewCandidates = (vacancy) => {
    setSelectedVacancy(vacancy);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedVacancy(null);
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

  const activeVacancies = data?.data?.filter(v => v.status === 'activa') || [];
  const pendingVacancies = data?.data?.filter(v => v.status === 'pendiente') || [];
  const closedVacancies = data?.data?.filter(v => v.status === 'cerrada') || [];

  const totalCandidates = data?.data?.reduce((sum, vacancy) => sum + vacancy.candidatesCount, 0) || 0;

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
          Error al cargar las vacantes. Por favor, intenta de nuevo.
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
            Panel de Vacantes
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Gestiona las oportunidades laborales y conecta con el talento adecuado.
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Work sx={{ mr: 2, color: 'primary.main', fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {data?.data?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Vacantes
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ mr: 2, color: 'success.main', fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {activeVacancies.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Vacantes Activas
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <People sx={{ mr: 2, color: 'warning.main', fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {totalCandidates}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Candidatos
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Assignment sx={{ mr: 2, color: 'info.main', fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {pendingVacancies.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pendientes
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Active Vacancies */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Vacantes Activas
          </Typography>
          {activeVacancies.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Work sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                No hay vacantes activas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Crea una nueva vacante para comenzar a recibir candidatos.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {activeVacancies.map((vacancy) => (
                <Grid item xs={12} sm={6} lg={4} key={vacancy.id}>
                  <VacancyCard vacancy={vacancy} />
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>

        {/* Pending Vacancies */}
        {pendingVacancies.length > 0 && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Vacantes Pendientes
            </Typography>
            <Grid container spacing={3}>
              {pendingVacancies.map((vacancy) => (
                <Grid item xs={12} sm={6} lg={4} key={vacancy.id}>
                  <VacancyCard vacancy={vacancy} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* Closed Vacancies */}
        {closedVacancies.length > 0 && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Vacantes Cerradas
            </Typography>
            <Grid container spacing={3}>
              {closedVacancies.map((vacancy) => (
                <Grid item xs={12} sm={6} lg={4} key={vacancy.id}>
                  <VacancyCard vacancy={vacancy} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        )}

        {/* All Vacancies Table (Desktop) */}
        {!isMobile && data?.data && data.data.length > 0 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Todas las Vacantes
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Título</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Candidatos</TableCell>
                    <TableCell>Fecha de Cierre</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.data.map((vacancy) => (
                    <TableRow key={vacancy.id}>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {vacancy.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {vacancy.description.substring(0, 100)}...
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={getStatusLabel(vacancy.status)}
                          color={getStatusColor(vacancy.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <People sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                          {vacancy.candidatesCount}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Schedule sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                          {formatDate(vacancy.closingDate)}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={vacancy.type === 'interna' ? 'Interna' : 'Externa'}
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleViewDetail(vacancy)}
                            color="primary"
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleViewCandidates(vacancy)}
                            color="secondary"
                          >
                            <Group />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}

        {/* Floating Action Button */}
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleCreateVacancy}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
          }}
        >
          <Add />
        </Fab>

        {/* Candidates Dialog */}
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Candidatos para: {selectedVacancy?.title}
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {selectedVacancy?.candidatesCount} candidato{selectedVacancy?.candidatesCount !== 1 ? 's' : ''} aplicaron a esta vacante.
            </Typography>
            <Typography variant="body1">
              Para ver los detalles completos de los candidatos, haz clic en "Ver detalle" en la vacante correspondiente.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              Cerrar
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleCloseDialog();
                handleViewDetail(selectedVacancy);
              }}
            >
              Ver Detalle Completo
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Vacancies;
