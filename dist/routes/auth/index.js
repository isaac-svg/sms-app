"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyemail_1 = require("../../controllers/auth/verifyemail");
const signin_1 = require("../../controllers/auth/signin");
const signup_1 = require("../../controllers/auth/signup");
const status_1 = require("../../controllers/auth/status");
const isauthenticated_1 = require("../../middlewares/auth/isauthenticated");
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
authRouter.route("/check-auth").get(isauthenticated_1.isAuthenticated, status_1.checkAuthentication);
authRouter.route("/signup").post(signup_1.signup);
authRouter.route("/signin").post(signin_1.signin);
authRouter.route("/verify").get(verifyemail_1.VerifyEmail);
authRouter.route("/forgetpassword/:authtoken");
exports.default = authRouter;
