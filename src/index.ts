import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import authRouter from "@routes/auth";
import apiKeyRouter from "@routes/app/api-key";
import senderIdRouter from "@routes/app/senderId";
import singleSMSRoute from "@routes/app/sms/single";
import bodyParser = require("body-parser");
dotenv.config({
  path: ".env",
});
// https://sms.nalosolutions.com/smsbackend/clientapi/Resl_Nalo/send-message
const app: Express = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const prisma = new PrismaClient();

app.use("/app/smarton/v1", authRouter);
app.use("/app/smarton/v1/apikey", apiKeyRouter);
app.use("/app/smarton/v1/senderid", senderIdRouter);
app.use("/app/smarton/v1/sms/single", singleSMSRoute);

app.get("/", (req, res) => {
  res.send("WELCOME HOME");
});
//
app.listen(port, async () => {
  try {
    // const users = await prisma.user.findMany({
    //   include: { api_keys: true },
    // });
    // const apikeys = await prisma.apiKey.findMany();
    // console.log(users);
    // console.log(apikeys);
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  } catch (error: any) {
    console.log(error.message);
    async () => await prisma.$disconnect();
  } finally {
    async () => await prisma.$disconnect();
  }
});
