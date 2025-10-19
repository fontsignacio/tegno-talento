"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteHabilidad = exports.updateHabilidad = exports.createHabilidad = exports.getHabilidadesByTipo = exports.getHabilidadById = exports.getAllHabilidades = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllHabilidades = async () => {
    return db_1.default.habilidad.findMany();
};
exports.getAllHabilidades = getAllHabilidades;
const getHabilidadById = async (id) => {
    return db_1.default.habilidad.findUnique({
        where: { id_habilidad: id }
    });
};
exports.getHabilidadById = getHabilidadById;
const getHabilidadesByTipo = async (tipo) => {
    return db_1.default.habilidad.findMany({
        where: { tipo }
    });
};
exports.getHabilidadesByTipo = getHabilidadesByTipo;
const createHabilidad = async (data) => {
    return db_1.default.habilidad.create({
        data
    });
};
exports.createHabilidad = createHabilidad;
const updateHabilidad = async (id, data) => {
    return db_1.default.habilidad.update({
        where: { id_habilidad: id },
        data
    });
};
exports.updateHabilidad = updateHabilidad;
const deleteHabilidad = async (id) => {
    return db_1.default.habilidad.delete({
        where: { id_habilidad: id }
    });
};
exports.deleteHabilidad = deleteHabilidad;
