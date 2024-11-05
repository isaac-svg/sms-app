import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "";

export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password_hash, email } = req.body;
    // check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password_hash, 10);
    await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
        username,
      },
    });

    res.status(201).json({ message: "User created successfully" });
    return;
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
