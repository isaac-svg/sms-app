import createSmsSenderId from "@controllers/sms/senderid/create";
import { deleteSmsSenderId } from "@controllers/sms/senderid/delete";
import { updateSmsSenderId } from "@controllers/sms/senderid/update";
import { getAllSmsSenderIds } from "@controllers/sms/senderid/user-senderI";
import { isAuthenticated } from "@middlewares/auth/isauthenticated";
import express from "express";

const senderIdRouter = express.Router();

senderIdRouter.route("/create").post(isAuthenticated, createSmsSenderId);
senderIdRouter.route("/delete").delete(isAuthenticated, deleteSmsSenderId);
senderIdRouter.route("/update").patch(isAuthenticated, updateSmsSenderId);
senderIdRouter.route("/all").get(isAuthenticated, getAllSmsSenderIds);

export default senderIdRouter;
