import { Request, Response } from "express";
import * as areaService from "../services/areaService";
import { CreateAreaDTO, UpdateAreaDTO } from "../types/area";

export const getAllAreas = async (req: Request, res: Response) => {
  try {
    const areas = await areaService.getAllAreas();
    res.json(areas);
  } catch (error) {
    console.error("Error getting areas:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAreaById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid area ID" });
    }

    const area = await areaService.getAreaById(id);
    if (!area) {
      return res.status(404).json({ error: "Area not found" });
    }

    res.json(area);
  } catch (error) {
    console.error("Error getting area:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createArea = async (req: Request, res: Response) => {
  try {
    const data: CreateAreaDTO = req.body;
    const area = await areaService.createArea(data);
    res.status(201).json(area);
  } catch (error) {
    console.error("Error creating area:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateArea = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid area ID" });
    }

    const data: UpdateAreaDTO = req.body;
    const area = await areaService.updateArea(id, data);
    if (!area) {
      return res.status(404).json({ error: "Area not found" });
    }

    res.json(area);
  } catch (error) {
    console.error("Error updating area:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteArea = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid area ID" });
    }

    await areaService.deleteArea(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting area:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
