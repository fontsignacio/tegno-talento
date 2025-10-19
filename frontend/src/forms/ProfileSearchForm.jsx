import React from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  Search,
  Clear,
} from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { profileSearchSchema, defaultValues } from '../schemas/profileSearchSchema';
import { useAreasQuery } from '../hooks/useProfilesQuery';

const ProfileSearchForm = ({ onSearch, onClear, isLoading = false }) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty },
  } = useForm({
    resolver: yupResolver(profileSearchSchema),
    defaultValues,
  });

  const { data: areasData, isLoading: areasLoading, error: areasError } = useAreasQuery();
  const watchedValues = watch();
  const hasActiveFilters = Object.values(watchedValues).some(value => value !== '');

  const areas = areasData || [];

  const onSubmit = (data) => {
    onSearch(data);
  };

  const handleClear = () => {
    reset();
    onClear();
  };

  const handleRemoveFilter = (field) => {
    reset({ ...watchedValues, [field]: '' });
    onSearch({ ...watchedValues, [field]: '' });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Search sx={{ mr: 1, color: 'primary.main' }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Filtros de Búsqueda
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 3,
          alignItems: 'flex-end',
          mb: 3
        }}>
          {/* Search */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 calc(50% - 12px)' } }}>
            <Controller
              name="search"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Buscar perfiles"
                  placeholder="Escribe palabras clave..."
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
              )}
            />
          </Box>

          {/* Area Filter */}
          <Box sx={{ flex: { xs: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 12px)' } }}>
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Área</InputLabel>
                  <Select
                    {...field}
                    label="Área"
                    disabled={areasLoading}
                    endAdornment={areasLoading ? <CircularProgress size={20} /> : null}
                  >
                    <MenuItem value="">Todas</MenuItem>
                    {areas.map((area) => (
                      <MenuItem key={area.id_area} value={area.nombre}>
                        {area.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
          </Box>
        </Box>

        {/* Error Message for Areas */}
        {areasError && (
          <Box sx={{ mb: 2, p: 2, backgroundColor: 'error.light', borderRadius: 1 }}>
            <Typography variant="body2" color="error.main">
              Error al cargar las áreas. Por favor, recarga la página.
            </Typography>
          </Box>
        )}

        {/* Active Filters */}
        {hasActiveFilters && (
          <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" color="text.secondary">
              Filtros activos:
            </Typography>
            {watchedValues.area && (
              <Chip
                label={`Área: ${watchedValues.area}`}
                onDelete={() => handleRemoveFilter('area')}
                size="small"
              />
            )}
            {watchedValues.career && (
              <Chip
                label={`Carrera: ${watchedValues.career}`}
                onDelete={() => handleRemoveFilter('career')}
                size="small"
              />
            )}
            {watchedValues.experienceLevel && (
              <Chip
                label={`Experiencia: ${watchedValues.experienceLevel}`}
                onDelete={() => handleRemoveFilter('experienceLevel')}
                size="small"
              />
            )}
            {watchedValues.search && (
              <Chip
                label={`Búsqueda: ${watchedValues.search}`}
                onDelete={() => handleRemoveFilter('search')}
                size="small"
              />
            )}
            <Chip
              label="Limpiar todos"
              onClick={handleClear}
              size="small"
              color="secondary"
              variant="outlined"
            />
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={handleClear}
            disabled={!hasActiveFilters || isLoading}
          >
            Limpiar
          </Button>
          <Button
            type="submit"
            variant="contained"
            startIcon={<Search />}
            disabled={isLoading}
          >
            Buscar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ProfileSearchForm;
