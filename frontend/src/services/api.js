import axios from 'axios';

// Importar solo chatbot mock
import { mockChatbotResponses } from './mocks/chatbot.js';

// Configuración base de axios (usar variable de entorno de Vite si existe)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1',
  timeout: 10000,
});

// ===== SERVICIOS DE PERFILES =====
export const getProfiles = async (filters = {}) => {
  const response = await api.get('/perfiles', { params: filters });
  return response.data;
};

export const getProfileById = async (id) => {
  const response = await api.get(`/perfiles/${id}`);
  return response.data;
};

// ===== SERVICIOS DE VACANTES =====
export const getVacancies = async (filters = {}) => {
  const response = await api.get('/vacantes', { params: filters });
  return response.data;
};

export const getVacancyById = async (id) => {
  const response = await api.get(`/vacantes/${id}`);
  return response.data;
};

export const getCandidatesByVacancy = async (id) => {
  const response = await api.get(`/vacantes/${id}/candidatos`);
  return response.data;
};

export const createVacancy = async (data) => {
  const response = await api.post('/vacantes', data);
  return response.data;
};

// ===== SERVICIOS DE CANDIDATOS (EMPLEADOS) =====
export const getCandidates = async (filters = {}) => {
  const response = await api.get('/empleados', { params: filters });
  return response.data;
};

export const getCandidateById = async (id) => {
  const response = await api.get(`/empleados/${id}`);
  return response.data;
};

// ===== SERVICIOS AUXILIARES =====
export const getAreas = async () => {
  const response = await api.get('/areas');
  return response.data;
};

export const getPuestos = async () => {
  const response = await api.get('/puestos');
  return response.data;
};

export const getHabilidades = async () => {
  const response = await api.get('/habilidades');
  return response.data;
};

export const getHabilidadesByTipo = async (tipo) => {
  const response = await api.get(`/habilidades/tipo/${tipo}`);
  return response.data;
};

// ===== SERVICIO DE CHATBOT (MOCK) =====
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

export default api;
