import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function updateSmsSenderId(req: Request, res: Response) {
  try {
    const { oldSenderId, newSenderId } = req.body;
    const user = req.user;

    if (!user) {
      res.status(400).json({
        error: "Invalid Token",
      });
      return;
    }

    const senderIdRegex = /^[A-Za-z0-9]{3,12}$/;
    if (!senderIdRegex.test(newSenderId)) {
      res.status(400).json({
        error:
          "Sender ID must be 3-12 alphanumeric characters with no special characters.",
      });
      return;
    }

    // Check if the new senderId already exists for the user
    const existingSenderId = await prisma.smsSenderId.findFirst({
      where: {
        sender_id: newSenderId,
        user_id: user.userId,
      },
    });

    if (existingSenderId) {
      res.status(400).json({
        error: "This Sender ID already exists for the user.",
      });
      return;
    }

    // Find the existing sender ID to update
    const smsSender = await prisma.smsSenderId.findFirst({
      where: {
        sender_id: oldSenderId,
        user_id: user.userId,
      },
    });

    if (!smsSender) {
      res.status(404).json({
        error: "Sender ID not found for the specified user.",
      });
      return;
    }

    // Update the sender ID
    await prisma.smsSenderId.update({
      where: {
        id: smsSender.id,
      },
      data: {
        sender_id: newSenderId,
      },
    });

    res.status(200).json({
      message: "Sender ID updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
