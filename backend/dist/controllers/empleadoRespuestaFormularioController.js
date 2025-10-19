"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmpleadoRespuestaFormulario = exports.updateEmpleadoRespuestaFormulario = exports.createEmpleadoRespuestaFormulario = exports.getRespuestasByEmpleado = exports.getEmpleadoRespuestaFormularioById = exports.getAllEmpleadoRespuestasFormulario = void 0;
const empleadoRespuestaFormularioService = __importStar(require("../services/empleadoRespuestaFormularioService"));
const getAllEmpleadoRespuestasFormulario = async (req, res) => {
    try {
        const respuestas = await empleadoRespuestaFormularioService.getAllEmpleadoRespuestasFormulario();
        res.json(respuestas);
    }
    catch (error) {
        console.error("Error getting empleado respuestas formulario:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllEmpleadoRespuestasFormulario = getAllEmpleadoRespuestasFormulario;
const getEmpleadoRespuestaFormularioById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid respuesta ID" });
        }
        const respuesta = await empleadoRespuestaFormularioService.getEmpleadoRespuestaFormularioById(id);
        if (!respuesta) {
            return res.status(404).json({ error: "Respuesta not found" });
        }
        res.json(respuesta);
    }
    catch (error) {
        console.error("Error getting respuesta:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getEmpleadoRespuestaFormularioById = getEmpleadoRespuestaFormularioById;
const getRespuestasByEmpleado = async (req, res) => {
    try {
        const empleadoId = parseInt(req.params.empleadoId);
        if (isNaN(empleadoId)) {
            return res.status(400).json({ error: "Invalid empleado ID" });
        }
        const respuestas = await empleadoRespuestaFormularioService.getRespuestasByEmpleado(empleadoId);
        res.json(respuestas);
    }
    catch (error) {
        console.error("Error getting respuestas by empleado:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getRespuestasByEmpleado = getRespuestasByEmpleado;
const createEmpleadoRespuestaFormulario = async (req, res) => {
    try {
        const data = req.body;
        const respuesta = await empleadoRespuestaFormularioService.createEmpleadoRespuestaFormulario(data);
        res.status(201).json(respuesta);
    }
    catch (error) {
        console.error("Error creating respuesta:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createEmpleadoRespuestaFormulario = createEmpleadoRespuestaFormulario;
const updateEmpleadoRespuestaFormulario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid respuesta ID" });
        }
        const data = req.body;
        const respuesta = await empleadoRespuestaFormularioService.updateEmpleadoRespuestaFormulario(id, data);
        if (!respuesta) {
            return res.status(404).json({ error: "Respuesta not found" });
        }
        res.json(respuesta);
    }
    catch (error) {
        console.error("Error updating respuesta:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateEmpleadoRespuestaFormulario = updateEmpleadoRespuestaFormulario;
const deleteEmpleadoRespuestaFormulario = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid respuesta ID" });
        }
        await empleadoRespuestaFormularioService.deleteEmpleadoRespuestaFormulario(id);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting respuesta:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteEmpleadoRespuestaFormulario = deleteEmpleadoRespuestaFormulario;
