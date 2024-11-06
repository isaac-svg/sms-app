import { VerifyEmail } from "@controllers/auth/verifyemail";
import { signin } from "@controllers/auth/signin";
import { signup } from "@controllers/auth/signup";
import { checkAuthentication } from "@controllers/auth/status";
import { isAuthenticated } from "@middlewares/auth/isauthenticated";
import express, { Express, Request, Response } from "express";

const authRouter = express.Router();

authRouter.route("/check-auth").get(isAuthenticated, checkAuthentication);
authRouter.route("/signup").post(signup);
authRouter.route("/signin").post(signin);
authRouter.route("/verify").get(VerifyEmail);

authRouter.route("/forgetpassword/:authtoken");

export default authRouter;
