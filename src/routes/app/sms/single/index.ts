import sendSingleSMS from "@controllers/app/sms/single";
import { isAuthenticated } from "@middlewares/auth/isauthenticated";
import express from "express";

const singleSMSRoute = express.Router();

singleSMSRoute.route("/send").post(sendSingleSMS);
// singleSMSRoute.route("/delete").delete(isAuthenticated, deleteSmsSenderId);
// singleSMSRoute.route("/update").patch(isAuthenticated, updateSmsSenderId);
// singleSMSRoute.route("/all").get(isAuthenticated, getAllSmsSenderIds);

export default singleSMSRoute;
