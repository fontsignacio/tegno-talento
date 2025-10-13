import { Router } from "express";
import * as habilidadController from "../controllers/habilidadController";

const router = Router();

// GET /api/v1/habilidades
router.get("/", habilidadController.getAllHabilidades);

// GET /api/v1/habilidades/tipo/:tipo
router.get("/tipo/:tipo", habilidadController.getHabilidadesByTipo);

// GET /api/v1/habilidades/:id
router.get("/:id", habilidadController.getHabilidadById);

// POST /api/v1/habilidades
router.post("/", habilidadController.createHabilidad);

// PUT /api/v1/habilidades/:id
router.put("/:id", habilidadController.updateHabilidad);

// DELETE /api/v1/habilidades/:id
router.delete("/:id", habilidadController.deleteHabilidad);

export default router;
