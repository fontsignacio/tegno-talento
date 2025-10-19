"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePuesto = exports.updatePuesto = exports.createPuesto = exports.getPuestoById = exports.getAllPuestos = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllPuestos = async () => {
    return db_1.default.puesto.findMany({
        include: {
            area: false
        }
    });
};
exports.getAllPuestos = getAllPuestos;
const getPuestoById = async (id) => {
    return db_1.default.puesto.findUnique({
        where: { id_puesto: id },
        include: {
            area: true,
            puesto_habilidades: {
                include: {
                    habilidad: true
                }
            }
        }
    });
};
exports.getPuestoById = getPuestoById;
const createPuesto = async (data) => {
    return db_1.default.puesto.create({
        data,
        include: {
            area: true,
            puesto_habilidades: {
                include: {
                    habilidad: true
                }
            }
        }
    });
};
exports.createPuesto = createPuesto;
const updatePuesto = async (id, data) => {
    return db_1.default.puesto.update({
        where: { id_puesto: id },
        data,
        include: {
            area: true,
            puesto_habilidades: {
                include: {
                    habilidad: true
                }
            }
        }
    });
};
exports.updatePuesto = updatePuesto;
const deletePuesto = async (id) => {
    return db_1.default.puesto.delete({
        where: { id_puesto: id }
    });
};
exports.deletePuesto = deletePuesto;
