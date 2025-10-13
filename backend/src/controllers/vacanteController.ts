import { Request, Response } from "express";
import * as vacanteService from "../services/vacanteService";
import { CreateVacanteDTO, UpdateVacanteDTO } from "../types/vacante";

export const getAllVacantes = async (req: Request, res: Response) => {
  try {
    const vacantes = await vacanteService.getAllVacantes();
    res.json(vacantes);
  } catch (error) {
    console.error("Error getting vacantes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVacanteById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid vacante ID" });
    }

    const vacante = await vacanteService.getVacanteById(id);
    if (!vacante) {
      return res.status(404).json({ error: "Vacante not found" });
    }

    res.json(vacante);
  } catch (error) {
    console.error("Error getting vacante:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVacantesByPuesto = async (req: Request, res: Response) => {
  try {
    const puestoId = parseInt(req.params.puestoId);
    if (isNaN(puestoId)) {
      return res.status(400).json({ error: "Invalid puesto ID" });
    }

    const vacantes = await vacanteService.getVacantesByPuesto(puestoId);
    res.json(vacantes);
  } catch (error) {
    console.error("Error getting vacantes by puesto:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getVacantesActivas = async (req: Request, res: Response) => {
  try {
    const vacantes = await vacanteService.getVacantesActivas();
    res.json(vacantes);
  } catch (error) {
    console.error("Error getting active vacantes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createVacante = async (req: Request, res: Response) => {
  try {
    const data: CreateVacanteDTO = req.body;
    const vacante = await vacanteService.createVacante(data);
    res.status(201).json(vacante);
  } catch (error) {
    console.error("Error creating vacante:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateVacante = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid vacante ID" });
    }

    const data: UpdateVacanteDTO = req.body;
    const vacante = await vacanteService.updateVacante(id, data);
    if (!vacante) {
      return res.status(404).json({ error: "Vacante not found" });
    }

    res.json(vacante);
  } catch (error) {
    console.error("Error updating vacante:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteVacante = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid vacante ID" });
    }

    await vacanteService.deleteVacante(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting vacante:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
