import axios from 'axios';

// Importar mocks restantes solo donde aún se usen
import {
  mockVacancies,
  mockCandidates,
  mockChatbotResponses
} from './mocks/index.js';

// Configuración base de axios (usar variable de entorno de Vite si existe)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
});

// Funciones de la API
export const getProfiles = async (filters = {}) => {
  const response = await api.get('/perfiles', { params: filters });
  return response.data;
};

export const getProfileById = async (id) => {
  const response = await api.get(`/perfiles/${id}`);
  return response.data;
};

export const getVacancies = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return { data: mockVacancies };
};

export const getVacancyById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const vacancy = mockVacancies.find(v => v.id === parseInt(id));
  if (!vacancy) {
    throw new Error('Vacante no encontrada');
  }

  // Obtener candidatos para esta vacante
  const candidates = mockCandidates.filter(candidate =>
    candidate.vacancyId === parseInt(id)
  );

  // Separar candidatos internos y externos
  const internalCandidates = candidates.filter(candidate =>
    vacancy.type === 'interna'
  ).slice(0, 5);

  const externalCandidates = candidates.filter(candidate =>
    vacancy.type === 'externa'
  ).slice(0, 5);

  return {
    data: {
      ...vacancy,
      internalCandidates,
      externalCandidates
    }
  };
};

export const getCandidates = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return { data: mockCandidates };
};

export const getCandidateById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));

  const candidate = mockCandidates.find(c => c.id === parseInt(id));
  if (!candidate) {
    throw new Error('Candidato no encontrado');
  }

  return { data: candidate };
};

export const getChatbotResponse = async (message) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Respuesta simple basada en palabras clave
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hola') || lowerMessage.includes('hi')) {
    return { data: { response: mockChatbotResponses[0] } };
  }

  if (lowerMessage.includes('perfil') || lowerMessage.includes('perfiles')) {
    return { data: { response: mockChatbotResponses[2] } };
  }

  if (lowerMessage.includes('vacante') || lowerMessage.includes('vacantes')) {
    return { data: { response: mockChatbotResponses[3] } };
  }

  if (lowerMessage.includes('ayuda') || lowerMessage.includes('help')) {
    return { data: { response: mockChatbotResponses[1] } };
  }

  // Respuesta aleatoria
  const randomResponse = mockChatbotResponses[Math.floor(Math.random() * mockChatbotResponses.length)];
  return { data: { response: randomResponse } };
};

export const createVacancy = async (vacancyData) => {
  await new Promise(resolve => setTimeout(resolve, 800));

  // Simular validación
  if (!vacancyData.title || !vacancyData.description) {
    throw new Error('Título y descripción son obligatorios');
  }

  const newVacancy = {
    id: mockVacancies.length + 1,
    ...vacancyData,
    status: 'pendiente',
    candidatesCount: 0,
    createdAt: new Date().toISOString().split('T')[0]
  };

  mockVacancies.push(newVacancy);

  return { data: newVacancy };
};

export default api;
