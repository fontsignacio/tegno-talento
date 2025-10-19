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
exports.deleteEmpleado = exports.updateEmpleado = exports.createEmpleado = exports.getEmpleadosByPuesto = exports.getEmpleadoById = exports.getAllEmpleados = void 0;
const empleadoService = __importStar(require("../services/empleadoService"));
const getAllEmpleados = async (req, res) => {
    try {
        const { tipo_empleado, puesto_id } = req.query;
        const filters = {};
        if (tipo_empleado)
            filters.tipo_empleado = tipo_empleado;
        if (puesto_id)
            filters.puesto_id = parseInt(puesto_id);
        const empleados = await empleadoService.getAllEmpleados(filters);
        res.json(empleados);
    }
    catch (error) {
        console.error("Error getting empleados:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllEmpleados = getAllEmpleados;
const getEmpleadoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid empleado ID" });
        }
        const empleado = await empleadoService.getEmpleadoById(id);
        if (!empleado) {
            return res.status(404).json({ error: "Empleado not found" });
        }
        res.json(empleado);
    }
    catch (error) {
        console.error("Error getting empleado:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getEmpleadoById = getEmpleadoById;
const getEmpleadosByPuesto = async (req, res) => {
    try {
        const puestoId = parseInt(req.params.puestoId);
        if (isNaN(puestoId)) {
            return res.status(400).json({ error: "Invalid puesto ID" });
        }
        const empleados = await empleadoService.getEmpleadosByPuesto(puestoId);
        res.json(empleados);
    }
    catch (error) {
        console.error("Error getting empleados by puesto:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getEmpleadosByPuesto = getEmpleadosByPuesto;
const createEmpleado = async (req, res) => {
    try {
        const data = req.body;
        const empleado = await empleadoService.createEmpleado(data);
        res.status(201).json(empleado);
    }
    catch (error) {
        console.error("Error creating empleado:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createEmpleado = createEmpleado;
const updateEmpleado = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid empleado ID" });
        }
        const data = req.body;
        const empleado = await empleadoService.updateEmpleado(id, data);
        if (!empleado) {
            return res.status(404).json({ error: "Empleado not found" });
        }
        res.json(empleado);
    }
    catch (error) {
        console.error("Error updating empleado:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateEmpleado = updateEmpleado;
const deleteEmpleado = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid empleado ID" });
        }
        await empleadoService.deleteEmpleado(id);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting empleado:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteEmpleado = deleteEmpleado;
