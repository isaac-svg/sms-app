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
exports.default = createSmsSenderId;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createSmsSenderId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const senderIdRegex = /^[A-Za-z0-9]{3,12}$/;
            const { senderId } = req.body;
            const user = req.user;
            if (!user) {
                res.status(400).json({
                    error: "Invalid Token",
                });
                return;
            }
            // Validate the senderId format
            if (!senderIdRegex.test(senderId)) {
                res.status(400).json({
                    error: "Sender ID must be 3-12 alphanumeric characters with no special characters.",
                });
                return;
            }
            // Check if the senderId already exists for the user
            const existingSenderId = yield prisma.smsSenderId.findFirst({
                where: {
                    sender_id: senderId,
                    user_id: user.userId,
                },
            });
            if (existingSenderId) {
                res.status(400).json({
                    error: "This Sender ID already exists for the user.",
                });
                return;
            }
            // Create the new SmsSenderId if no duplicate exists
            yield prisma.smsSenderId.create({
                data: {
                    sender_id: senderId,
                    user: { connect: { user_id: user.userId } },
                },
            });
            res.status(200).json({
                message: "Sender ID created successfully",
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
