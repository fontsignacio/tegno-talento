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
exports.deletePuestoHabilidad = exports.updatePuestoHabilidad = exports.createPuestoHabilidad = exports.getHabilidadesByPuesto = exports.getPuestoHabilidadById = exports.getAllPuestoHabilidades = void 0;
const puestoHabilidadService = __importStar(require("../services/puestoHabilidadService"));
const getAllPuestoHabilidades = async (req, res) => {
    try {
        const puestoHabilidades = await puestoHabilidadService.getAllPuestoHabilidades();
        res.json(puestoHabilidades);
    }
    catch (error) {
        console.error("Error getting puesto habilidades:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllPuestoHabilidades = getAllPuestoHabilidades;
const getPuestoHabilidadById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid puesto habilidad ID" });
        }
        const puestoHabilidad = await puestoHabilidadService.getPuestoHabilidadById(id);
        if (!puestoHabilidad) {
            return res.status(404).json({ error: "Puesto habilidad not found" });
        }
        res.json(puestoHabilidad);
    }
    catch (error) {
        console.error("Error getting puesto habilidad:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getPuestoHabilidadById = getPuestoHabilidadById;
const getHabilidadesByPuesto = async (req, res) => {
    try {
        const puestoId = parseInt(req.params.puestoId);
        if (isNaN(puestoId)) {
            return res.status(400).json({ error: "Invalid puesto ID" });
        }
        const habilidades = await puestoHabilidadService.getHabilidadesByPuesto(puestoId);
        res.json(habilidades);
    }
    catch (error) {
        console.error("Error getting habilidades by puesto:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getHabilidadesByPuesto = getHabilidadesByPuesto;
const createPuestoHabilidad = async (req, res) => {
    try {
        const data = req.body;
        const puestoHabilidad = await puestoHabilidadService.createPuestoHabilidad(data);
        res.status(201).json(puestoHabilidad);
    }
    catch (error) {
        console.error("Error creating puesto habilidad:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createPuestoHabilidad = createPuestoHabilidad;
const updatePuestoHabilidad = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid puesto habilidad ID" });
        }
        const data = req.body;
        const puestoHabilidad = await puestoHabilidadService.updatePuestoHabilidad(id, data);
        if (!puestoHabilidad) {
            return res.status(404).json({ error: "Puesto habilidad not found" });
        }
        res.json(puestoHabilidad);
    }
    catch (error) {
        console.error("Error updating puesto habilidad:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updatePuestoHabilidad = updatePuestoHabilidad;
const deletePuestoHabilidad = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid puesto habilidad ID" });
        }
        await puestoHabilidadService.deletePuestoHabilidad(id);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting puesto habilidad:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deletePuestoHabilidad = deletePuestoHabilidad;
