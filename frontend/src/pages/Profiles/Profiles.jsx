import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  CircularProgress,
  Chip,
  Paper,
} from '@mui/material';
import {
  Search,
  FilterList,
  Person,
} from '@mui/icons-material';
import { useProfilesQuery } from '../../hooks/useProfilesQuery';
import ProfileCard from '../../components/ProfileCard/ProfileCard';

const Profiles = () => {
  const [filters, setFilters] = useState({
    area: '',
    career: '',
    experienceLevel: '',
    search: '',
  });

  const { data, isLoading, error } = useProfilesQuery(filters);

  const handleFilterChange = (field) => (event) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSearchChange = (event) => {
    setFilters(prev => ({
      ...prev,
      search: event.target.value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      area: '',
      career: '',
      experienceLevel: '',
      search: '',
    });
  };

  const areas = ['Tecnología', 'Análisis', 'Diseño', 'Gestión'];
  const careers = ['Ingeniería en Sistemas', 'Diseño Gráfico', 'Administración'];
  const experienceLevels = ['Junior', 'Semi-Senior', 'Senior'];

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
            Perfiles Profesionales
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Explora los perfiles profesionales disponibles y encuentra el que mejor se adapte
            a tu carrera y nivel de experiencia.
          </Typography>
        </Box>

        {/* Filters */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <FilterList sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Filtros de Búsqueda
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Search */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Buscar perfiles"
                placeholder="Escribe palabras clave..."
                value={filters.search}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
              />
            </Grid>

            {/* Area Filter */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Área</InputLabel>
                <Select
                  value={filters.area}
                  label="Área"
                  onChange={handleFilterChange('area')}
                >
                  <MenuItem value="">Todas</MenuItem>
                  {areas.map((area) => (
                    <MenuItem key={area} value={area}>
                      {area}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Career Filter */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Carrera</InputLabel>
                <Select
                  value={filters.career}
                  label="Carrera"
                  onChange={handleFilterChange('career')}
                >
                  <MenuItem value="">Todas</MenuItem>
                  {careers.map((career) => (
                    <MenuItem key={career} value={career}>
                      {career}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Experience Level Filter */}
            <Grid item xs={12} sm={6} md={2}>
              <FormControl fullWidth>
                <InputLabel>Experiencia</InputLabel>
                <Select
                  value={filters.experienceLevel}
                  label="Experiencia"
                  onChange={handleFilterChange('experienceLevel')}
                >
                  <MenuItem value="">Todos</MenuItem>
                  {experienceLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Active Filters */}
          {hasActiveFilters && (
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Typography variant="body2" color="text.secondary">
                Filtros activos:
              </Typography>
              {filters.area && (
                <Chip
                  label={`Área: ${filters.area}`}
                  onDelete={() => setFilters(prev => ({ ...prev, area: '' }))}
                  size="small"
                />
              )}
              {filters.career && (
                <Chip
                  label={`Carrera: ${filters.career}`}
                  onDelete={() => setFilters(prev => ({ ...prev, career: '' }))}
                  size="small"
                />
              )}
              {filters.experienceLevel && (
                <Chip
                  label={`Experiencia: ${filters.experienceLevel}`}
                  onDelete={() => setFilters(prev => ({ ...prev, experienceLevel: '' }))}
                  size="small"
                />
              )}
              {filters.search && (
                <Chip
                  label={`Búsqueda: ${filters.search}`}
                  onDelete={() => setFilters(prev => ({ ...prev, search: '' }))}
                  size="small"
                />
              )}
              <Chip
                label="Limpiar todos"
                onClick={clearFilters}
                size="small"
                color="secondary"
                variant="outlined"
              />
            </Box>
          )}
        </Paper>

        {/* Results */}
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            Error al cargar los perfiles. Por favor, intenta de nuevo.
          </Alert>
        ) : !data?.data || data.data.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Person sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No hay perfiles disponibles
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {hasActiveFilters
                ? 'No se encontraron perfiles que coincidan con los filtros seleccionados.'
                : 'No hay perfiles disponibles en este momento.'}
            </Typography>
            {hasActiveFilters && (
              <Box sx={{ mt: 2 }}>
                <Chip
                  label="Limpiar filtros"
                  onClick={clearFilters}
                  color="primary"
                  variant="outlined"
                />
              </Box>
            )}
          </Box>
        ) : (
          <>
            {/* Results Count */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body1" color="text.secondary">
                {data.data.length} perfil{data.data.length !== 1 ? 'es' : ''} encontrado{data.data.length !== 1 ? 's' : ''}
              </Typography>
            </Box>

            {/* Profiles Grid */}
            <Grid container spacing={3}>
              {data.data.map((profile) => (
                <Grid item xs={12} sm={6} lg={4} key={profile.id}>
                  <ProfileCard profile={profile} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Profiles;
