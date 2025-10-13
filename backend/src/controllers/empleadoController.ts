import { Request, Response } from "express";
import * as empleadoService from "../services/empleadoService";
import { CreateEmpleadoDTO, UpdateEmpleadoDTO } from "../types/empleado";

export const getAllEmpleados = async (req: Request, res: Response) => {
  try {
    const empleados = await empleadoService.getAllEmpleados();
    res.json(empleados);
  } catch (error) {
    console.error("Error getting empleados:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEmpleadoById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid empleado ID" });
    }

    const empleado = await empleadoService.getEmpleadoById(id);
    if (!empleado) {
      return res.status(404).json({ error: "Empleado not found" });
    }

    res.json(empleado);
  } catch (error) {
    console.error("Error getting empleado:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEmpleadosByPuesto = async (req: Request, res: Response) => {
  try {
    const puestoId = parseInt(req.params.puestoId);
    if (isNaN(puestoId)) {
      return res.status(400).json({ error: "Invalid puesto ID" });
    }

    const empleados = await empleadoService.getEmpleadosByPuesto(puestoId);
    res.json(empleados);
  } catch (error) {
    console.error("Error getting empleados by puesto:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createEmpleado = async (req: Request, res: Response) => {
  try {
    const data: CreateEmpleadoDTO = req.body;
    const empleado = await empleadoService.createEmpleado(data);
    res.status(201).json(empleado);
  } catch (error) {
    console.error("Error creating empleado:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEmpleado = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid empleado ID" });
    }

    const data: UpdateEmpleadoDTO = req.body;
    const empleado = await empleadoService.updateEmpleado(id, data);
    if (!empleado) {
      return res.status(404).json({ error: "Empleado not found" });
    }

    res.json(empleado);
  } catch (error) {
    console.error("Error updating empleado:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEmpleado = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid empleado ID" });
    }

    await empleadoService.deleteEmpleado(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting empleado:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
