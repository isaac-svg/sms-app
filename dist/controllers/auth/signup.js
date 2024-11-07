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
exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const account_verification_1 = __importDefault(require("../../lib/mail/account-verification"));
const prisma = new client_1.PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "";
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password_hash, email } = req.body;
        // check if user already exists
        const existingUser = yield prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password_hash, 10);
        const user = yield prisma.user.create({
            data: {
                email,
                password_hash: hashedPassword,
                username,
            },
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.user_id, email: user.email }, JWT_SECRET, { expiresIn: "24h" });
        yield (0, account_verification_1.default)(email, token);
        res.status(201).json({ message: "User created successfully" });
        return;
    }
    catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.signup = signup;
