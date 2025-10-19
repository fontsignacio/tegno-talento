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
exports.deleteArea = exports.updateArea = exports.createArea = exports.getAreaById = exports.getAllAreas = void 0;
const areaService = __importStar(require("../services/areaService"));
const getAllAreas = async (req, res) => {
    try {
        const areas = await areaService.getAllAreas();
        res.json(areas);
    }
    catch (error) {
        console.error("Error getting areas:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAllAreas = getAllAreas;
const getAreaById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid area ID" });
        }
        const area = await areaService.getAreaById(id);
        if (!area) {
            return res.status(404).json({ error: "Area not found" });
        }
        res.json(area);
    }
    catch (error) {
        console.error("Error getting area:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.getAreaById = getAreaById;
const createArea = async (req, res) => {
    try {
        const data = req.body;
        const area = await areaService.createArea(data);
        res.status(201).json(area);
    }
    catch (error) {
        console.error("Error creating area:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.createArea = createArea;
const updateArea = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid area ID" });
        }
        const data = req.body;
        const area = await areaService.updateArea(id, data);
        if (!area) {
            return res.status(404).json({ error: "Area not found" });
        }
        res.json(area);
    }
    catch (error) {
        console.error("Error updating area:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateArea = updateArea;
const deleteArea = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid area ID" });
        }
        await areaService.deleteArea(id);
        res.status(204).send();
    }
    catch (error) {
        console.error("Error deleting area:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteArea = deleteArea;
