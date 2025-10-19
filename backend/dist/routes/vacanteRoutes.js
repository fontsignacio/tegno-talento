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
const express_1 = require("express");
const vacanteController = __importStar(require("../controllers/vacanteController"));
const vacanteMiddlewares_1 = require("../middlewares/vacanteMiddlewares");
const router = (0, express_1.Router)();
// GET /api/v1/vacantes
router.get("/", vacanteController.getAllVacantes);
// GET /api/v1/vacantes/activas
router.get("/activas", vacanteController.getVacantesActivas);
// GET /api/v1/vacantes/puesto/:puestoId
router.get("/puesto/:puestoId", vacanteController.getVacantesByPuesto);
// GET /api/v1/vacantes/:id
router.get("/:id", vacanteController.getVacanteById);
// GET /api/v1/vacantes/:id/candidatos
router.get("/:id/candidatos", vacanteController.getCandidatosByVacante);
// POST /api/v1/vacantes
router.post("/", vacanteMiddlewares_1.validateCreateVacante, vacanteController.createVacante);
// PUT /api/v1/vacantes/:id
router.put("/:id", vacanteController.updateVacante);
// DELETE /api/v1/vacantes/:id
router.delete("/:id", vacanteController.deleteVacante);
exports.default = router;
