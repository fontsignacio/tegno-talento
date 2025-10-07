import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  Button,
} from '@mui/material';
import {
  Person,
} from '@mui/icons-material';
import { useProfilesQuery } from '../../hooks/useProfilesQuery';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import ProfileSearchForm from '../../forms/ProfileSearchForm';

const Profiles = () => {
  const [filters, setFilters] = useState({});

  const { data, isLoading, error } = useProfilesQuery(filters);

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };

  const handleClear = () => {
    setFilters({});
  };

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
        <Paper sx={{ mb: 4 }}>
          <ProfileSearchForm 
            onSearch={handleSearch}
            onClear={handleClear}
            isLoading={isLoading}
          />
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
              {Object.keys(filters).length > 0
                ? 'No se encontraron perfiles que coincidan con los filtros seleccionados.'
                : 'No hay perfiles disponibles en este momento.'}
            </Typography>
            {Object.keys(filters).length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleClear}
                  color="primary"
                >
                  Limpiar filtros
                </Button>
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
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 3
            }}>
              {data.data.map((profile) => (
                <Box 
                  key={profile.id}
                  sx={{ 
                    minWidth: { xs: '100%', sm: 'calc(50% - 12px)', lg: 'calc(33.333% - 16px)' },
                    flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(33.333% - 16px)' }
                  }}
                >
                  <ProfileCard profile={profile} />
                </Box>
              ))}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Profiles;
