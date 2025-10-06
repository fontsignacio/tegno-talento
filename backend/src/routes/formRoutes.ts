import express from "express";
import { createForm } from "../controllers/formController";

const router = express.Router();

router.post("/", createForm);

export default router;



