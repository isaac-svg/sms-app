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
exports.signin = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const account_verification_1 = __importDefault(require("../../lib/mail/account-verification"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "";
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log({ email, password });
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            res.status(401).json({ error: "email or password incorrect" });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            res.status(401).json({ error: "email or password incorrect" });
            return;
        }
        const mailtoken = jsonwebtoken_1.default.sign({ userId: user.user_id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });
        yield (0, account_verification_1.default)(email, mailtoken);
        const token = jsonwebtoken_1.default.sign({ userId: user.user_id, email: user.email }, JWT_SECRET, { expiresIn: "15d" });
        res.status(200).json({
            message: "Login successful",
            token,
        });
        return;
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.signin = signin;
