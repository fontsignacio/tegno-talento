import { Request, Response } from "express";
import * as profileService from "../services/profileService";

export const listProfiles = async (req: Request, res: Response) => {
  try {
    const { area, experienceLevel, q } = req.query as any;
    const profiles = await profileService.getProfiles({ area, experienceLevel, q });
    res.json({ data: profiles });
  } catch (error) {
    console.error("Error listing profiles:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid profile ID" });
    }
    const profile = await profileService.getProfileById(id);
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json({ data: profile });
  } catch (error) {
    console.error("Error getting profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


