import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getAllSmsSenderIds(req: Request, res: Response) {
  try {
    const user = req.user;

    if (!user) {
      res.status(400).json({
        error: "Invalid Token",
      });
      return;
    }

    const senderIds = await prisma.smsSenderId.findMany({
      where: {
        user_id: user.userId,
      },
      select: {
        sender_id: true,
      },
    });

    if (senderIds.length === 0) {
      res.status(404).json({
        message: "No Sender IDs found for this user.",
      });
      return;
    }

    res.status(200).json({
      message: "Sender IDs fetched successfully.",
      senderIds: senderIds.map((sender) => sender.sender_id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
