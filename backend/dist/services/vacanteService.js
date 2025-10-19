"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCandidatosByVacante = exports.deleteVacante = exports.updateVacante = exports.createVacante = exports.getVacantesActivas = exports.getVacantesByPuesto = exports.getVacanteById = exports.getAllVacantes = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllVacantes = async (filters = {}) => {
    const where = {};
    // Filtro por status (derivado de fecha_cierre)
    if (filters.status) {
        const now = new Date();
        if (filters.status === 'activa') {
            where.OR = [
                { fecha_cierre: null },
                { fecha_cierre: { gt: now } }
            ];
        }
        else if (filters.status === 'cerrada') {
            where.fecha_cierre = { lte: now };
        }
    }
    const vacantes = await db_1.default.vacante.findMany({
        where,
        include: {
            puesto: {
                include: {
                    area: true
                }
            },
            vacante_habilidades: {
                include: {
                    habilidad: true
                }
            }
        }
    });
    // Si hay filtro por tipo_empleado, filtrar por empleados que coincidan
    if (filters.tipo_empleado) {
        const vacantesFiltradas = [];
        for (const vacante of vacantes) {
            const empleadosCount = await db_1.default.empleado.count({
                where: {
                    puesto_id: vacante.puesto_id,
                    tipo_empleado: filters.tipo_empleado
                }
            });
            if (empleadosCount > 0) {
                vacantesFiltradas.push(vacante);
            }
        }
        return vacantesFiltradas;
    }
    // Agregar datos derivados a cada vacante
    return vacantes.map(vacante => {
        const now = new Date();
        const status = !vacante.fecha_cierre || vacante.fecha_cierre > now ? 'activa' : 'cerrada';
        const technicalSkills = vacante.vacante_habilidades
            .filter(vh => vh.habilidad.tipo === 'tecnica')
            .map(vh => vh.habilidad.nombre);
        const softSkills = vacante.vacante_habilidades
            .filter(vh => vh.habilidad.tipo === 'blanda')
            .map(vh => vh.habilidad.nombre);
        return {
            ...vacante,
            status,
            requirements: {
                technical: technicalSkills,
                soft: softSkills
            }
        };
    });
};
exports.getAllVacantes = getAllVacantes;
const getVacanteById = async (id) => {
    const vacante = await db_1.default.vacante.findUnique({
        where: { id_vacante: id },
        include: {
            puesto: {
                include: {
                    area: true
                }
            },
            vacante_habilidades: {
                include: {
                    habilidad: true
                }
            }
        }
    });
    if (!vacante) {
        return null;
    }
    // Contar candidatos (empleados) que coincidan con el puesto
    const candidatesCount = await db_1.default.empleado.count({
        where: { puesto_id: vacante.puesto_id }
    });
    // Derivar status basado en fecha_cierre
    const now = new Date();
    const status = !vacante.fecha_cierre || vacante.fecha_cierre > now ? 'activa' : 'cerrada';
    // Separar habilidades técnicas y blandas
    const technicalSkills = vacante.vacante_habilidades
        .filter(vh => vh.habilidad.tipo === 'tecnica')
        .map(vh => vh.habilidad.nombre);
    const softSkills = vacante.vacante_habilidades
        .filter(vh => vh.habilidad.tipo === 'blanda')
        .map(vh => vh.habilidad.nombre);
    return {
        ...vacante,
        status,
        candidatesCount,
        requirements: {
            technical: technicalSkills,
            soft: softSkills
        }
    };
};
exports.getVacanteById = getVacanteById;
const getVacantesByPuesto = async (puestoId) => {
    return db_1.default.vacante.findMany({
        where: { puesto_id: puestoId },
        include: {
            puesto: {
                include: {
                    area: true
                }
            }
        }
    });
};
exports.getVacantesByPuesto = getVacantesByPuesto;
const getVacantesActivas = async () => {
    const now = new Date();
    return db_1.default.vacante.findMany({
        where: {
            OR: [
                { fecha_cierre: null },
                { fecha_cierre: { gt: now } }
            ]
        },
        include: {
            puesto: {
                include: {
                    area: true
                }
            }
        }
    });
};
exports.getVacantesActivas = getVacantesActivas;
const createVacante = async (data) => {
    const { descripcion, puesto_id, peso_experiencia, peso_educacion, experiencia_req, nivel_educ_req, puntaje_corte, fecha_cierre, vacante_habilidades, } = data;
    try {
        const vacante = await db_1.default.vacante.create({
            data: {
                descripcion,
                puesto_id,
                peso_experiencia,
                peso_educacion,
                experiencia_req,
                nivel_educ_req,
                puntaje_corte,
                fecha_cierre: fecha_cierre ? new Date(fecha_cierre) : null,
                vacante_habilidades: {
                    create: vacante_habilidades?.map((h) => ({
                        habilidad_id: h.habilidad_id,
                        nivel_requerido: h.nivel_requerido,
                        critica: h.critica,
                        peso: h.peso,
                    })),
                },
            },
            include: {
                puesto: {
                    include: {
                        area: true,
                    },
                },
                vacante_habilidades: {
                    include: {
                        habilidad: true,
                    },
                },
            },
        });
        // Preparar la respuesta filtrando solo los campos necesarios
        return {
            message: "Vacante creada correctamente",
            data: {
                puesto: vacante.puesto.nombre,
                id_vacante: vacante.id_vacante,
                peso_experiencia: vacante.peso_experiencia,
                peso_educacion: vacante.peso_educacion,
                experiencia_req: vacante.experiencia_req,
                nivel_educ_req: vacante.nivel_educ_req,
                puntaje_corte: vacante.puntaje_corte,
                descripcion: vacante.descripcion,
                fecha_creacion: vacante.fecha_creacion,
                fecha_cierre: vacante.fecha_cierre,
                vacante_habilidades: vacante.vacante_habilidades.map((vh) => ({
                    nombre: vh.habilidad.nombre,
                    tipo: vh.habilidad.tipo,
                    nivel_requerido: vh.nivel_requerido,
                    critica: vh.critica,
                    peso: vh.peso,
                })),
            },
        };
    }
    catch (error) {
        console.error("Error creando vacante:", error);
        throw new Error("No se pudo crear la vacante: " + (error.message || "Error interno"));
    }
};
exports.createVacante = createVacante;
const updateVacante = async (id, data) => {
    const { vacante_habilidades, ...vacanteData } = data;
    const vacante = await db_1.default.vacante.update({
        where: { id_vacante: id },
        data: vacanteData,
        include: {
            puesto: {
                include: {
                    area: true
                }
            }
        }
    });
    // Si se proporcionan habilidades, actualizarlas
    if (vacante_habilidades) {
        // Eliminar habilidades existentes
        await db_1.default.vacante_habilidad.deleteMany({
            where: { vacante_id: id }
        });
        // Crear nuevas habilidades
        if (vacante_habilidades.length > 0) {
            await db_1.default.vacante_habilidad.createMany({
                data: vacante_habilidades.map(vh => ({
                    vacante_id: id,
                    habilidad_id: vh.habilidad_id,
                    nivel_requerido: vh.nivel_requerido,
                    critica: vh.critica || false,
                    peso: vh.peso
                }))
            });
        }
    }
    return vacante;
};
exports.updateVacante = updateVacante;
const deleteVacante = async (id) => {
    return db_1.default.vacante.delete({
        where: { id_vacante: id }
    });
};
exports.deleteVacante = deleteVacante;
const getCandidatosByVacante = async (vacanteId) => {
    // Primero obtener la vacante para conseguir el puesto_id
    const vacante = await db_1.default.vacante.findUnique({
        where: { id_vacante: vacanteId },
        select: { puesto_id: true }
    });
    if (!vacante) {
        throw new Error('Vacante no encontrada');
    }
    // Obtener empleados que coincidan con el puesto_id
    const empleados = await db_1.default.empleado.findMany({
        where: { puesto_id: vacante.puesto_id },
        include: {
            puesto: {
                include: {
                    area: true
                }
            },
            empleado_habilidades: {
                include: {
                    habilidad: true
                }
            }
        }
    });
    // Separar en internos y externos, y mezclar aleatoriamente
    const internos = empleados
        .filter(emp => emp.tipo_empleado === 'INTERNO')
        .sort(() => Math.random() - 0.5);
    const externos = empleados
        .filter(emp => emp.tipo_empleado === 'EXTERNO')
        .sort(() => Math.random() - 0.5);
    return {
        internos,
        externos
    };
};
exports.getCandidatosByVacante = getCandidatosByVacante;
