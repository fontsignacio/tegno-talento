import { Router } from "express";
import * as empleadoRespuestaFormularioController from "../controllers/empleadoRespuestaFormularioController";

const router = Router();

// GET /api/v1/empleado-respuestas-formulario
router.get("/", empleadoRespuestaFormularioController.getAllEmpleadoRespuestasFormulario);

// GET /api/v1/empleado-respuestas-formulario/empleado/:empleadoId
router.get("/empleado/:empleadoId", empleadoRespuestaFormularioController.getRespuestasByEmpleado);

// GET /api/v1/empleado-respuestas-formulario/:id
router.get("/:id", empleadoRespuestaFormularioController.getEmpleadoRespuestaFormularioById);

// POST /api/v1/empleado-respuestas-formulario
router.post("/", empleadoRespuestaFormularioController.createEmpleadoRespuestaFormulario);

// PUT /api/v1/empleado-respuestas-formulario/:id
router.put("/:id", empleadoRespuestaFormularioController.updateEmpleadoRespuestaFormulario);

// DELETE /api/v1/empleado-respuestas-formulario/:id
router.delete("/:id", empleadoRespuestaFormularioController.deleteEmpleadoRespuestaFormulario);

export default router;
