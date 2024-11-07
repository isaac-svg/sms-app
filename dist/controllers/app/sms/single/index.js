"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendSingleSMS;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function sendSingleSMS(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const smsResponse = yield fetch("https://sms.nalosolutions.com/smsbackend/Resl_Nalo/send-message/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                redirect: "follow",
            });
            const result = yield smsResponse.json();
            const { status, message: res_message } = result;
            if (res_message) {
                res.status(400).json({ error: res_message });
                return;
            }
            yield prisma.smsMessage.create({
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
        }
        catch (error) {
            console.error("Error sending SMS:", error);
            res.status(500).json({
                error: "Error sending SMS",
            });
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
