import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export default async function sendSingleSMS(req: Request, res: Response) {
  try {
    const { msisdn, sender_id, message } = req.body;

    if (!msisdn || !sender_id || !message) {
      res.status(400).json({
        error: "Missing required fields: msisdn, sender_id, or message",
      });
      return;
    }

    const payload = {
      msisdn,
      sender_id,
      message,
      key: process.env.SMS_KEY,
    };

    const smsResponse = await fetch(
      "https://sms.nalosolutions.com/smsbackend/Resl_Nalo/send-message/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        redirect: "follow",
      }
    );

    const result = await smsResponse.json();
    const { status, message: res_message } = result;

    if (res_message) {
      res.status(400).json({ error: res_message });
      return;
    }

    await prisma.smsMessage.create({
      data: {
        sender_address: sender_id,
        receiver_address: msisdn,
        message: message,
        status: "Sent",
        sent_at: new Date(),
      },
    });

    res.status(200).json({
      message: "SMS sent successfully",
      result: result,
    });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({
      error: "Error sending SMS",
    });
  } finally {
    await prisma.$disconnect();
  }
}
