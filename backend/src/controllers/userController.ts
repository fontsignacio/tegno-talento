import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body as { name: string; email: string };
    const newUser = await userService.createUser({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};



