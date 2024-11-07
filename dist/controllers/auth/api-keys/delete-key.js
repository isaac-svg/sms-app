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
exports.default = deleteApiKey;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function deleteApiKey(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            const { apiKey } = req.body;
            if (!user || !apiKey) {
                res.status(400).json({ error: "User and API key must be provided" });
                return;
            }
            const apiKeyToDelete = yield prisma.apiKey.findFirst({
                where: {
                    api_key: apiKey,
                    user_id: user.userId,
                },
            });
            if (!apiKeyToDelete) {
                res
                    .status(404)
                    .json({ error: "API key not found for the specified user" });
                return;
            }
            yield prisma.apiKey.delete({
                where: {
                    api_key_id: apiKeyToDelete.api_key_id,
                },
            });
            res.status(200).json({ message: "API key deleted successfully" });
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
