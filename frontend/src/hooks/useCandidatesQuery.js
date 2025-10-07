import { useQuery } from '@tanstack/react-query';
import { getCandidates, getCandidateById } from '../services/api';

export const useCandidatesQuery = () => {
  return useQuery({
    queryKey: ['candidates'],
    queryFn: getCandidates,
    staleTime: 5 * 60 * 1000, // 5 minutos
    cacheTime: 10 * 60 * 1000, // 10 minutos
  });
};

export const useCandidateQuery = (id) => {
  return useQuery({
    queryKey: ['candidate', id],
    queryFn: () => getCandidateById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};
