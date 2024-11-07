"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_key_1 = __importDefault(require("@controllers/auth/api-keys/create-key"));
const delete_key_1 = __importDefault(require("@controllers/auth/api-keys/delete-key"));
const isauthenticated_1 = require("@middlewares/auth/isauthenticated");
const express_1 = __importDefault(require("express"));
const apiKeyRouter = express_1.default.Router();
apiKeyRouter.route("/create").post(isauthenticated_1.isAuthenticated, create_key_1.default);
apiKeyRouter.route("/delete").delete(isauthenticated_1.isAuthenticated, delete_key_1.default);
exports.default = apiKeyRouter;
