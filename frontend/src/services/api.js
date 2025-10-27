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
  try {const response = await fetch('http://10.129.218.197:5678/webhook/chatbot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question: message }),
  })
  if (!response.ok) {
    throw new Error('Error al obtener la respuesta del chatbot');
  }
  const msg = await response.text();
  console.log('res:',response.text());
  return {data: {response: msg}}; } catch (error) {
    console.error('Error al obtener la respuesta del chatbot:', error);
    throw error;
    }
  }
