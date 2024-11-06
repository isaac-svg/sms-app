import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendVerificationEmail from "@lib/mail/account-verification";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "";

export const signin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log({ email, password });
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: "email or password incorrect" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ error: "email or password incorrect" });
      return;
    }

    const mailtoken = jwt.sign(
      { userId: user.user_id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
    await sendVerificationEmail(email, mailtoken);

    const token = jwt.sign(
      { userId: user.user_id, email: user.email },
      JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
    return;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
