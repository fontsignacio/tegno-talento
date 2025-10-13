import { Router } from "express";
import * as puestoHabilidadController from "../controllers/puestoHabilidadController";

const router = Router();

// GET /api/v1/puesto-habilidades
router.get("/", puestoHabilidadController.getAllPuestoHabilidades);

// GET /api/v1/puesto-habilidades/puesto/:puestoId
router.get("/puesto/:puestoId", puestoHabilidadController.getHabilidadesByPuesto);

// GET /api/v1/puesto-habilidades/:id
router.get("/:id", puestoHabilidadController.getPuestoHabilidadById);

// POST /api/v1/puesto-habilidades
router.post("/", puestoHabilidadController.createPuestoHabilidad);

// PUT /api/v1/puesto-habilidades/:id
router.put("/:id", puestoHabilidadController.updatePuestoHabilidad);

// DELETE /api/v1/puesto-habilidades/:id
router.delete("/:id", puestoHabilidadController.deletePuestoHabilidad);

export default router;
