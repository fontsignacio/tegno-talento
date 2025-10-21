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

  // Áreas
  const tecnologia = await prisma.area.create({
    data: { nombre: "Tecnología" }
  });
  const analisis = await prisma.area.create({
    data: { nombre: "Análisis" }
  });
  const diseno = await prisma.area.create({
    data: { nombre: "Diseño" }
  });

  // Habilidades
  const habilidades = await prisma.$transaction([
    prisma.habilidad.create({ data: { nombre: "React", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "JavaScript", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "HTML/CSS", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Git", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "SQL", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Python", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Pensamiento analítico", tipo: "blanda" } }),
    prisma.habilidad.create({ data: { nombre: "Figma", tipo: "tecnica" } }),
    prisma.habilidad.create({ data: { nombre: "Principios de UX", tipo: "tecnica" } }),
  ]);

  const byName = (name) => habilidades.find((h) => h.nombre === name);

  // Puestos
  const devFrontend = await prisma.puesto.create({
    data: {
      nombre: "Programador/a - Desarrollador/a de Software",
      descripcion: "Especialista en interfaces de usuario con React",
      area_id: tecnologia.id_area,
    },
  });

  const analistaDatos = await prisma.puesto.create({
    data: {
      nombre: "Analista de Sistemas",
      descripcion: "Análisis e interpretación de datos",
      area_id: analisis.id_area,
    },
  });

  const diseniadorUX = await prisma.puesto.create({
    data: {
      nombre: "Tester / QA (Aseguramiento de la Calidad)",
      descripcion: "Diseño de experiencias de usuario",
      area_id: diseno.id_area,
    },
  });
  
  const especialistaDatos = await prisma.puesto.create({
    data: {
      nombre: "Especialista en IA / Ciencia de Datos",
      descripcion: "Diseño de experiencias de usuario",
      area_id: diseno.id_area,
    },
  });

  const adminRedes = await prisma.puesto.create({
    data: {
      nombre: "Administrador/a de Sistemas y Redes",
      descripcion: "Diseño de experiencias de usuario",
      area_id: diseno.id_area,
    },
  });

  // Vacantes (una reciente por puesto)
  const vFrontend = await prisma.vacante.create({
    data: {
      descripcion: "Vacante para Frontend con React",
      puesto_id: devFrontend.id_puesto,
      peso_experiencia: 0.6,
      peso_educacion: 0.4,
      experiencia_req: 1, // Junior
      nivel_educ_req: 1,
      puntaje_corte: 0.7,
    },
  });

  const vAnalista = await prisma.vacante.create({
    data: {
      descripcion: "Vacante Analista Semi-Senior",
      puesto_id: analistaDatos.id_puesto,
      peso_experiencia: 0.5,
      peso_educacion: 0.5,
      experiencia_req: 4, // Semi-Senior
      nivel_educ_req: 2,
      puntaje_corte: 0.75,
    },
  });

  const vUX = await prisma.vacante.create({
    data: {
      descripcion: "Vacante UX Junior",
      puesto_id: diseniadorUX.id_puesto,
      peso_experiencia: 0.5,
      peso_educacion: 0.5,
      experiencia_req: 2, // Junior
      nivel_educ_req: 1,
      puntaje_corte: 0.65,
    },
  });

  // Requisitos de vacantes
  await prisma.$transaction([
    // Frontend
    prisma.vacante_habilidad.create({ data: { vacante_id: vFrontend.id_vacante, habilidad_id: byName("React").id_habilidad, nivel_requerido: 2, critica: true, peso: 0.4 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vFrontend.id_vacante, habilidad_id: byName("JavaScript").id_habilidad, nivel_requerido: 2, critica: true, peso: 0.3 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vFrontend.id_vacante, habilidad_id: byName("HTML/CSS").id_habilidad, nivel_requerido: 2, critica: false, peso: 0.2 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vFrontend.id_vacante, habilidad_id: byName("Git").id_habilidad, nivel_requerido: 1, critica: false, peso: 0.1 } }),
    // Analista
    prisma.vacante_habilidad.create({ data: { vacante_id: vAnalista.id_vacante, habilidad_id: byName("SQL").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.35 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vAnalista.id_vacante, habilidad_id: byName("Python").id_habilidad, nivel_requerido: 3, critica: true, peso: 0.35 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vAnalista.id_vacante, habilidad_id: byName("Pensamiento analítico").id_habilidad, nivel_requerido: 2, critica: false, peso: 0.3 } }),
    // UX
    prisma.vacante_habilidad.create({ data: { vacante_id: vUX.id_vacante, habilidad_id: byName("Figma").id_habilidad, nivel_requerido: 2, critica: true, peso: 0.45 } }),
    prisma.vacante_habilidad.create({ data: { vacante_id: vUX.id_vacante, habilidad_id: byName("Principios de UX").id_habilidad, nivel_requerido: 2, critica: true, peso: 0.35 } }),
  ]);

  // Empleados ejemplo (opcionales para futuras funcionalidades)
  const emp1 = await prisma.empleado.create({
    data: {
      nombre: "Juan Pérez",
      correo: "juan@example.com",
      experiencia: 2,
      nivel_educativo: 1,
      puesto_id: devFrontend.id_puesto,
      tipo_empleado: "INTERNO",
    },
  });

  await prisma.$transaction([
    prisma.empleado_habilidad.create({ data: { empleado_id: emp1.id_empleado, habilidad_id: byName("React").id_habilidad, nivel_habilidad: 2 } }),
    prisma.empleado_habilidad.create({ data: { empleado_id: emp1.id_empleado, habilidad_id: byName("JavaScript").id_habilidad, nivel_habilidad: 2 } }),
  ]);

  console.log("✅ Seed completado correctamente");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


