"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePuestoHabilidad = exports.updatePuestoHabilidad = exports.createPuestoHabilidad = exports.getHabilidadesByPuesto = exports.getPuestoHabilidadById = exports.getAllPuestoHabilidades = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllPuestoHabilidades = async () => {
    return db_1.default.puesto_habilidad.findMany({
        include: {
            puesto: true,
            habilidad: true
        }
    });
};
exports.getAllPuestoHabilidades = getAllPuestoHabilidades;
const getPuestoHabilidadById = async (id) => {
    return db_1.default.puesto_habilidad.findUnique({
        where: { id_puesto_habilidad: id },
        include: {
            puesto: true,
            habilidad: true
        }
    });
};
exports.getPuestoHabilidadById = getPuestoHabilidadById;
const getHabilidadesByPuesto = async (puestoId) => {
    return db_1.default.puesto_habilidad.findMany({
        where: { puesto_id: puestoId },
        include: {
            puesto: true,
            habilidad: true
        }
    });
};
exports.getHabilidadesByPuesto = getHabilidadesByPuesto;
const createPuestoHabilidad = async (data) => {
    return db_1.default.puesto_habilidad.create({
        data,
        include: {
            puesto: true,
            habilidad: true
        }
    });
};
exports.createPuestoHabilidad = createPuestoHabilidad;
const updatePuestoHabilidad = async (id, data) => {
    return db_1.default.puesto_habilidad.update({
        where: { id_puesto_habilidad: id },
        data,
        include: {
            puesto: true,
            habilidad: true
        }
    });
};
exports.updatePuestoHabilidad = updatePuestoHabilidad;
const deletePuestoHabilidad = async (id) => {
    return db_1.default.puesto_habilidad.delete({
        where: { id_puesto_habilidad: id }
    });
};
exports.deletePuestoHabilidad = deletePuestoHabilidad;
