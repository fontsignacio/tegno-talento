import { Router } from "express";
import * as empleadoHabilidadController from "../controllers/empleadoHabilidadController";

const router = Router();

// GET /api/v1/empleado-habilidades
router.get("/", empleadoHabilidadController.getAllEmpleadoHabilidades);

// GET /api/v1/empleado-habilidades/empleado/:empleadoId
router.get("/empleado/:empleadoId", empleadoHabilidadController.getHabilidadesByEmpleado);

// GET /api/v1/empleado-habilidades/:id
router.get("/:id", empleadoHabilidadController.getEmpleadoHabilidadById);

// POST /api/v1/empleado-habilidades
router.post("/", empleadoHabilidadController.createEmpleadoHabilidad);

// PUT /api/v1/empleado-habilidades/:id
router.put("/:id", empleadoHabilidadController.updateEmpleadoHabilidad);

// DELETE /api/v1/empleado-habilidades/:id
router.delete("/:id", empleadoHabilidadController.deleteEmpleadoHabilidad);

export default router;
