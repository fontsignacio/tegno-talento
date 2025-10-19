import { useQuery } from '@tanstack/react-query';
import { getProfiles, getProfileById, getAreas } from '../services/api';

export const useProfilesQuery = (filters = {}) => {
  return useQuery({
    queryKey: ['profiles', filters],
    queryFn: () => getProfiles(filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000, // 10 minutos
  });
};

export const useProfileQuery = (id) => {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: () => getProfileById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useAreasQuery = () => {
  return useQuery({
    queryKey: ['areas'],
    queryFn: getAreas,
    staleTime: 10 * 60 * 1000, // 10 minutos
    cacheTime: 30 * 60 * 1000, // 30 minutos
  });
};
