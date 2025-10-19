"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmpleadoHabilidad = exports.updateEmpleadoHabilidad = exports.createEmpleadoHabilidad = exports.getHabilidadesByEmpleado = exports.getEmpleadoHabilidadById = exports.getAllEmpleadoHabilidades = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllEmpleadoHabilidades = async () => {
    return db_1.default.empleado_habilidad.findMany({
        include: {
            empleado: true,
            habilidad: true
        }
    });
};
exports.getAllEmpleadoHabilidades = getAllEmpleadoHabilidades;
const getEmpleadoHabilidadById = async (id) => {
    return db_1.default.empleado_habilidad.findUnique({
        where: { id_empleado_habilidad: id },
        include: {
            empleado: true,
            habilidad: true
        }
    });
};
exports.getEmpleadoHabilidadById = getEmpleadoHabilidadById;
const getHabilidadesByEmpleado = async (empleadoId) => {
    return db_1.default.empleado_habilidad.findMany({
        where: { empleado_id: empleadoId },
        include: {
            empleado: true,
            habilidad: true
        }
    });
};
exports.getHabilidadesByEmpleado = getHabilidadesByEmpleado;
const createEmpleadoHabilidad = async (data) => {
    return db_1.default.empleado_habilidad.create({
        data,
        include: {
            empleado: true,
            habilidad: true
        }
    });
};
exports.createEmpleadoHabilidad = createEmpleadoHabilidad;
const updateEmpleadoHabilidad = async (id, data) => {
    return db_1.default.empleado_habilidad.update({
        where: { id_empleado_habilidad: id },
        data,
        include: {
            empleado: true,
            habilidad: true
        }
    });
};
exports.updateEmpleadoHabilidad = updateEmpleadoHabilidad;
const deleteEmpleadoHabilidad = async (id) => {
    return db_1.default.empleado_habilidad.delete({
        where: { id_empleado_habilidad: id }
    });
};
exports.deleteEmpleadoHabilidad = deleteEmpleadoHabilidad;
