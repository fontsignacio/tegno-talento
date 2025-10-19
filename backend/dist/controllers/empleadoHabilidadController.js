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
exports.deleteEmpleadoHabilidad = exports.updateEmpleadoHabilidad = exports.createEmpleadoHabilidad = exports.getHabilidadesByEmpleado = exports.getEmpleadoHabilidadById = exports.getAllEmpleadoHabilidades = void 0;
const empleadoHabilidadService = __importStar(require("../services/empleadoHabilidadService"));
const getAllEmpleadoHabilidades = async (req, res) => {
    try {
        const empleadoHabilidades = await empleadoHabilidadService.getAllEmpleadoHabilidades();
        res.json(empleadoHabilidades);
    }
    catch (error) {
        console.error("Error getting empleado habilidades:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllEmpleadoHabilidades = getAllEmpleadoHabilidades;
const getEmpleadoHabilidadById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid empleado habilidad ID" });
        }
        const empleadoHabilidad = await empleadoHabilidadService.getEmpleadoHabilidadById(id);
        if (!empleadoHabilidad) {
            return res.status(404).json({ error: "Empleado habilidad not found" });
        }
        res.json(empleadoHabilidad);
    }
    catch (error) {
        console.error("Error getting empleado habilidad:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getEmpleadoHabilidadById = getEmpleadoHabilidadById;
const getHabilidadesByEmpleado = async (req, res) => {
    try {
        const empleadoId = parseInt(req.params.empleadoId);
        if (isNaN(empleadoId)) {
            return res.status(400).json({ error: "Invalid empleado ID" });
        }
        const habilidades = await empleadoHabilidadService.getHabilidadesByEmpleado(empleadoId);
        res.json(habilidades);
    }
    catch (error) {
        console.error("Error getting habilidades by empleado:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getHabilidadesByEmpleado = getHabilidadesByEmpleado;
const createEmpleadoHabilidad = async (req, res) => {
    try {
        const data = req.body;
        const empleadoHabilidad = await empleadoHabilidadService.createEmpleadoHabilidad(data);
        res.status(201).json(empleadoHabilidad);
    }
    catch (error) {
        console.error("Error creating empleado habilidad:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createEmpleadoHabilidad = createEmpleadoHabilidad;
const updateEmpleadoHabilidad = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid empleado habilidad ID" });
        }
        const data = req.body;
        const empleadoHabilidad = await empleadoHabilidadService.updateEmpleadoHabilidad(id, data);
        if (!empleadoHabilidad) {
            return res.status(404).json({ error: "Empleado habilidad not found" });
        }
        res.json(empleadoHabilidad);
    }
    catch (error) {
        console.error("Error updating empleado habilidad:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateEmpleadoHabilidad = updateEmpleadoHabilidad;
const deleteEmpleadoHabilidad = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid empleado habilidad ID" });
        }
        await empleadoHabilidadService.deleteEmpleadoHabilidad(id);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting empleado habilidad:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteEmpleadoHabilidad = deleteEmpleadoHabilidad;
