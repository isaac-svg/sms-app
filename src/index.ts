import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import authRouter from "@routes/auth";
dotenv.config({
  path: ".env",
});

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const prisma = new PrismaClient();

app.use("/app/smarton/v1", authRouter);

app.listen(port, async () => {
  try {
    const users = await prisma.user.findMany();
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  } catch (error: any) {
    console.log(error.message);
    async () => await prisma.$disconnect();
  } finally {
    async () => await prisma.$disconnect();
  }
});
