import { Router } from "express";
import { listProfiles, getProfile } from "../controllers/profileController";

const router = Router();

router.get("/", listProfiles);
router.get("/:id", getProfile);

export default router;


