import prisma from "../config/db";
import { CreateUserDTO } from "../types/user";

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const createUser = async (data: CreateUserDTO) => {
  return prisma.user.create({ data });
};



