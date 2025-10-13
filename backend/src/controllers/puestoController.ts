import { Request, Response } from "express";
import * as puestoService from "../services/puestoService";
import { CreatePuestoDTO, UpdatePuestoDTO } from "../types/puesto";

export const getAllPuestos = async (req: Request, res: Response) => {
  try {
    const puestos = await puestoService.getAllPuestos();
    res.json(puestos);
  } catch (error) {
    console.error("Error getting puestos:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPuestoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid puesto ID" });
    }

    const puesto = await puestoService.getPuestoById(id);
    if (!puesto) {
      return res.status(404).json({ error: "Puesto not found" });
    }

    res.json(puesto);
  } catch (error) {
    console.error("Error getting puesto:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createPuesto = async (req: Request, res: Response) => {
  try {
    const data: CreatePuestoDTO = req.body;
    const puesto = await puestoService.createPuesto(data);
    res.status(201).json(puesto);
  } catch (error) {
    console.error("Error creating puesto:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePuesto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid puesto ID" });
    }

    const data: UpdatePuestoDTO = req.body;
    const puesto = await puestoService.updatePuesto(id, data);
    if (!puesto) {
      return res.status(404).json({ error: "Puesto not found" });
    }

    res.json(puesto);
  } catch (error) {
    console.error("Error updating puesto:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePuesto = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid puesto ID" });
    }

    await puestoService.deletePuesto(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting puesto:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
