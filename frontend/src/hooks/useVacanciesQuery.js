import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getVacancies, getVacancyById, createVacancy } from '../services/api';

export const useVacanciesQuery = () => {
  return useQuery({
    queryKey: ['vacancies'],
    queryFn: getVacancies,
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000, // 10 minutos
  });
};

export const useVacancyQuery = (id) => {
  return useQuery({
    queryKey: ['vacancy', id],
    queryFn: () => getVacancyById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

export const useCreateVacancyMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createVacancy,
    onSuccess: () => {
      // Invalidar y refetch de vacantes después de crear una nueva
      queryClient.invalidateQueries({ queryKey: ['vacancies'] });
    },
  });
};
