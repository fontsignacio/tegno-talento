/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function clearDatabase() {
  // Orden para respetar claves foráneas
  await prisma.vacante_habilidad.deleteMany();
  await prisma.vacante.deleteMany();
  await prisma.empleado_respuesta_formulario.deleteMany();
  await prisma.empleado_habilidad.deleteMany();
  await prisma.empleado.deleteMany();
  await prisma.puesto.deleteMany();
  await prisma.habilidad.deleteMany();
  await prisma.area.deleteMany();
}

async function main() {
  await clearDatabase();

  // Áreas de trabajo
  const areas = await prisma.$transaction([
    prisma.area.create({ data: { nombre: "Tecnología" } }),
    prisma.area.create({ data: { nombre: "Análisis" } }),
    prisma.area.create({ data: { nombre: "Diseño" } }),
    prisma.area.create({ data: { nombre: "Ciberseguridad" } }),
    prisma.area.create({ data: { nombre: "DevOps" } }),
    prisma.area.create({ data: { nombre: "Gestión de Proyectos" } }),
  ]);

  const [tecnologia, analisis, diseno, ciberseguridad, devops, gestion] = areas;

  // Habilidades técnicas y blandas
  const habilidades = await prisma.$transaction([
    // Frontend
    prisma.habilidad.create({ data: { nombre: "React", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Vue.js", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Angular", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "JavaScript", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "TypeScript", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "HTML/CSS", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "SASS/SCSS", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Tailwind CSS", tipo: "tecnica" } }),
    
    // Backend
    prisma.habilidad.create({ data: { nombre: "Node.js", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Python", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Java", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "C#", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "PHP", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Go", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Rust", tipo: "tecnica" } }),
    
    // Bases de datos
    prisma.habilidad.create({ data: { nombre: "SQL", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "PostgreSQL", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "MySQL", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "MongoDB", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Redis", tipo: "tecnica" } }),
    
    // DevOps y Cloud
    prisma.habilidad.create({ data: { nombre: "Docker", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Kubernetes", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "AWS", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Azure", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Google Cloud", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Terraform", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Jenkins", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "GitLab CI/CD", tipo: "tecnica" } }),
    
    // Herramientas de desarrollo
    prisma.habilidad.create({ data: { nombre: "Git", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "GitHub", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "GitLab", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Jira", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Confluence", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Slack", tipo: "tecnica" } }),
    
    // Testing
    prisma.habilidad.create({ data: { nombre: "Jest", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Cypress", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Selenium", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Postman", tipo: "tecnica" } }),
    
    // Diseño y UX
    prisma.habilidad.create({ data: { nombre: "Figma", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Adobe XD", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Sketch", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Principios de UX", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "UI Design", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Prototipado", tipo: "tecnica" } }),
    
    // Ciberseguridad
    prisma.habilidad.create({ data: { nombre: "Ethical Hacking", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "OWASP", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Penetration Testing", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Security Auditing", tipo: "tecnica" } }),
    
    // Habilidades blandas
    prisma.habilidad.create({ data: { nombre: "Pensamiento analítico", tipo: "blanda" } }),
    prisma.habilidad.create({ data: { nombre: "Resolución de problemas", tipo: "blanda" } }),
    prisma.habilidad.create({ data: { nombre: "Trabajo en equipo", tipo: "blanda" } }),
    prisma.habilidad.create({ data: { nombre: "Comunicación", tipo: "blanda" } }),
    prisma.habilidad.create({ data: { nombre: "Liderazgo", tipo: "blanda" } }),
    prisma.habilidad.create({ data: { nombre: "Adaptabilidad", tipo: "blanda" } }),
    prisma.habilidad.create({ data: { nombre: "Creatividad", tipo: "blanda" } }),
    prisma.habilidad.create({ data: { nombre: "Gestión del tiempo", tipo: "blanda" } }),
    prisma.habilidad.create({ data: { nombre: "Atención al detalle", tipo: "blanda" } }),
    prisma.habilidad.create({ data: { nombre: "Pensamiento crítico", tipo: "blanda" } }),
  ]);

  const byName = (name) => habilidades.find((h) => h.nombre === name);

  // Puestos de trabajo
  const puestos = await prisma.$transaction([
    // Tecnología
    prisma.puesto.create({
      data: {
        nombre: "Programador/a - Desarrollador/a de Software",
        descripcion: "Desarrollo de aplicaciones web y móviles con tecnologías modernas",
        area_id: tecnologia.id_area,
      },
    }),
    prisma.puesto.create({
      data: {
        nombre: "Desarrollador/a Frontend Senior",
        descripcion: "Especialista en interfaces de usuario y experiencia de usuario",
        area_id: tecnologia.id_area,
      },
    }),
    prisma.puesto.create({
      data: {
        nombre: "Desarrollador/a Backend",
        descripcion: "Desarrollo de APIs y servicios backend robustos",
        area_id: tecnologia.id_area,
      },
    }),
    prisma.puesto.create({
      data: {
        nombre: "Desarrollador/a Full Stack",
        descripcion: "Desarrollo completo de aplicaciones web",
        area_id: tecnologia.id_area,
      },
    }),
    
    // Análisis
    prisma.puesto.create({
      data: {
        nombre: "Analista de Sistemas",
        descripcion: "Análisis e interpretación de datos para la toma de decisiones",
        area_id: analisis.id_area,
      },
    }),
    prisma.puesto.create({
      data: {
        nombre: "Especialista en IA / Ciencia de Datos",
        descripcion: "Desarrollo de modelos de machine learning y análisis predictivo",
        area_id: analisis.id_area,
      },
    }),
    prisma.puesto.create({
      data: {
        nombre: "Analista de Datos Senior",
        descripcion: "Análisis avanzado de datos y visualización",
        area_id: analisis.id_area,
      },
    }),
    
    // Diseño
    prisma.puesto.create({
      data: {
        nombre: "Diseñador/a UX/UI",
        descripcion: "Diseño de experiencias de usuario centradas en el usuario",
        area_id: diseno.id_area,
      },
    }),
    prisma.puesto.create({
      data: {
        nombre: "Tester / QA (Aseguramiento de la Calidad)",
        descripcion: "Garantizar la calidad del software mediante pruebas exhaustivas",
        area_id: diseno.id_area,
      },
    }),
    
    // Ciberseguridad
    prisma.puesto.create({
      data: {
        nombre: "Especialista en Ciberseguridad",
        descripcion: "Protección de sistemas y datos contra amenazas cibernéticas",
        area_id: ciberseguridad.id_area,
      },
    }),
    prisma.puesto.create({
      data: {
        nombre: "Analista de Seguridad",
        descripcion: "Monitoreo y análisis de amenazas de seguridad",
        area_id: ciberseguridad.id_area,
      },
    }),
    
    // DevOps
    prisma.puesto.create({
      data: {
        nombre: "Ingeniero/a DevOps",
        descripcion: "Automatización de procesos de desarrollo y despliegue",
        area_id: devops.id_area,
      },
    }),
    prisma.puesto.create({
      data: {
        nombre: "Administrador/a de Sistemas y Redes",
        descripcion: "Gestión y mantenimiento de infraestructura tecnológica",
        area_id: devops.id_area,
      },
    }),
    
    // Gestión
    prisma.puesto.create({
      data: {
        nombre: "Líder de Proyectos en TI",
        descripcion: "Coordinación y gestión de proyectos tecnológicos",
        area_id: gestion.id_area,
      },
    }),
    prisma.puesto.create({
      data: {
        nombre: "Scrum Master",
        descripcion: "Facilitación de metodologías ágiles en equipos de desarrollo",
        area_id: gestion.id_area,
      },
    }),
  ]);

  const [
    devSoftware, devFrontendSenior, devBackend, devFullStack,
    analistaSistemas, especialistaIA, analistaDatosSenior,
    diseniadorUX, testerQA,
    especialistaCiberseguridad, analistaSeguridad,
    ingenieroDevOps, adminSistemas,
    liderProyectos, scrumMaster
  ] = puestos;

  // Vacantes con diferentes niveles y requisitos
  const vacantes = await prisma.$transaction([
    // Frontend Junior
    prisma.vacante.create({
      data: {
        descripcion: "Desarrollador Frontend Junior - React",
        puesto_id: devSoftware.id_puesto,
        peso_experiencia: 0.6,
        peso_educacion: 0.4,
        experiencia_req: 1,
        nivel_educ_req: 1,
        puntaje_corte: 0.7,
      },
    }),
    
    // Frontend Senior
    prisma.vacante.create({
      data: {
        descripcion: "Desarrollador Frontend Senior - React/TypeScript",
        puesto_id: devFrontendSenior.id_puesto,
        peso_experiencia: 0.7,
        peso_educacion: 0.3,
        experiencia_req: 5,
        nivel_educ_req: 2,
        puntaje_corte: 0.8,
      },
    }),
    
    // Backend
    prisma.vacante.create({
      data: {
        descripcion: "Desarrollador Backend - Node.js/Python",
        puesto_id: devBackend.id_puesto,
        peso_experiencia: 0.6,
        peso_educacion: 0.4,
        experiencia_req: 3,
        nivel_educ_req: 2,
        puntaje_corte: 0.75,
      },
    }),
    
    // Full Stack
    prisma.vacante.create({
      data: {
        descripcion: "Desarrollador Full Stack - MERN Stack",
        puesto_id: devFullStack.id_puesto,
        peso_experiencia: 0.5,
        peso_educacion: 0.5,
        experiencia_req: 4,
        nivel_educ_req: 2,
        puntaje_corte: 0.8,
      },
    }),
    
    // Analista de Sistemas
    prisma.vacante.create({
      data: {
        descripcion: "Analista de Sistemas Semi-Senior",
        puesto_id: analistaSistemas.id_puesto,
        peso_experiencia: 0.5,
        peso_educacion: 0.5,
        experiencia_req: 4,
        nivel_educ_req: 2,
        puntaje_corte: 0.75,
      },
    }),
    
    // Especialista en IA
    prisma.vacante.create({
      data: {
        descripcion: "Especialista en IA/ML - Python/TensorFlow",
        puesto_id: especialistaIA.id_puesto,
        peso_experiencia: 0.6,
        peso_educacion: 0.4,
        experiencia_req: 3,
        nivel_educ_req: 3,
        puntaje_corte: 0.85,
      },
    }),
    
    // UX/UI Designer
    prisma.vacante.create({
      data: {
        descripcion: "Diseñador UX/UI - Figma/Adobe XD",
        puesto_id: diseniadorUX.id_puesto,
        peso_experiencia: 0.5,
        peso_educacion: 0.5,
        experiencia_req: 2,
        nivel_educ_req: 2,
        puntaje_corte: 0.7,
      },
    }),
    
    // QA Tester
    prisma.vacante.create({
      data: {
        descripcion: "QA Tester - Selenium/Cypress",
        puesto_id: testerQA.id_puesto,
        peso_experiencia: 0.6,
        peso_educacion: 0.4,
        experiencia_req: 2,
        nivel_educ_req: 1,
        puntaje_corte: 0.65,
      },
    }),
    
    // Ciberseguridad
    prisma.vacante.create({
      data: {
        descripcion: "Especialista en Ciberseguridad",
        puesto_id: especialistaCiberseguridad.id_puesto,
        peso_experiencia: 0.7,
        peso_educacion: 0.3,
        experiencia_req: 4,
        nivel_educ_req: 2,
        puntaje_corte: 0.8,
      },
    }),
    
    // DevOps
    prisma.vacante.create({
      data: {
        descripcion: "Ingeniero DevOps - AWS/Docker/K8s",
        puesto_id: ingenieroDevOps.id_puesto,
        peso_experiencia: 0.6,
        peso_educacion: 0.4,
        experiencia_req: 3,
        nivel_educ_req: 2,
        puntaje_corte: 0.8,
      },
    }),
    
    // Líder de Proyectos
    prisma.vacante.create({
      data: {
        descripcion: "Líder de Proyectos TI - Scrum Master",
        puesto_id: liderProyectos.id_puesto,
        peso_experiencia: 0.5,
        peso_educacion: 0.5,
        experiencia_req: 5,
        nivel_educ_req: 2,
        puntaje_corte: 0.75,
      },
    }),
  ]);

  // Requisitos de habilidades para vacantes
  await prisma.$transaction([
    // Frontend Junior
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[0].id_vacante, habilidad_id: byName("React").id_habilidad, nivel_requerido: 2, critica: true, peso: 0.4 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[0].id_vacante, habilidad_id: byName("JavaScript").id_habilidad, nivel_requerido: 2, critica: true, peso: 0.3 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[0].id_vacante, habilidad_id: byName("HTML/CSS").id_habilidad, nivel_requerido: 2, critica: false, peso: 0.2 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[0].id_vacante, habilidad_id: byName("Git").id_habilidad, nivel_requerido: 1, critica: false, peso: 0.1 } }),
    
    // Frontend Senior
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[1].id_vacante, habilidad_id: byName("React").id_habilidad, nivel_requerido: 4, critica: true, peso: 0.3 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[1].id_vacante, habilidad_id: byName("TypeScript").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[1].id_vacante, habilidad_id: byName("JavaScript").id_habilidad, nivel_requerido: 4, critica: true, peso: 0.2 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[1].id_vacante, habilidad_id: byName("Liderazgo").id_habilidad, nivel_requerido: 2, critica: false, peso: 0.15 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[1].id_vacante, habilidad_id: byName("Trabajo en equipo").id_habilidad, nivel_requerido: 3, critica: false, peso: 0.1 } }),
    
    // Backend
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[2].id_vacante, habilidad_id: byName("Node.js").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.3 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[2].id_vacante, habilidad_id: byName("Python").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.3 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[2].id_vacante, habilidad_id: byName("SQL").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[2].id_vacante, habilidad_id: byName("Pensamiento analítico").id_habilidad, nivel_requerido: 3, critica: false, peso: 0.15 } }),
    
    // Full Stack
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[3].id_vacante, habilidad_id: byName("React").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.2 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[3].id_vacante, habilidad_id: byName("Node.js").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.2 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[3].id_vacante, habilidad_id: byName("MongoDB").id_habilidad, nivel_requerido: 2, critica: true, peso: 0.15 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[3].id_vacante, habilidad_id: byName("JavaScript").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.2 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[3].id_vacante, habilidad_id: byName("Adaptabilidad").id_habilidad, nivel_requerido: 3, critica: false, peso: 0.15 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[3].id_vacante, habilidad_id: byName("Resolución de problemas").id_habilidad, nivel_requerido: 3, critica: false, peso: 0.1 } }),
    
    // Analista de Sistemas
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[4].id_vacante, habilidad_id: byName("SQL").id_habilidad, nivel_requerido: 4, critica: true, peso: 0.3 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[4].id_vacante, habilidad_id: byName("Python").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[4].id_vacante, habilidad_id: byName("Pensamiento analítico").id_habilidad, nivel_requerido: 4, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[4].id_vacante, habilidad_id: byName("Comunicación").id_habilidad, nivel_requerido: 3, critica: false, peso: 0.2 } }),
    
    // Especialista en IA
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[5].id_vacante, habilidad_id: byName("Python").id_habilidad, nivel_requerido: 4, critica: true, peso: 0.3 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[5].id_vacante, habilidad_id: byName("SQL").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.2 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[5].id_vacante, habilidad_id: byName("Pensamiento analítico").id_habilidad, nivel_requerido: 4, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[5].id_vacante, habilidad_id: byName("Creatividad").id_habilidad, nivel_requerido: 3, critica: false, peso: 0.15 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[5].id_vacante, habilidad_id: byName("Pensamiento crítico").id_habilidad, nivel_requerido: 3, critica: false, peso: 0.1 } }),
    
    // UX/UI Designer
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[6].id_vacante, habilidad_id: byName("Figma").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.3 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[6].id_vacante, habilidad_id: byName("Principios de UX").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[6].id_vacante, habilidad_id: byName("UI Design").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.2 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[6].id_vacante, habilidad_id: byName("Creatividad").id_habilidad, nivel_requerido: 4, critica: false, peso: 0.15 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[6].id_vacante, habilidad_id: byName("Comunicación").id_habilidad, nivel_requerido: 3, critica: false, peso: 0.1 } }),
    
    // QA Tester
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[7].id_vacante, habilidad_id: byName("Selenium").id_habilidad, nivel_requerido: 2, critica: true, peso: 0.3 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[7].id_vacante, habilidad_id: byName("Cypress").id_habilidad, nivel_requerido: 2, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[7].id_vacante, habilidad_id: byName("Atención al detalle").id_habilidad, nivel_requerido: 4, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[7].id_vacante, habilidad_id: byName("Pensamiento analítico").id_habilidad, nivel_requerido: 3, critica: false, peso: 0.2 } }),
    
    // Ciberseguridad
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[8].id_vacante, habilidad_id: byName("Ethical Hacking").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.3 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[8].id_vacante, habilidad_id: byName("OWASP").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[8].id_vacante, habilidad_id: byName("Penetration Testing").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[8].id_vacante, habilidad_id: byName("Pensamiento crítico").id_habilidad, nivel_requerido: 4, critica: false, peso: 0.2 } }),
    
    // DevOps
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[9].id_vacante, habilidad_id: byName("Docker").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[9].id_vacante, habilidad_id: byName("Kubernetes").id_habilidad, nivel_requerido: 2, critica: true, peso: 0.2 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[9].id_vacante, habilidad_id: byName("AWS").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[9].id_vacante, habilidad_id: byName("Terraform").id_habilidad, nivel_requerido: 2, critica: false, peso: 0.15 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[9].id_vacante, habilidad_id: byName("Adaptabilidad").id_habilidad, nivel_requerido: 3, critica: false, peso: 0.15 } }),
    
    // Líder de Proyectos
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[10].id_vacante, habilidad_id: byName("Liderazgo").id_habilidad, nivel_requerido: 4, critica: true, peso: 0.3 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[10].id_vacante, habilidad_id: byName("Comunicación").id_habilidad, nivel_requerido: 4, critica: true, peso: 0.25 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[10].id_vacante, habilidad_id: byName("Trabajo en equipo").id_habilidad, nivel_requerido: 4, critica: true, peso: 0.2 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[10].id_vacante, habilidad_id: byName("Gestión del tiempo").id_habilidad, nivel_requerido: 3, critica: false, peso: 0.15 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vacantes[10].id_vacante, habilidad_id: byName("Adaptabilidad").id_habilidad, nivel_requerido: 3, critica: false, peso: 0.1 } }),
  ]);

  // Empleados con perfiles diversos
  const empleados = await prisma.$transaction([
    // Desarrollador Frontend Junior
    prisma.empleado.create({
      data: {
        nombre: "María González",
        correo: "maria.gonzalez@example.com",
        experiencia: 1,
        nivel_educativo: 1,
        puesto_id: devSoftware.id_puesto,
        tipo_empleado: "INTERNO",
      },
    }),
    
    // Desarrollador Frontend Senior
    prisma.empleado.create({
      data: {
        nombre: "Carlos Rodríguez",
        correo: "carlos.rodriguez@example.com",
        experiencia: 6,
        nivel_educativo: 2,
        puesto_id: devFrontendSenior.id_puesto,
        tipo_empleado: "INTERNO",
      },
    }),
    
    // Desarrollador Backend
    prisma.empleado.create({
      data: {
        nombre: "Ana Martínez",
        correo: "ana.martinez@example.com",
        experiencia: 4,
        nivel_educativo: 2,
        puesto_id: devBackend.id_puesto,
        tipo_empleado: "INTERNO",
      },
    }),
    
    // Desarrollador Full Stack
    prisma.empleado.create({
      data: {
        nombre: "Luis Fernández",
        correo: "luis.fernandez@example.com",
        experiencia: 5,
        nivel_educativo: 2,
        puesto_id: devFullStack.id_puesto,
        tipo_empleado: "INTERNO",
      },
    }),
    
    // Analista de Sistemas
    prisma.empleado.create({
      data: {
        nombre: "Sofia Herrera",
        correo: "sofia.herrera@example.com",
        experiencia: 3,
        nivel_educativo: 2,
        puesto_id: analistaSistemas.id_puesto,
        tipo_empleado: "INTERNO",
      },
    }),
    
    // Especialista en IA
    prisma.empleado.create({
      data: {
        nombre: "Diego Morales",
        correo: "diego.morales@example.com",
        experiencia: 4,
        nivel_educativo: 3,
        puesto_id: especialistaIA.id_puesto,
        tipo_empleado: "INTERNO",
      },
    }),
    
    // Diseñador UX/UI
    prisma.empleado.create({
      data: {
        nombre: "Valentina Castro",
        correo: "valentina.castro@example.com",
        experiencia: 2,
        nivel_educativo: 2,
        puesto_id: diseniadorUX.id_puesto,
        tipo_empleado: "INTERNO",
      },
    }),
    
    // QA Tester
    prisma.empleado.create({
      data: {
        nombre: "Roberto Silva",
        correo: "roberto.silva@example.com",
        experiencia: 3,
        nivel_educativo: 1,
        puesto_id: testerQA.id_puesto,
        tipo_empleado: "INTERNO",
      },
    }),
    
    // Especialista en Ciberseguridad
    prisma.empleado.create({
      data: {
        nombre: "Camila Vargas",
        correo: "camila.vargas@example.com",
        experiencia: 5,
        nivel_educativo: 2,
        puesto_id: especialistaCiberseguridad.id_puesto,
        tipo_empleado: "INTERNO",
      },
    }),
    
    // Ingeniero DevOps
    prisma.empleado.create({
      data: {
        nombre: "Andrés Jiménez",
        correo: "andres.jimenez@example.com",
        experiencia: 4,
        nivel_educativo: 2,
        puesto_id: ingenieroDevOps.id_puesto,
        tipo_empleado: "INTERNO",
      },
    }),
    
    // Líder de Proyectos
    prisma.empleado.create({
      data: {
        nombre: "Patricia López",
        correo: "patricia.lopez@example.com",
        experiencia: 7,
        nivel_educativo: 2,
        puesto_id: liderProyectos.id_puesto,
        tipo_empleado: "INTERNO",
      },
    }),
    
    // Empleados externos (candidatos)
    prisma.empleado.create({
      data: {
        nombre: "Gabriel Torres",
        correo: "gabriel.torres@example.com",
        experiencia: 2,
        nivel_educativo: 1,
        puesto_id: devSoftware.id_puesto,
        tipo_empleado: "EXTERNO",
      },
    }),
    
    prisma.empleado.create({
      data: {
        nombre: "Isabella Ruiz",
        correo: "isabella.ruiz@example.com",
        experiencia: 1,
        nivel_educativo: 1,
        puesto_id: diseniadorUX.id_puesto,
        tipo_empleado: "EXTERNO",
      },
    }),
    
    prisma.empleado.create({
      data: {
        nombre: "Sebastián Moreno",
        correo: "sebastian.moreno@example.com",
        experiencia: 3,
        nivel_educativo: 2,
        puesto_id: analistaSistemas.id_puesto,
        tipo_empleado: "EXTERNO",
      },
    }),
  ]);

  // Habilidades de empleados
  await prisma.$transaction([
    // María González - Frontend Junior
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[0].id_empleado, habilidad_id: byName("React").id_habilidad, nivel_habilidad: 2 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[0].id_empleado, habilidad_id: byName("JavaScript").id_habilidad, nivel_habilidad: 2 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[0].id_empleado, habilidad_id: byName("HTML/CSS").id_habilidad, nivel_habilidad: 3 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[0].id_empleado, habilidad_id: byName("Git").id_habilidad, nivel_habilidad: 1 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[0].id_empleado, habilidad_id: byName("Trabajo en equipo").id_habilidad, nivel_habilidad: 3 } }),
    
    // Carlos Rodríguez - Frontend Senior
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[1].id_empleado, habilidad_id: byName("React").id_habilidad, nivel_habilidad: 5 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[1].id_empleado, habilidad_id: byName("TypeScript").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[1].id_empleado, habilidad_id: byName("JavaScript").id_habilidad, nivel_habilidad: 5 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[1].id_empleado, habilidad_id: byName("Liderazgo").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[1].id_empleado, habilidad_id: byName("Trabajo en equipo").id_habilidad, nivel_habilidad: 4 } }),
    
    // Ana Martínez - Backend
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[2].id_empleado, habilidad_id: byName("Node.js").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[2].id_empleado, habilidad_id: byName("Python").id_habilidad, nivel_habilidad: 3 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[2].id_empleado, habilidad_id: byName("SQL").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[2].id_empleado, habilidad_id: byName("Pensamiento analítico").id_habilidad, nivel_habilidad: 4 } }),
    
    // Luis Fernández - Full Stack
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[3].id_empleado, habilidad_id: byName("React").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[3].id_empleado, habilidad_id: byName("Node.js").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[3].id_empleado, habilidad_id: byName("MongoDB").id_habilidad, nivel_habilidad: 3 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[3].id_empleado, habilidad_id: byName("JavaScript").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[3].id_empleado, habilidad_id: byName("Adaptabilidad").id_habilidad, nivel_habilidad: 4 } }),
    
    // Sofia Herrera - Analista
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[4].id_empleado, habilidad_id: byName("SQL").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[4].id_empleado, habilidad_id: byName("Python").id_habilidad, nivel_habilidad: 3 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[4].id_empleado, habilidad_id: byName("Pensamiento analítico").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[4].id_empleado, habilidad_id: byName("Comunicación").id_habilidad, nivel_habilidad: 3 } }),
    
    // Diego Morales - IA
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[5].id_empleado, habilidad_id: byName("Python").id_habilidad, nivel_habilidad: 5 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[5].id_empleado, habilidad_id: byName("SQL").id_habilidad, nivel_habilidad: 3 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[5].id_empleado, habilidad_id: byName("Pensamiento analítico").id_habilidad, nivel_habilidad: 5 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[5].id_empleado, habilidad_id: byName("Creatividad").id_habilidad, nivel_habilidad: 4 } }),
    
    // Valentina Castro - UX/UI
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[6].id_empleado, habilidad_id: byName("Figma").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[6].id_empleado, habilidad_id: byName("Principios de UX").id_habilidad, nivel_habilidad: 3 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[6].id_empleado, habilidad_id: byName("UI Design").id_habilidad, nivel_habilidad: 3 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[6].id_empleado, habilidad_id: byName("Creatividad").id_habilidad, nivel_habilidad: 4 } }),
    
    // Roberto Silva - QA
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[7].id_empleado, habilidad_id: byName("Selenium").id_habilidad, nivel_habilidad: 3 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[7].id_empleado, habilidad_id: byName("Cypress").id_habilidad, nivel_habilidad: 2 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[7].id_empleado, habilidad_id: byName("Atención al detalle").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[7].id_empleado, habilidad_id: byName("Pensamiento analítico").id_habilidad, nivel_habilidad: 3 } }),
    
    // Camila Vargas - Ciberseguridad
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[8].id_empleado, habilidad_id: byName("Ethical Hacking").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[8].id_empleado, habilidad_id: byName("OWASP").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[8].id_empleado, habilidad_id: byName("Penetration Testing").id_habilidad, nivel_habilidad: 3 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[8].id_empleado, habilidad_id: byName("Pensamiento crítico").id_habilidad, nivel_habilidad: 4 } }),
    
    // Andrés Jiménez - DevOps
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[9].id_empleado, habilidad_id: byName("Docker").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[9].id_empleado, habilidad_id: byName("Kubernetes").id_habilidad, nivel_habilidad: 3 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[9].id_empleado, habilidad_id: byName("AWS").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[9].id_empleado, habilidad_id: byName("Adaptabilidad").id_habilidad, nivel_habilidad: 4 } }),
    
    // Patricia López - Líder
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[10].id_empleado, habilidad_id: byName("Liderazgo").id_habilidad, nivel_habilidad: 5 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[10].id_empleado, habilidad_id: byName("Comunicación").id_habilidad, nivel_habilidad: 5 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[10].id_empleado, habilidad_id: byName("Trabajo en equipo").id_habilidad, nivel_habilidad: 4 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[10].id_empleado, habilidad_id: byName("Gestión del tiempo").id_habilidad, nivel_habilidad: 4 } }),
    
    // Gabriel Torres - Externo Frontend
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[11].id_empleado, habilidad_id: byName("React").id_habilidad, nivel_habilidad: 2 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[11].id_empleado, habilidad_id: byName("JavaScript").id_habilidad, nivel_habilidad: 2 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[11].id_empleado, habilidad_id: byName("HTML/CSS").id_habilidad, nivel_habilidad: 3 } }),
    
    // Isabella Ruiz - Externa UX
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[12].id_empleado, habilidad_id: byName("Figma").id_habilidad, nivel_habilidad: 2 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[12].id_empleado, habilidad_id: byName("Principios de UX").id_habilidad, nivel_habilidad: 2 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[12].id_empleado, habilidad_id: byName("Creatividad").id_habilidad, nivel_habilidad: 3 } }),
    
    // Sebastián Moreno - Externo Analista
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[13].id_empleado, habilidad_id: byName("SQL").id_habilidad, nivel_habilidad: 3 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[13].id_empleado, habilidad_id: byName("Python").id_habilidad, nivel_habilidad: 2 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: empleados[13].id_empleado, habilidad_id: byName("Pensamiento analítico").id_habilidad, nivel_habilidad: 3 } }),
  ]);

  // Respuestas de formularios para empleados
  await prisma.$transaction([
    // María González
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[0].id_empleado,
        disfrute_logica: 3,
        detalle: 4,
        liderazgo: 2,
        curiosidad_tecnologica: 4,
        motivacion: "crear",
      },
    }),
    
    // Carlos Rodríguez
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[1].id_empleado,
        disfrute_logica: 5,
        detalle: 4,
        liderazgo: 4,
        curiosidad_tecnologica: 5,
        motivacion: "crear",
      },
    }),
    
    // Ana Martínez
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[2].id_empleado,
        disfrute_logica: 4,
        detalle: 5,
        liderazgo: 3,
        curiosidad_tecnologica: 4,
        motivacion: "crear",
      },
    }),
    
    // Luis Fernández
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[3].id_empleado,
        disfrute_logica: 4,
        detalle: 3,
        liderazgo: 3,
        curiosidad_tecnologica: 5,
        motivacion: "crear",
      },
    }),
    
    // Sofia Herrera
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[4].id_empleado,
        disfrute_logica: 5,
        detalle: 5,
        liderazgo: 2,
        curiosidad_tecnologica: 4,
        motivacion: "crear",
      },
    }),
    
    // Diego Morales
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[5].id_empleado,
        disfrute_logica: 5,
        detalle: 5,
        liderazgo: 3,
        curiosidad_tecnologica: 5,
        motivacion: "crear",
      },
    }),
    
    // Valentina Castro
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[6].id_empleado,
        disfrute_logica: 3,
        detalle: 4,
        liderazgo: 2,
        curiosidad_tecnologica: 3,
        motivacion: "crear",
      },
    }),
    
    // Roberto Silva
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[7].id_empleado,
        disfrute_logica: 4,
        detalle: 5,
        liderazgo: 2,
        curiosidad_tecnologica: 3,
        motivacion: "arreglar",
      },
    }),
    
    // Camila Vargas
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[8].id_empleado,
        disfrute_logica: 4,
        detalle: 5,
        liderazgo: 3,
        curiosidad_tecnologica: 4,
        motivacion: "arreglar",
      },
    }),
    
    // Andrés Jiménez
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[9].id_empleado,
        disfrute_logica: 4,
        detalle: 4,
        liderazgo: 3,
        curiosidad_tecnologica: 5,
        motivacion: "arreglar",
      },
    }),
    
    // Patricia López
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[10].id_empleado,
        disfrute_logica: 4,
        detalle: 3,
        liderazgo: 5,
        curiosidad_tecnologica: 3,
        motivacion: "coordinar",
      },
    }),
    
    // Gabriel Torres - Externo
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[11].id_empleado,
        disfrute_logica: 4,
        detalle: 3,
        liderazgo: 2,
        curiosidad_tecnologica: 4,
        motivacion: "crear",
      },
    }),
    
    // Isabella Ruiz - Externa
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[12].id_empleado,
        disfrute_logica: 3,
        detalle: 4,
        liderazgo: 2,
        curiosidad_tecnologica: 3,
        motivacion: "crear",
      },
    }),
    
    // Sebastián Moreno - Externo
    prisma.empleado_respuesta_formulario.create({
      data: {
        empleado_id: empleados[13].id_empleado,
        disfrute_logica: 4,
        detalle: 4,
        liderazgo: 2,
        curiosidad_tecnologica: 4,
        motivacion: "crear",
      },
    }),
  ]);

  console.log("✅ Seed completado correctamente");
  console.log(`📊 Datos creados:`);
  console.log(`   - ${areas.length} áreas`);
  console.log(`   - ${habilidades.length} habilidades`);
  console.log(`   - ${puestos.length} puestos`);
  console.log(`   - ${vacantes.length} vacantes`);
  console.log(`   - ${empleados.length} empleados`);
  console.log(`   - ${empleados.filter(e => e.tipo_empleado === 'EXTERNO').length} candidatos externos`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });



