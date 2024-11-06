import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export default async function deleteApiKey(req: Request, res: Response) {
  try {
    const user = req.user;
    const { apiKey } = req.body;

    if (!user || !apiKey) {
      res.status(400).json({ error: "User and API key must be provided" });
      return;
    }

    const apiKeyToDelete = await prisma.apiKey.findFirst({
      where: {
        api_key: apiKey,
        user_id: user.userId,
      },
    });

    if (!apiKeyToDelete) {
      res
        .status(404)
        .json({ error: "API key not found for the specified user" });
      return;
    }

    await prisma.apiKey.delete({
      where: {
        api_key_id: apiKeyToDelete.api_key_id,
      },
    });

    res.status(200).json({ message: "API key deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
