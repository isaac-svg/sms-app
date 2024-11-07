"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const api_key_1 = __importDefault(require("./routes/app/api-key"));
const senderId_1 = __importDefault(require("./routes/app/senderId"));
const single_1 = __importDefault(require("./routes/app/sms/single"));
dotenv_1.default.config({
    path: ".env",
});
// https://sms.nalosolutions.com/smsbackend/clientapi/Resl_Nalo/send-message
// )746!fnmok(5r9!huv_ngbcf(q6519i9zr@g114vfoc0yt4_bdee8wg7dw5j8j0v
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
const prisma = new client_1.PrismaClient();
app.use("/app/smarton/v1", auth_1.default);
app.use("/app/smarton/v1/apikey", api_key_1.default);
app.use("/app/smarton/v1/senderid", senderId_1.default);
app.use("/app/smarton/v1/sms/single", single_1.default);
app.get("/", (req, res) => {
    res.send("WELCOME HOME");
});
//
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const users = await prisma.user.findMany({
        //   include: { api_keys: true },
        // });
        // const apikeys = await prisma.apiKey.findMany();
        // console.log(users);
        // console.log(apikeys);
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    }
    catch (error) {
        console.log(error.message);
        () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.$disconnect(); });
    }
    finally {
        () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.$disconnect(); });
    }
}));
