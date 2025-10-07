// Datos mockeados para vacantes
export const mockVacancies = [
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
