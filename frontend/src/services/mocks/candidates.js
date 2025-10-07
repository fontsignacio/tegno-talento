// Datos mockeados para candidatos
export const mockCandidates = [
  // Candidatos para Desarrollo Frontend
  {
    id: 1,
    name: 'María González',
    email: 'maria.gonzalez@email.com',
    phone: '+54 9 11 1234-5678',
    location: 'Buenos Aires, Argentina',
    availability: 'Inmediata',
    technicalSkills: ['React', 'JavaScript', 'CSS', 'Git', 'TypeScript', 'Redux'],
    softSkills: ['Trabajo en equipo', 'Comunicación', 'Proactividad', 'Liderazgo'],
    interests: ['Desarrollo web', 'Tecnologías emergentes', 'Aprendizaje continuo', 'Open Source'],
    experience: [
      {
        position: 'Desarrollador Frontend Senior',
        company: 'TechCorp',
        period: '2022-2024',
        description: 'Desarrollo de aplicaciones web con React y liderazgo de equipo'
      },
      {
        position: 'Desarrollador Frontend',
        company: 'StartupXYZ',
        period: '2020-2022',
        description: 'Desarrollo de interfaces de usuario y optimización de performance'
      }
    ],
    suitabilityPercentage: 85,
    profileId: 1,
    vacancyId: 1,
    appliedAt: '2024-02-10'
  },
  {
    id: 4,
    name: 'Diego Fernández',
    email: 'diego.fernandez@email.com',
    phone: '+54 9 11 4567-8901',
    location: 'Mendoza, Argentina',
    availability: '1-2 semanas',
    technicalSkills: ['Vue.js', 'JavaScript', 'CSS3', 'SASS', 'Webpack', 'Jest'],
    softSkills: ['Resolución de problemas', 'Adaptabilidad', 'Mentoría', 'Colaboración'],
    interests: ['Arquitectura frontend', 'Testing', 'Performance', 'Accesibilidad web'],
    experience: [
      {
        position: 'Desarrollador Frontend',
        company: 'DigitalAgency',
        period: '2021-2024',
        description: 'Desarrollo de aplicaciones Vue.js y optimización de rendimiento'
      }
    ],
    suitabilityPercentage: 78,
    profileId: 1,
    vacancyId: 1,
    appliedAt: '2024-02-15'
  },
  {
    id: 5,
    name: 'Sofia López',
    email: 'sofia.lopez@email.com',
    phone: '+54 9 11 5678-9012',
    location: 'La Plata, Argentina',
    availability: 'Inmediata',
    technicalSkills: ['Angular', 'TypeScript', 'RxJS', 'Material Design', 'Cypress'],
    softSkills: ['Pensamiento crítico', 'Organización', 'Gestión del tiempo', 'Creatividad'],
    interests: ['Aplicaciones empresariales', 'Testing automatizado', 'Arquitectura de software'],
    experience: [
      {
        position: 'Desarrolladora Frontend',
        company: 'EnterpriseSoft',
        period: '2020-2024',
        description: 'Desarrollo de aplicaciones empresariales con Angular'
      }
    ],
    suitabilityPercentage: 82,
    profileId: 1,
    vacancyId: 1,
    appliedAt: '2024-02-18'
  },

  // Candidatos para Análisis de Datos
  {
    id: 2,
    name: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@email.com',
    phone: '+54 9 11 2345-6789',
    location: 'Córdoba, Argentina',
    availability: 'Marzo 2024',
    technicalSkills: ['Python', 'SQL', 'Pandas', 'Matplotlib', 'Scikit-learn', 'TensorFlow'],
    softSkills: ['Análisis crítico', 'Atención al detalle', 'Resolución de problemas', 'Comunicación'],
    interests: ['Ciencia de datos', 'Machine Learning', 'Estadística', 'Visualización de datos'],
    experience: [
      {
        position: 'Analista de Datos Senior',
        company: 'DataCorp',
        period: '2021-2024',
        description: 'Análisis de datos y generación de reportes para toma de decisiones'
      },
      {
        position: 'Analista de Datos',
        company: 'AnalyticsPro',
        period: '2019-2021',
        description: 'Análisis estadístico y modelado predictivo'
      }
    ],
    suitabilityPercentage: 92,
    profileId: 2,
    vacancyId: 2,
    appliedAt: '2024-02-12'
  },
  {
    id: 6,
    name: 'Laura García',
    email: 'laura.garcia@email.com',
    phone: '+54 9 11 6789-0123',
    location: 'Tucumán, Argentina',
    availability: 'Inmediata',
    technicalSkills: ['R', 'Python', 'Tableau', 'Power BI', 'SQL Server', 'Apache Spark'],
    softSkills: ['Liderazgo', 'Presentación', 'Trabajo en equipo', 'Innovación'],
    interests: ['Big Data', 'Inteligencia de Negocios', 'Análisis predictivo', 'Data Storytelling'],
    experience: [
      {
        position: 'Científica de Datos',
        company: 'BigData Solutions',
        period: '2020-2024',
        description: 'Desarrollo de modelos de machine learning y análisis de big data'
      }
    ],
    suitabilityPercentage: 89,
    profileId: 2,
    vacancyId: 2,
    appliedAt: '2024-02-20'
  },
  {
    id: 7,
    name: 'Roberto Silva',
    email: 'roberto.silva@email.com',
    phone: '+54 9 11 7890-1234',
    location: 'Salta, Argentina',
    availability: 'Abril 2024',
    technicalSkills: ['Python', 'Jupyter', 'NumPy', 'Seaborn', 'Plotly', 'Docker'],
    softSkills: ['Atención al detalle', 'Paciencia', 'Metodología', 'Documentación'],
    interests: ['Análisis exploratorio', 'Visualización de datos', 'Estadística aplicada'],
    experience: [
      {
        position: 'Analista de Datos',
        company: 'Research Institute',
        period: '2021-2024',
        description: 'Análisis de datos de investigación y generación de insights'
      }
    ],
    suitabilityPercentage: 75,
    profileId: 2,
    vacancyId: 2,
    appliedAt: '2024-02-22'
  },

  // Candidatos para Diseño UX/UI
  {
    id: 3,
    name: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    phone: '+54 9 11 3456-7890',
    location: 'Rosario, Argentina',
    availability: 'Inmediata',
    technicalSkills: ['Figma', 'Adobe XD', 'Sketch', 'Principios UX', 'Prototipado', 'InVision'],
    softSkills: ['Creatividad', 'Empatía', 'Comunicación', 'Colaboración', 'Liderazgo'],
    interests: ['Diseño centrado en el usuario', 'Innovación', 'Tendencias de diseño', 'Accesibilidad'],
    experience: [
      {
        position: 'Diseñadora UX/UI Senior',
        company: 'DesignStudio',
        period: '2020-2024',
        description: 'Diseño de interfaces y experiencias de usuario para aplicaciones móviles y web'
      },
      {
        position: 'Diseñadora Gráfica',
        company: 'Creative Agency',
        period: '2018-2020',
        description: 'Diseño gráfico y branding para diversos clientes'
      }
    ],
    suitabilityPercentage: 88,
    profileId: 3,
    vacancyId: 3,
    appliedAt: '2024-02-08'
  },
  {
    id: 8,
    name: 'Miguel Torres',
    email: 'miguel.torres@email.com',
    phone: '+54 9 11 8901-2345',
    location: 'Mar del Plata, Argentina',
    availability: '1 mes',
    technicalSkills: ['Figma', 'Adobe Creative Suite', 'Principios UX', 'HTML/CSS', 'Principios de desarrollo'],
    softSkills: ['Creatividad', 'Adaptabilidad', 'Trabajo en equipo', 'Proactividad'],
    interests: ['Diseño de productos digitales', 'Interacción humano-computadora', 'Psicología del usuario'],
    experience: [
      {
        position: 'Diseñador UX/UI',
        company: 'ProductStudio',
        period: '2021-2024',
        description: 'Diseño de productos digitales y investigación de usuarios'
      }
    ],
    suitabilityPercentage: 81,
    profileId: 3,
    vacancyId: 3,
    appliedAt: '2024-02-25'
  },
  {
    id: 9,
    name: 'Valentina Ruiz',
    email: 'valentina.ruiz@email.com',
    phone: '+54 9 11 9012-3456',
    location: 'Neuquén, Argentina',
    availability: 'Inmediata',
    technicalSkills: ['Sketch', 'Figma', 'Adobe XD', 'Principios UX', 'Prototipado', 'User Testing'],
    softSkills: ['Empatía', 'Comunicación', 'Resolución de problemas', 'Colaboración'],
    interests: ['Diseño inclusivo', 'Accesibilidad', 'Diseño de servicios', 'Innovación social'],
    experience: [
      {
        position: 'Diseñadora UX',
        company: 'Social Impact Design',
        period: '2020-2024',
        description: 'Diseño de experiencias para organizaciones sin fines de lucro'
      }
    ],
    suitabilityPercentage: 86,
    profileId: 3,
    vacancyId: 3,
    appliedAt: '2024-02-28'
  },

  // Candidatos para Gestión de Proyectos
  {
    id: 10,
    name: 'Patricia Morales',
    email: 'patricia.morales@email.com',
    phone: '+54 9 11 0123-4567',
    location: 'Buenos Aires, Argentina',
    availability: 'Inmediata',
    technicalSkills: ['Jira', 'Confluence', 'Microsoft Project', 'Agile', 'Scrum', 'Kanban'],
    softSkills: ['Liderazgo', 'Comunicación', 'Organización', 'Gestión del tiempo', 'Negociación'],
    interests: ['Metodologías ágiles', 'Gestión de equipos', 'Mejora de procesos', 'Innovación'],
    experience: [
      {
        position: 'Project Manager Senior',
        company: 'Tech Solutions',
        period: '2019-2024',
        description: 'Gestión de proyectos tecnológicos y liderazgo de equipos multidisciplinarios'
      },
      {
        position: 'Scrum Master',
        company: 'Agile Consulting',
        period: '2017-2019',
        description: 'Implementación de metodologías ágiles en equipos de desarrollo'
      }
    ],
    suitabilityPercentage: 94,
    profileId: 4,
    vacancyId: 4,
    appliedAt: '2024-03-01'
  },
  {
    id: 11,
    name: 'Fernando Castro',
    email: 'fernando.castro@email.com',
    phone: '+54 9 11 1234-5679',
    location: 'Córdoba, Argentina',
    availability: '2-3 semanas',
    technicalSkills: ['PMI', 'Prince2', 'Microsoft Project', 'Trello', 'Asana', 'Slack'],
    softSkills: ['Planificación', 'Comunicación', 'Resolución de conflictos', 'Mentoría'],
    interests: ['Gestión estratégica', 'Transformación digital', 'Liderazgo', 'Desarrollo organizacional'],
    experience: [
      {
        position: 'Project Manager',
        company: 'Enterprise Corp',
        period: '2020-2024',
        description: 'Gestión de proyectos de transformación digital y mejora de procesos'
      }
    ],
    suitabilityPercentage: 87,
    profileId: 4,
    vacancyId: 4,
    appliedAt: '2024-03-03'
  },

  // Candidatos para Desarrollo Backend
  {
    id: 12,
    name: 'Alejandro Vega',
    email: 'alejandro.vega@email.com',
    phone: '+54 9 11 2345-6780',
    location: 'Buenos Aires, Argentina',
    availability: 'Inmediata',
    technicalSkills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS'],
    softSkills: ['Resolución de problemas', 'Trabajo en equipo', 'Comunicación', 'Proactividad'],
    interests: ['Arquitectura de software', 'Microservicios', 'DevOps', 'Seguridad'],
    experience: [
      {
        position: 'Desarrollador Backend Senior',
        company: 'Backend Solutions',
        period: '2021-2024',
        description: 'Desarrollo de APIs y servicios backend escalables'
      }
    ],
    suitabilityPercentage: 90,
    profileId: 1,
    vacancyId: 1,
    appliedAt: '2024-03-05'
  },
  {
    id: 13,
    name: 'Camila Herrera',
    email: 'camila.herrera@email.com',
    phone: '+54 9 11 3456-7891',
    location: 'Rosario, Argentina',
    availability: '1-2 semanas',
    technicalSkills: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'Kubernetes', 'Git'],
    softSkills: ['Liderazgo técnico', 'Mentoría', 'Colaboración', 'Innovación'],
    interests: ['Arquitectura de microservicios', 'Cloud computing', 'Performance optimization'],
    experience: [
      {
        position: 'Desarrolladora Backend',
        company: 'Enterprise Java',
        period: '2020-2024',
        description: 'Desarrollo de aplicaciones empresariales con Java y Spring'
      }
    ],
    suitabilityPercentage: 88,
    profileId: 1,
    vacancyId: 1,
    appliedAt: '2024-03-07'
  },

  // Candidatos para Full Stack
  {
    id: 14,
    name: 'Gabriel Mendoza',
    email: 'gabriel.mendoza@email.com',
    phone: '+54 9 11 4567-8902',
    location: 'Mendoza, Argentina',
    availability: 'Inmediata',
    technicalSkills: ['React', 'Node.js', 'MongoDB', 'Express', 'TypeScript', 'Docker'],
    softSkills: ['Versatilidad', 'Aprendizaje rápido', 'Comunicación', 'Adaptabilidad'],
    interests: ['Desarrollo full stack', 'Startups', 'Tecnologías emergentes', 'Emprendimiento'],
    experience: [
      {
        position: 'Desarrollador Full Stack',
        company: 'StartupHub',
        period: '2021-2024',
        description: 'Desarrollo completo de aplicaciones web desde frontend hasta backend'
      }
    ],
    suitabilityPercentage: 85,
    profileId: 1,
    vacancyId: 1,
    appliedAt: '2024-03-10'
  },

  // Candidatos para QA/Testing
  {
    id: 15,
    name: 'Isabel Ramírez',
    email: 'isabel.ramirez@email.com',
    phone: '+54 9 11 5678-9013',
    location: 'La Plata, Argentina',
    availability: 'Inmediata',
    technicalSkills: ['Selenium', 'Cypress', 'Jest', 'Postman', 'SQL', 'Git'],
    softSkills: ['Atención al detalle', 'Paciencia', 'Comunicación', 'Organización'],
    interests: ['Testing automatizado', 'Calidad de software', 'Metodologías ágiles', 'CI/CD'],
    experience: [
      {
        position: 'QA Engineer',
        company: 'Quality Assurance Corp',
        period: '2020-2024',
        description: 'Testing manual y automatizado de aplicaciones web y móviles'
      }
    ],
    suitabilityPercentage: 83,
    profileId: 1,
    vacancyId: 1,
    appliedAt: '2024-03-12'
  }
];
