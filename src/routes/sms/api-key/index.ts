import createApiKey from "@controllers/auth/api-keys/create-key";
import deleteApiKey from "@controllers/auth/api-keys/delete-key";
import { isAuthenticated } from "@middlewares/auth/isauthenticated";
import express from "express";

const apiKeyRouter = express.Router();

apiKeyRouter.route("/create").post(isAuthenticated, createApiKey);
apiKeyRouter.route("/delete").delete(isAuthenticated, deleteApiKey);

export default apiKeyRouter;
