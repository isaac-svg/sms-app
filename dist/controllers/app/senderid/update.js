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
exports.updateSmsSenderId = updateSmsSenderId;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function updateSmsSenderId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { oldSenderId, newSenderId } = req.body;
            const user = req.user;
            if (!user) {
                res.status(400).json({
                    error: "Invalid Token",
                });
                return;
            }
            const senderIdRegex = /^[A-Za-z0-9]{3,12}$/;
            if (!senderIdRegex.test(newSenderId)) {
                res.status(400).json({
                    error: "Sender ID must be 3-12 alphanumeric characters with no special characters.",
                });
                return;
            }
            // Check if the new senderId already exists for the user
            const existingSenderId = yield prisma.smsSenderId.findFirst({
                where: {
                    sender_id: newSenderId,
                    user_id: user.userId,
                },
            });
            if (existingSenderId) {
                res.status(400).json({
                    error: "This Sender ID already exists for the user.",
                });
                return;
            }
            // Find the existing sender ID to update
            const smsSender = yield prisma.smsSenderId.findFirst({
                where: {
                    sender_id: oldSenderId,
                    user_id: user.userId,
                },
            });
            if (!smsSender) {
                res.status(404).json({
                    error: "Sender ID not found for the specified user.",
                });
                return;
            }
            // Update the sender ID
            yield prisma.smsSenderId.update({
                where: {
                    id: smsSender.id,
                },
                data: {
                    sender_id: newSenderId,
                },
            });
            res.status(200).json({
                message: "Sender ID updated successfully",
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                error: "Internal Server Error",
            });
        }
    });
}
