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
exports.getAllSmsSenderIds = getAllSmsSenderIds;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getAllSmsSenderIds(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (!user) {
                res.status(400).json({
                    error: "Invalid Token",
                });
                return;
            }
            const senderIds = yield prisma.smsSenderId.findMany({
                where: {
                    user_id: user.userId,
                },
                select: {
                    sender_id: true,
                },
            });
            if (senderIds.length === 0) {
                res.status(404).json({
                    message: "No Sender IDs found for this user.",
                });
                return;
            }
            res.status(200).json({
                message: "Sender IDs fetched successfully.",
                senderIds: senderIds.map((sender) => sender.sender_id),
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
