"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const single_1 = __importDefault(require("@controllers/app/sms/single"));
const express_1 = __importDefault(require("express"));
const singleSMSRoute = express_1.default.Router();
//
singleSMSRoute.route("/send").post(single_1.default);
// singleSMSRoute.route("/delete").delete(isAuthenticated, deleteSmsSenderId);
// singleSMSRoute.route("/update").patch(isAuthenticated, updateSmsSenderId);
// singleSMSRoute.route("/all").get(isAuthenticated, getAllSmsSenderIds);
exports.default = singleSMSRoute;
