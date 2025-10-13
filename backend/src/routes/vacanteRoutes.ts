import { Router } from "express";
import * as vacanteController from "../controllers/vacanteController";

const router = Router();

// GET /api/v1/vacantes
router.get("/", vacanteController.getAllVacantes);

// GET /api/v1/vacantes/activas
router.get("/activas", vacanteController.getVacantesActivas);

// GET /api/v1/vacantes/puesto/:puestoId
router.get("/puesto/:puestoId", vacanteController.getVacantesByPuesto);

// GET /api/v1/vacantes/:id
router.get("/:id", vacanteController.getVacanteById);

// POST /api/v1/vacantes
router.post("/", vacanteController.createVacante);

// PUT /api/v1/vacantes/:id
router.put("/:id", vacanteController.updateVacante);

// DELETE /api/v1/vacantes/:id
router.delete("/:id", vacanteController.deleteVacante);

export default router;
