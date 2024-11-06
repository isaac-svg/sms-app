import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default async function createSmsSenderId(req: Request, res: Response) {
  try {
    const senderIdRegex = /^[A-Za-z0-9]{3,12}$/;
    const { senderId } = req.body;
    const user = req.user;

    if (!user) {
      res.status(400).json({
        error: "Invalid Token",
      });
      return;
    }

    // Validate the senderId format
    if (!senderIdRegex.test(senderId)) {
      res.status(400).json({
        error:
          "Sender ID must be 3-12 alphanumeric characters with no special characters.",
      });
      return;
    }

    // Check if the senderId already exists for the user
    const existingSenderId = await prisma.smsSenderId.findFirst({
      where: {
        sender_id: senderId,
        user_id: user.userId,
      },
    });

    if (existingSenderId) {
      res.status(400).json({
        error: "This Sender ID already exists for the user.",
      });
      return;
    }

    // Create the new SmsSenderId if no duplicate exists
    await prisma.smsSenderId.create({
      data: {
        sender_id: senderId,
        user: { connect: { user_id: user.userId } },
      },
    });

    res.status(200).json({
      message: "Sender ID created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
