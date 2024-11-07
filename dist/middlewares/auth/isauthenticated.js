"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
const isAuthenticated = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
        if (!token) {
            res.status(401).json({ error: "Access token is missing" });
            return;
        }
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).json({ error: "Invalid token" });
                return;
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
        return;
    }
};
exports.isAuthenticated = isAuthenticated;
