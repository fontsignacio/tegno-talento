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
exports.getCandidatosByVacante = exports.deleteVacante = exports.updateVacante = exports.createVacante = exports.getVacantesActivas = exports.getVacantesByPuesto = exports.getVacanteById = exports.getAllVacantes = void 0;
const vacanteService = __importStar(require("../services/vacanteService"));
const getAllVacantes = async (req, res) => {
    try {
        const { status, tipo_empleado } = req.query;
        const filters = {};
        if (status)
            filters.status = status;
        if (tipo_empleado)
            filters.tipo_empleado = tipo_empleado;
        const vacantes = await vacanteService.getAllVacantes(filters);
        res.json(vacantes);
    }
    catch (error) {
        console.error("Error getting vacantes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllVacantes = getAllVacantes;
const getVacanteById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid vacante ID" });
        }
        const vacante = await vacanteService.getVacanteById(id);
        if (!vacante) {
            return res.status(404).json({ error: "Vacante not found" });
        }
        res.json(vacante);
    }
    catch (error) {
        console.error("Error getting vacante:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getVacanteById = getVacanteById;
const getVacantesByPuesto = async (req, res) => {
    try {
        const puestoId = parseInt(req.params.puestoId);
        if (isNaN(puestoId)) {
            return res.status(400).json({ error: "Invalid puesto ID" });
        }
        const vacantes = await vacanteService.getVacantesByPuesto(puestoId);
        res.json(vacantes);
    }
    catch (error) {
        console.error("Error getting vacantes by puesto:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getVacantesByPuesto = getVacantesByPuesto;
const getVacantesActivas = async (req, res) => {
    try {
        const vacantes = await vacanteService.getVacantesActivas();
        res.json(vacantes);
    }
    catch (error) {
        console.error("Error getting active vacantes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getVacantesActivas = getVacantesActivas;
const createVacante = async (req, res) => {
    try {
        const data = req.body;
        // Llamada al servicio que crea la vacante y sus habilidades
        const result = await vacanteService.createVacante(data);
        // Retornar mensaje y data filtrada
        return res.status(201).json(result);
    }
    catch (error) {
        console.error("Error en createVacante:", error);
        return res.status(500).json({
            message: "Error al crear la vacante",
            error: error.message || "Error interno",
        });
    }
};
exports.createVacante = createVacante;
const updateVacante = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid vacante ID" });
        }
        const data = req.body;
        const vacante = await vacanteService.updateVacante(id, data);
        if (!vacante) {
            return res.status(404).json({ error: "Vacante not found" });
        }
        res.json(vacante);
    }
    catch (error) {
        console.error("Error updating vacante:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateVacante = updateVacante;
const deleteVacante = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid vacante ID" });
        }
        await vacanteService.deleteVacante(id);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting vacante:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteVacante = deleteVacante;
const getCandidatosByVacante = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid vacante ID" });
        }
        const candidatos = await vacanteService.getCandidatosByVacante(id);
        res.json(candidatos);
    }
    catch (error) {
        console.error("Error getting candidatos by vacante:", error);
        if (error.message === 'Vacante no encontrada') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getCandidatosByVacante = getCandidatosByVacante;
