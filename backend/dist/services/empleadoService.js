"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmpleado = exports.updateEmpleado = exports.createEmpleado = exports.getEmpleadosByPuesto = exports.getEmpleadoById = exports.getAllEmpleados = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllEmpleados = async (filters = {}) => {
    const where = {};
    if (filters.tipo_empleado) {
        where.tipo_empleado = filters.tipo_empleado;
    }
    if (filters.puesto_id) {
        where.puesto_id = filters.puesto_id;
    }
    return db_1.default.empleado.findMany({
        where,
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
};
exports.getAllEmpleados = getAllEmpleados;
const getEmpleadoById = async (id) => {
    return db_1.default.empleado.findUnique({
        where: { id_empleado: id },
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
};
exports.getEmpleadoById = getEmpleadoById;
const getEmpleadosByPuesto = async (puestoId) => {
    return db_1.default.empleado.findMany({
        where: { puesto_id: puestoId },
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
};
exports.getEmpleadosByPuesto = getEmpleadosByPuesto;
const createEmpleado = async (data) => {
    return db_1.default.empleado.create({
        data,
        include: {
            puesto: {
                include: {
                    area: true
                }
            }
        }
    });
};
exports.createEmpleado = createEmpleado;
const updateEmpleado = async (id, data) => {
    return db_1.default.empleado.update({
        where: { id_empleado: id },
        data,
        include: {
            puesto: {
                include: {
                    area: true
                }
            }
        }
    });
};
exports.updateEmpleado = updateEmpleado;
const deleteEmpleado = async (id) => {
    return db_1.default.empleado.delete({
        where: { id_empleado: id }
    });
};
exports.deleteEmpleado = deleteEmpleado;
