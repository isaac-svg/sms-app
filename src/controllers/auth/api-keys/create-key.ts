import { generateApiKey } from "@lib/mail/functions";
import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export default async function createApiKey(req: Request, res: Response) {
  try {
    const user = req.user;
    if (!user) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    // Generate a new API key
    const apiKey = generateApiKey();

    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      res.status(404).json({ error: "Invalid token" });
      return;
    }

    const newApiKey = await prisma.apiKey.create({
      data: {
        api_key: apiKey,
        user: { connect: { user_id: existingUser.user_id } },
      },
    });

    res.status(201).json({
      message: "API key generated successfully",
      apiKey: newApiKey.api_key,
    });
  } catch (error) {
    console.error("Error generating API key:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
