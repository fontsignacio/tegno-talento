import { Request, Response } from "express";
import * as empleadoRespuestaFormularioService from "../services/empleadoRespuestaFormularioService";
import { CreateEmpleadoRespuestaFormularioDTO, UpdateEmpleadoRespuestaFormularioDTO } from "../types/empleadoRespuestaFormulario";

export const getAllEmpleadoRespuestasFormulario = async (req: Request, res: Response) => {
  try {
    const respuestas = await empleadoRespuestaFormularioService.getAllEmpleadoRespuestasFormulario();
    res.json(respuestas);
  } catch (error) {
    console.error("Error getting empleado respuestas formulario:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getEmpleadoRespuestaFormularioById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid respuesta ID" });
    }

    const respuesta = await empleadoRespuestaFormularioService.getEmpleadoRespuestaFormularioById(id);
    if (!respuesta) {
      return res.status(404).json({ error: "Respuesta not found" });
    }

    res.json(respuesta);
  } catch (error) {
    console.error("Error getting respuesta:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRespuestasByEmpleado = async (req: Request, res: Response) => {
  try {
    const empleadoId = parseInt(req.params.empleadoId);
    if (isNaN(empleadoId)) {
      return res.status(400).json({ error: "Invalid empleado ID" });
    }

    const respuestas = await empleadoRespuestaFormularioService.getRespuestasByEmpleado(empleadoId);
    res.json(respuestas);
  } catch (error) {
    console.error("Error getting respuestas by empleado:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createEmpleadoRespuestaFormulario = async (req: Request, res: Response) => {
  try {
    const data: CreateEmpleadoRespuestaFormularioDTO = req.body;
    const respuesta = await empleadoRespuestaFormularioService.createEmpleadoRespuestaFormulario(data);
    res.status(201).json(respuesta);
  } catch (error) {
    console.error("Error creating respuesta:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEmpleadoRespuestaFormulario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid respuesta ID" });
    }

    const data: UpdateEmpleadoRespuestaFormularioDTO = req.body;
    const respuesta = await empleadoRespuestaFormularioService.updateEmpleadoRespuestaFormulario(id, data);
    if (!respuesta) {
      return res.status(404).json({ error: "Respuesta not found" });
    }

    res.json(respuesta);
  } catch (error) {
    console.error("Error updating respuesta:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEmpleadoRespuestaFormulario = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid respuesta ID" });
    }

    await empleadoRespuestaFormularioService.deleteEmpleadoRespuestaFormulario(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting respuesta:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
