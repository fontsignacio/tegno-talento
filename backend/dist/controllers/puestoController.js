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
exports.deletePuesto = exports.updatePuesto = exports.createPuesto = exports.getPuestoById = exports.getAllPuestos = void 0;
const puestoService = __importStar(require("../services/puestoService"));
const getAllPuestos = async (req, res) => {
    try {
        const puestos = await puestoService.getAllPuestos();
        res.json(puestos);
    }
    catch (error) {
        console.error("Error getting puestos:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllPuestos = getAllPuestos;
const getPuestoById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid puesto ID" });
        }
        const puesto = await puestoService.getPuestoById(id);
        if (!puesto) {
            return res.status(404).json({ error: "Puesto not found" });
        }
        res.json(puesto);
    }
    catch (error) {
        console.error("Error getting puesto:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getPuestoById = getPuestoById;
const createPuesto = async (req, res) => {
    try {
        const data = req.body;
        const puesto = await puestoService.createPuesto(data);
        res.status(201).json(puesto);
    }
    catch (error) {
        console.error("Error creating puesto:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createPuesto = createPuesto;
const updatePuesto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid puesto ID" });
        }
        const data = req.body;
        const puesto = await puestoService.updatePuesto(id, data);
        if (!puesto) {
            return res.status(404).json({ error: "Puesto not found" });
        }
        res.json(puesto);
    }
    catch (error) {
        console.error("Error updating puesto:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updatePuesto = updatePuesto;
const deletePuesto = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid puesto ID" });
        }
        await puestoService.deletePuesto(id);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting puesto:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deletePuesto = deletePuesto;
