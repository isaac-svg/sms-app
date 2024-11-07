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
exports.default = createApiKey;
const functions_1 = require("@lib/mail/functions");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createApiKey(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (!user) {
                res.status(401).json({ error: "Invalid token" });
                return;
            }
            // Generate a new API key
            const apiKey = (0, functions_1.generateApiKey)();
            const existingUser = yield prisma.user.findUnique({
                where: { email: user.email },
            });
            if (!existingUser) {
                res.status(404).json({ error: "Invalid token" });
                return;
            }
            const newApiKey = yield prisma.apiKey.create({
                data: {
                    api_key: apiKey,
                    user: { connect: { user_id: existingUser.user_id } },
                },
            });
            res.status(201).json({
                message: "API key generated successfully",
                apiKey: newApiKey.api_key,
            });
        }
        catch (error) {
            console.error("Error generating API key:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
