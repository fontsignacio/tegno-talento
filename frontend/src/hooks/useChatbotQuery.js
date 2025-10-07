import { useMutation } from '@tanstack/react-query';
import { getChatbotResponse } from '../services/api';

export const useChatbotMutation = () => {
  return useMutation({
    mutationFn: getChatbotResponse,
  });
};
