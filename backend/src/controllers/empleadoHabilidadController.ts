import { Request, Response } from "express";
import * as empleadoHabilidadService from "../services/empleadoHabilidadService";
import { CreateEmpleadoHabilidadDTO, UpdateEmpleadoHabilidadDTO } from "../types/empleadoHabilidad";

export const getAllEmpleadoHabilidades = async (req: Request, res: Response) => {
  try {
    const empleadoHabilidades = await empleadoHabilidadService.getAllEmpleadoHabilidades();
    res.json(empleadoHabilidades);
  } catch (error) {
    console.error("Error getting empleado habilidades:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEmpleadoHabilidadById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid empleado habilidad ID" });
    }

    const empleadoHabilidad = await empleadoHabilidadService.getEmpleadoHabilidadById(id);
    if (!empleadoHabilidad) {
      return res.status(404).json({ error: "Empleado habilidad not found" });
    }

    res.json(empleadoHabilidad);
  } catch (error) {
    console.error("Error getting empleado habilidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getHabilidadesByEmpleado = async (req: Request, res: Response) => {
  try {
    const empleadoId = parseInt(req.params.empleadoId);
    if (isNaN(empleadoId)) {
      return res.status(400).json({ error: "Invalid empleado ID" });
    }

    const habilidades = await empleadoHabilidadService.getHabilidadesByEmpleado(empleadoId);
    res.json(habilidades);
  } catch (error) {
    console.error("Error getting habilidades by empleado:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createEmpleadoHabilidad = async (req: Request, res: Response) => {
  try {
    const data: CreateEmpleadoHabilidadDTO = req.body;
    const empleadoHabilidad = await empleadoHabilidadService.createEmpleadoHabilidad(data);
    res.status(201).json(empleadoHabilidad);
  } catch (error) {
    console.error("Error creating empleado habilidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEmpleadoHabilidad = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid empleado habilidad ID" });
    }

    const data: UpdateEmpleadoHabilidadDTO = req.body;
    const empleadoHabilidad = await empleadoHabilidadService.updateEmpleadoHabilidad(id, data);
    if (!empleadoHabilidad) {
      return res.status(404).json({ error: "Empleado habilidad not found" });
    }

    res.json(empleadoHabilidad);
  } catch (error) {
    console.error("Error updating empleado habilidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEmpleadoHabilidad = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid empleado habilidad ID" });
    }

    await empleadoHabilidadService.deleteEmpleadoHabilidad(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting empleado habilidad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
