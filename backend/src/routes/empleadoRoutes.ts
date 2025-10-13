import { Router } from "express";
import * as empleadoController from "../controllers/empleadoController";

const router = Router();

// GET /api/v1/empleados
router.get("/", empleadoController.getAllEmpleados);

// GET /api/v1/empleados/puesto/:puestoId
router.get("/puesto/:puestoId", empleadoController.getEmpleadosByPuesto);

// GET /api/v1/empleados/:id
router.get("/:id", empleadoController.getEmpleadoById);

// POST /api/v1/empleados
router.post("/", empleadoController.createEmpleado);

// PUT /api/v1/empleados/:id
router.put("/:id", empleadoController.updateEmpleado);

// DELETE /api/v1/empleados/:id
router.delete("/:id", empleadoController.deleteEmpleado);

export default router;
