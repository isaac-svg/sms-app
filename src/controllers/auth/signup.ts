import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import sendVerificationEmail from "@lib/mail/account-verification";

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
    const user = await prisma.user.create({
      data: {
        email,
        password_hash: hashedPassword,
        username,
      },
    });
    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    await sendVerificationEmail(email, token);

    res.status(201).json({ message: "User created successfully" });
    return;
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
