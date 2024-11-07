"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_1 = __importDefault(require("@controllers/app/senderid/create"));
const delete_1 = require("@controllers/app/senderid/delete");
const update_1 = require("@controllers/app/senderid/update");
const user_senderI_1 = require("@controllers/app/senderid/user-senderI");
const isauthenticated_1 = require("@middlewares/auth/isauthenticated");
const express_1 = __importDefault(require("express"));
const senderIdRouter = express_1.default.Router();
senderIdRouter.route("/create").post(isauthenticated_1.isAuthenticated, create_1.default);
senderIdRouter.route("/delete").delete(isauthenticated_1.isAuthenticated, delete_1.deleteSmsSenderId);
senderIdRouter.route("/update").patch(isauthenticated_1.isAuthenticated, update_1.updateSmsSenderId);
senderIdRouter.route("/all").get(isauthenticated_1.isAuthenticated, user_senderI_1.getAllSmsSenderIds);
exports.default = senderIdRouter;
