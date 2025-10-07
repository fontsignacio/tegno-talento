import axios from 'axios';

// Configuración base de axios
const api = axios.create({
  baseURL: 'https://api.talentos.com', // URL ficticia
  timeout: 5000,
});

// Datos mockeados para perfiles
const mockProfiles = [
  {
    id: 1,
    name: 'Desarrollador Frontend',
    description: 'Especialista en desarrollo de interfaces de usuario con React y tecnologías modernas',
    area: 'Tecnología',
    career: 'Ingeniería en Sistemas',
    experienceLevel: 'Junior',
    requirements: [
      'Conocimientos en React',
      'HTML/CSS/JavaScript',
      'Git',
      'Responsive Design'
    ],
    benefits: [
      'Trabajo remoto',
      'Capacitación continua',
      'Ambiente colaborativo'
    ],
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    name: 'Analista de Datos',
    description: 'Profesional encargado del análisis e interpretación de datos para la toma de decisiones',
    area: 'Análisis',
    career: 'Ingeniería en Sistemas',
    experienceLevel: 'Semi-Senior',
    requirements: [
      'Python/R',
      'SQL',
      'Excel avanzado',
      'Pensamiento analítico'
    ],
    benefits: [
      'Crecimiento profesional',
      'Proyectos desafiantes',
      'Equipamiento moderno'
    ],
    createdAt: '2024-01-20'
  },
  {
    id: 3,
    name: 'Diseñador UX/UI',
    description: 'Creador de experiencias de usuario intuitivas y atractivas',
    area: 'Diseño',
    career: 'Diseño Gráfico',
    experienceLevel: 'Junior',
    requirements: [
      'Figma/Adobe XD',
      'Principios de UX',
      'Prototipado',
      'Investigación de usuarios'
    ],
    benefits: [
      'Creatividad libre',
      'Proyectos diversos',
      'Mentoría especializada'
    ],
    createdAt: '2024-02-01'
  }
];

// Datos mockeados para vacantes
const mockVacancies = [
  {
    id: 1,
    title: 'Desarrollador React Senior',
    description: 'Buscamos un desarrollador senior con experiencia en React para liderar proyectos frontend',
    status: 'activa',
    candidatesCount: 12,
    closingDate: '2024-03-15',
    type: 'externa',
    requirements: {
      technical: ['React', 'TypeScript', 'Redux', 'Jest'],
      soft: ['Liderazgo', 'Comunicación', 'Trabajo en equipo']
    },
    createdAt: '2024-02-01'
  },
  {
    id: 2,
    title: 'Analista de Datos Junior',
    description: 'Posición para recién graduados interesados en análisis de datos',
    status: 'pendiente',
    candidatesCount: 8,
    closingDate: '2024-03-20',
    type: 'interna',
    requirements: {
      technical: ['Python', 'SQL', 'Excel'],
      soft: ['Análisis crítico', 'Atención al detalle']
    },
    createdAt: '2024-02-05'
  },
  {
    id: 3,
    title: 'Diseñador UX/UI',
    description: 'Diseñador creativo para mejorar la experiencia de usuario',
    status: 'cerrada',
    candidatesCount: 15,
    closingDate: '2024-02-28',
    type: 'externa',
    requirements: {
      technical: ['Figma', 'Adobe Creative Suite', 'Principios UX'],
      soft: ['Creatividad', 'Empatía', 'Comunicación']
    },
    createdAt: '2024-01-15'
  }
];

// Datos mockeados para candidatos
const mockCandidates = [
  {
    id: 1,
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+54 9 11 1234-5678',
    location: 'Buenos Aires, Argentina',
    availability: 'Inmediata',
    technicalSkills: ['React', 'JavaScript', 'CSS', 'Git'],
    softSkills: ['Trabajo en equipo', 'Comunicación', 'Proactividad'],
    interests: ['Desarrollo web', 'Tecnologías emergentes', 'Aprendizaje continuo'],
    experience: [
      {
        position: 'Desarrollador Frontend',
        company: 'TechCorp',
        period: '2022-2024',
        description: 'Desarrollo de aplicaciones web con React'
      }
    ],
    suitabilityPercentage: 85,
    profileId: 1,
    vacancyId: 1,
    appliedAt: '2024-02-10'
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    phone: '+54 9 11 2345-6789',
    location: 'Córdoba, Argentina',
    availability: 'Marzo 2024',
    technicalSkills: ['Python', 'SQL', 'Pandas', 'Matplotlib'],
    softSkills: ['Análisis crítico', 'Atención al detalle', 'Resolución de problemas'],
    interests: ['Ciencia de datos', 'Machine Learning', 'Estadística'],
    experience: [
      {
        position: 'Analista de Datos',
        company: 'DataCorp',
        period: '2021-2024',
        description: 'Análisis de datos y generación de reportes'
      }
    ],
    suitabilityPercentage: 92,
    profileId: 2,
    vacancyId: 2,
    appliedAt: '2024-02-12'
  },
  {
    id: 3,
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '+54 9 11 3456-7890',
    location: 'Rosario, Argentina',
    availability: 'Inmediata',
    technicalSkills: ['Figma', 'Adobe XD', 'Sketch', 'Principios UX'],
    softSkills: ['Creatividad', 'Empatía', 'Comunicación', 'Colaboración'],
    interests: ['Diseño centrado en el usuario', 'Innovación', 'Tendencias de diseño'],
    experience: [
      {
        position: 'Diseñadora UX/UI',
        company: 'DesignStudio',
        period: '2020-2024',
        description: 'Diseño de interfaces y experiencias de usuario'
      }
    ],
    suitabilityPercentage: 88,
    profileId: 3,
    vacancyId: 3,
    appliedAt: '2024-02-08'
  }
];

// Datos mockeados para respuestas del chatbot
const mockChatbotResponses = [
  '¡Hola! Soy el asistente virtual del Sistema de Gestión de Talentos. ¿En qué puedo ayudarte?',
  'Puedo ayudarte a encontrar perfiles profesionales, revisar vacantes disponibles o responder preguntas sobre el sistema.',
  'Para buscar perfiles, puedes usar los filtros en la página de perfiles o navegar por las categorías disponibles.',
  'Las vacantes se actualizan regularmente. Te recomiendo revisar el panel de vacantes para ver las últimas oportunidades.',
  '¿Te interesa algún perfil específico? Puedo darte más información sobre los requisitos y beneficios.',
  'El sistema está diseñado para conectar estudiantes con oportunidades laborales relevantes a su perfil académico.',
  '¿Hay algo más en lo que pueda ayudarte?'
];

// Funciones de la API
export const getProfiles = async (filters = {}) => {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredProfiles = [...mockProfiles];
  
  if (filters.area) {
    filteredProfiles = filteredProfiles.filter(profile => 
      profile.area.toLowerCase().includes(filters.area.toLowerCase())
    );
  }
  
  if (filters.career) {
    filteredProfiles = filteredProfiles.filter(profile => 
      profile.career.toLowerCase().includes(filters.career.toLowerCase())
    );
  }
  
  if (filters.experienceLevel) {
    filteredProfiles = filteredProfiles.filter(profile => 
      profile.experienceLevel === filters.experienceLevel
    );
  }
  
  return { data: filteredProfiles };
};

export const getProfileById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const profile = mockProfiles.find(p => p.id === parseInt(id));
  if (!profile) {
    throw new Error('Perfil no encontrado');
  }
  
  // Obtener candidatos que coinciden con este perfil
  const matchingCandidates = mockCandidates.filter(candidate => 
    candidate.profileId === parseInt(id)
  );
  
  return { 
    data: { 
      ...profile, 
      matchingCandidates 
    } 
  };
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
