import { Request, Response } from "express";
import * as habilidadService from "../services/habilidadService";
import { CreateHabilidadDTO, UpdateHabilidadDTO } from "../types/habilidad";

export const getAllHabilidades = async (req: Request, res: Response) => {
  try {
    const habilidades = await habilidadService.getAllHabilidades();
    res.json(habilidades);
  } catch (error) {
    console.error("Error getting habilidades:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getHabilidadById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid habilidad ID" });
    }

    const habilidad = await habilidadService.getHabilidadById(id);
    if (!habilidad) {
      return res.status(404).json({ error: "Habilidad not found" });
    }

    res.json(habilidad);
  } catch (error) {
    console.error("Error getting habilidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getHabilidadesByTipo = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.params;
    if (tipo !== 'tecnica' && tipo !== 'blanda') {
      return res.status(400).json({ error: "Invalid tipo. Must be 'tecnica' or 'blanda'" });
    }

    const habilidades = await habilidadService.getHabilidadesByTipo(tipo);
    res.json(habilidades);
  } catch (error) {
    console.error("Error getting habilidades by tipo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createHabilidad = async (req: Request, res: Response) => {
  try {
    const data: CreateHabilidadDTO = req.body;
    const habilidad = await habilidadService.createHabilidad(data);
    res.status(201).json(habilidad);
  } catch (error) {
    console.error("Error creating habilidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateHabilidad = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid habilidad ID" });
    }

    const data: UpdateHabilidadDTO = req.body;
    const habilidad = await habilidadService.updateHabilidad(id, data);
    if (!habilidad) {
      return res.status(404).json({ error: "Habilidad not found" });
    }

    res.json(habilidad);
  } catch (error) {
    console.error("Error updating habilidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteHabilidad = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid habilidad ID" });
    }

    await habilidadService.deleteHabilidad(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting habilidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
