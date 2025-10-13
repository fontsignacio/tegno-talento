import { Router } from "express";
import * as puestoController from "../controllers/puestoController";

const router = Router();

// GET /api/v1/puestos
router.get("/", puestoController.getAllPuestos);

// GET /api/v1/puestos/:id
router.get("/:id", puestoController.getPuestoById);

// POST /api/v1/puestos
router.post("/", puestoController.createPuesto);

// PUT /api/v1/puestos/:id
router.put("/:id", puestoController.updatePuesto);

// DELETE /api/v1/puestos/:id
router.delete("/:id", puestoController.deletePuesto);

export default router;
