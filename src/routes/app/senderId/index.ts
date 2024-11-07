import createSmsSenderId from "@controllers/app/senderid/create";
import { deleteSmsSenderId } from "@controllers/app/senderid/delete";
import { updateSmsSenderId } from "@controllers/app/senderid/update";
import { getAllSmsSenderIds } from "@controllers/app/senderid/user-senderI";
import { isAuthenticated } from "@middlewares/auth/isauthenticated";
import express from "express";

const senderIdRouter = express.Router();

senderIdRouter.route("/create").post(isAuthenticated, createSmsSenderId);
senderIdRouter.route("/delete").delete(isAuthenticated, deleteSmsSenderId);
senderIdRouter.route("/update").patch(isAuthenticated, updateSmsSenderId);
senderIdRouter.route("/all").get(isAuthenticated, getAllSmsSenderIds);

export default senderIdRouter;
