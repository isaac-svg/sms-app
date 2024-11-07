import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function deleteSmsSenderId(req: Request, res: Response) {
  try {
    const { senderId } = req.body;
    const user = req.user;

    if (!user) {
      res.status(400).json({
        error: "Invalid Token",
      });
      return;
    }

    const smsSender = await prisma.smsSenderId.findFirst({
      where: {
        sender_id: senderId,
        user_id: user.userId,
      },
    });

    if (!smsSender) {
      res.status(404).json({
        error: "Sender ID not found for the specified user.",
      });
      return;
    }

    await prisma.smsSenderId.delete({
      where: {
        id: smsSender.id,
      },
    });

    res.status(200).json({
      message: "Sender ID deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
