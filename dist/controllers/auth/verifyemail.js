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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmail = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const VerifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.query;
        if (!token) {
            res.status(401).json({ message: "Invalid URL" });
            return;
        }
        if (!process.env.JWT_SECRET) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
        const user = jsonwebtoken_1.default.verify(`${token}`, process.env.JWT_SECRET);
        console.log({ email: user.email });
        yield prisma.user.update({
            where: { email: user.email },
            data: {
                is_active: true,
            },
        });
        res.status(200).json(user);
        return;
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(403).json({ message: "Invalid or expired token" });
            return;
        }
        else {
            console.error("Error verifying token:", error);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    }
});
exports.VerifyEmail = VerifyEmail;
