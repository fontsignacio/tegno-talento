"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmpleadoRespuestaFormulario = exports.updateEmpleadoRespuestaFormulario = exports.createEmpleadoRespuestaFormulario = exports.getRespuestasByEmpleado = exports.getEmpleadoRespuestaFormularioById = exports.getAllEmpleadoRespuestasFormulario = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllEmpleadoRespuestasFormulario = async () => {
    return db_1.default.empleado_respuesta_formulario.findMany({
        include: {
            empleado: true
        }
    });
};
exports.getAllEmpleadoRespuestasFormulario = getAllEmpleadoRespuestasFormulario;
const getEmpleadoRespuestaFormularioById = async (id) => {
    return db_1.default.empleado_respuesta_formulario.findUnique({
        where: { id_respuesta: id },
        include: {
            empleado: true
        }
    });
};
exports.getEmpleadoRespuestaFormularioById = getEmpleadoRespuestaFormularioById;
const getRespuestasByEmpleado = async (empleadoId) => {
    return db_1.default.empleado_respuesta_formulario.findMany({
        where: { empleado_id: empleadoId },
        include: {
            empleado: true
        }
    });
};
exports.getRespuestasByEmpleado = getRespuestasByEmpleado;
const createEmpleadoRespuestaFormulario = async (data) => {
    return db_1.default.empleado_respuesta_formulario.create({
        data,
        include: {
            empleado: true
        }
    });
};
exports.createEmpleadoRespuestaFormulario = createEmpleadoRespuestaFormulario;
const updateEmpleadoRespuestaFormulario = async (id, data) => {
    return db_1.default.empleado_respuesta_formulario.update({
        where: { id_respuesta: id },
        data,
        include: {
            empleado: true
        }
    });
};
exports.updateEmpleadoRespuestaFormulario = updateEmpleadoRespuestaFormulario;
const deleteEmpleadoRespuestaFormulario = async (id) => {
    return db_1.default.empleado_respuesta_formulario.delete({
        where: { id_respuesta: id }
    });
};
exports.deleteEmpleadoRespuestaFormulario = deleteEmpleadoRespuestaFormulario;
