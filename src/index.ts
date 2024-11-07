import { PrismaClient } from "@prisma/client";
import app from "./app";
const port = process.env.PORT || 3000;
const prisma = new PrismaClient();
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
