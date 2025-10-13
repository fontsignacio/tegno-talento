import { Router } from "express";
import * as areaController from "../controllers/areaController";

const router = Router();

// GET /api/v1/areas
router.get("/", areaController.getAllAreas);

// GET /api/v1/areas/:id
router.get("/:id", areaController.getAreaById);

// POST /api/v1/areas
router.post("/", areaController.createArea);

// PUT /api/v1/areas/:id
router.put("/:id", areaController.updateArea);

// DELETE /api/v1/areas/:id
router.delete("/:id", areaController.deleteArea);

export default router;
