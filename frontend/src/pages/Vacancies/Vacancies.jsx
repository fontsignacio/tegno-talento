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
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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

  const [filters, setFilters] = useState({});
  const { data, isLoading, error } = useVacanciesQuery(filters);

  const handleCreateVacancy = () => {
    navigate('/vacantes/nueva');
  };

  const handleViewDetail = (vacancy) => {
    navigate(`/vacantes/${vacancy.id_vacante}`);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
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

  const activeVacancies = data?.filter(v => v.status === 'activa') || [];
  const closedVacancies = data?.filter(v => v.status === 'cerrada') || [];

  const totalCandidates = data?.reduce((sum, vacancy) => sum + (vacancy.candidatesCount || 0), 0) || 0;

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

        {/* Filtros */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Filtros
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant={filters.status === 'activa' ? 'contained' : 'outlined'}
              onClick={() => handleFilterChange({ ...filters, status: filters.status === 'activa' ? undefined : 'activa' })}
            >
              Solo Activas
            </Button>
            <Button
              variant={filters.status === 'cerrada' ? 'contained' : 'outlined'}
              onClick={() => handleFilterChange({ ...filters, status: filters.status === 'cerrada' ? undefined : 'cerrada' })}
            >
              Solo Cerradas
            </Button>
            <Button
              variant={filters.tipo_empleado === 'INTERNO' ? 'contained' : 'outlined'}
              onClick={() => handleFilterChange({ ...filters, tipo_empleado: filters.tipo_empleado === 'INTERNO' ? undefined : 'INTERNO' })}
            >
              Solo Internos
            </Button>
            <Button
              variant={filters.tipo_empleado === 'EXTERNO' ? 'contained' : 'outlined'}
              onClick={() => handleFilterChange({ ...filters, tipo_empleado: filters.tipo_empleado === 'EXTERNO' ? undefined : 'EXTERNO' })}
            >
              Solo Externos
            </Button>
            <Button
              variant="outlined"
              onClick={() => setFilters({})}
            >
              Limpiar Filtros
            </Button>
          </Box>
        </Paper>

        {/* Stats Cards */}
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3,
          mb: 4
        }}>
          <Box sx={{ 
            minWidth: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' }
          }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Work sx={{ mr: 2, color: 'primary.main', fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {data?.length || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Vacantes
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box sx={{ 
            minWidth: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' }
          }}>
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
          </Box>
          <Box sx={{ 
            minWidth: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' }
          }}>
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
          </Box>
          <Box sx={{ 
            minWidth: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(25% - 18px)' },
            flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' }
          }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Assignment sx={{ mr: 2, color: 'info.main', fontSize: 40 }} />
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 600 }}>
                      {closedVacancies.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cerradas
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

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
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 3
            }}>
              {activeVacancies.map((vacancy) => (
                <Box 
                  key={vacancy.id_vacante}
                  sx={{ 
                    minWidth: { xs: '100%', sm: 'calc(50% - 12px)', lg: 'calc(33.333% - 16px)' },
                    flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(33.333% - 16px)' }
                  }}
                >
                  <VacancyCard vacancy={vacancy} />
                </Box>
              ))}
            </Box>
          )}
        </Paper>


        {/* Closed Vacancies */}
        {closedVacancies.length > 0 && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Vacantes Cerradas
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 3
            }}>
              {closedVacancies.map((vacancy) => (
                <Box 
                  key={vacancy.id_vacante}
                  sx={{ 
                    minWidth: { xs: '100%', sm: 'calc(50% - 12px)', lg: 'calc(33.333% - 16px)' },
                    flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(33.333% - 16px)' }
                  }}
                >
                  <VacancyCard vacancy={vacancy} />
                </Box>
              ))}
            </Box>
          </Paper>
        )}

        {/* All Vacancies Table (Desktop) */}
        {!isMobile && data && data.length > 0 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Todas las Vacantes
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Puesto</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell>Candidatos</TableCell>
                    <TableCell>Fecha de Cierre</TableCell>
                    <TableCell>Área</TableCell>
                    <TableCell>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((vacancy) => (
                    <TableRow key={vacancy.id_vacante}>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {vacancy.puesto?.nombre || 'Sin título'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {(vacancy.descripcion || vacancy.puesto?.descripcion || 'Sin descripción').substring(0, 100)}...
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
                          {vacancy.candidatesCount || 0}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Schedule sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                          {vacancy.fecha_cierre ? formatDate(vacancy.fecha_cierre) : 'Sin fecha'}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={vacancy.puesto?.area?.nombre || 'Sin área'}
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
