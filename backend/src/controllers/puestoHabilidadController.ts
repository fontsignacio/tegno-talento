import { Request, Response } from "express";
import * as puestoHabilidadService from "../services/puestoHabilidadService";
import { CreatePuestoHabilidadDTO, UpdatePuestoHabilidadDTO } from "../types/puestoHabilidad";

export const getAllPuestoHabilidades = async (req: Request, res: Response) => {
  try {
    const puestoHabilidades = await puestoHabilidadService.getAllPuestoHabilidades();
    res.json(puestoHabilidades);
  } catch (error) {
    console.error("Error getting puesto habilidades:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPuestoHabilidadById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid puesto habilidad ID" });
    }

    const puestoHabilidad = await puestoHabilidadService.getPuestoHabilidadById(id);
    if (!puestoHabilidad) {
      return res.status(404).json({ error: "Puesto habilidad not found" });
    }

    res.json(puestoHabilidad);
  } catch (error) {
    console.error("Error getting puesto habilidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getHabilidadesByPuesto = async (req: Request, res: Response) => {
  try {
    const puestoId = parseInt(req.params.puestoId);
    if (isNaN(puestoId)) {
      return res.status(400).json({ error: "Invalid puesto ID" });
    }

    const habilidades = await puestoHabilidadService.getHabilidadesByPuesto(puestoId);
    res.json(habilidades);
  } catch (error) {
    console.error("Error getting habilidades by puesto:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createPuestoHabilidad = async (req: Request, res: Response) => {
  try {
    const data: CreatePuestoHabilidadDTO = req.body;
    const puestoHabilidad = await puestoHabilidadService.createPuestoHabilidad(data);
    res.status(201).json(puestoHabilidad);
  } catch (error) {
    console.error("Error creating puesto habilidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePuestoHabilidad = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid puesto habilidad ID" });
    }

    const data: UpdatePuestoHabilidadDTO = req.body;
    const puestoHabilidad = await puestoHabilidadService.updatePuestoHabilidad(id, data);
    if (!puestoHabilidad) {
      return res.status(404).json({ error: "Puesto habilidad not found" });
    }

    res.json(puestoHabilidad);
  } catch (error) {
    console.error("Error updating puesto habilidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePuestoHabilidad = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid puesto habilidad ID" });
    }

    await puestoHabilidadService.deletePuestoHabilidad(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting puesto habilidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
