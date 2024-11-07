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
exports.deleteSmsSenderId = deleteSmsSenderId;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function deleteSmsSenderId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { senderId } = req.body;
            const user = req.user;
            if (!user) {
                res.status(400).json({
                    error: "Invalid Token",
                });
                return;
            }
            const smsSender = yield prisma.smsSenderId.findFirst({
                where: {
                    sender_id: senderId,
                    user_id: user.userId,
                },
            });
            if (!smsSender) {
                res.status(404).json({
                    error: "Sender ID not found for the specified user.",
                });
                return;
            }
            yield prisma.smsSenderId.delete({
                where: {
                    id: smsSender.id,
                },
            });
            res.status(200).json({
                message: "Sender ID deleted successfully",
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
