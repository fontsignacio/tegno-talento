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
exports.deleteHabilidad = exports.updateHabilidad = exports.createHabilidad = exports.getHabilidadesByTipo = exports.getHabilidadById = exports.getAllHabilidades = void 0;
const habilidadService = __importStar(require("../services/habilidadService"));
const getAllHabilidades = async (req, res) => {
    try {
        const habilidades = await habilidadService.getAllHabilidades();
        res.json(habilidades);
    }
    catch (error) {
        console.error("Error getting habilidades:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllHabilidades = getAllHabilidades;
const getHabilidadById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid habilidad ID" });
        }
        const habilidad = await habilidadService.getHabilidadById(id);
        if (!habilidad) {
            return res.status(404).json({ error: "Habilidad not found" });
        }
        res.json(habilidad);
    }
    catch (error) {
        console.error("Error getting habilidad:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getHabilidadById = getHabilidadById;
const getHabilidadesByTipo = async (req, res) => {
    try {
        const { tipo } = req.params;
        if (tipo !== 'tecnica' && tipo !== 'blanda') {
            return res.status(400).json({ error: "Invalid tipo. Must be 'tecnica' or 'blanda'" });
        }
        const habilidades = await habilidadService.getHabilidadesByTipo(tipo);
        res.json(habilidades);
    }
    catch (error) {
        console.error("Error getting habilidades by tipo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getHabilidadesByTipo = getHabilidadesByTipo;
const createHabilidad = async (req, res) => {
    try {
        const data = req.body;
        const habilidad = await habilidadService.createHabilidad(data);
        res.status(201).json(habilidad);
    }
    catch (error) {
        console.error("Error creating habilidad:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createHabilidad = createHabilidad;
const updateHabilidad = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid habilidad ID" });
        }
        const data = req.body;
        const habilidad = await habilidadService.updateHabilidad(id, data);
        if (!habilidad) {
            return res.status(404).json({ error: "Habilidad not found" });
        }
        res.json(habilidad);
    }
    catch (error) {
        console.error("Error updating habilidad:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateHabilidad = updateHabilidad;
const deleteHabilidad = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid habilidad ID" });
        }
        await habilidadService.deleteHabilidad(id);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting habilidad:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteHabilidad = deleteHabilidad;
