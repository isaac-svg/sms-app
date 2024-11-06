import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import authRouter from "@routes/auth";
import sendVerificationEmail from "@lib/mail/account-verification";
dotenv.config({
  path: ".env",
});
// )746!fnmok(5r9!huv_ngbcf(q6519i9zr@g114vfoc0yt4_bdee8wg7dw5j8j0v
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const prisma = new PrismaClient();

app.use("/app/smarton/v1", authRouter);

app.listen(port, async () => {
  try {
    const users = await prisma.user.findMany();
    console.log(users);
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  } catch (error: any) {
    console.log(error.message);
    async () => await prisma.$disconnect();
  } finally {
    async () => await prisma.$disconnect();
  }
});
