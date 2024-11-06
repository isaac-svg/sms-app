import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();
export const VerifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      res.status(401).json({ message: "Invalid URL" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }

    const user = jwt.verify(`${token}`, process.env.JWT_SECRET);
    console.log({ email: (user as jwt.JwtPayload).email });
    await prisma.user.update({
      where: { email: (user as jwt.JwtPayload).email },
      data: {
        is_active: true,
      },
    });
    res.status(200).json(user);
    return;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ message: "Invalid or expired token" });
      return;
    } else {
      console.error("Error verifying token:", error);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
};
