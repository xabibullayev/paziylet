"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const categoryRouter_1 = __importDefault(require("./routes/categoryRouter"));
const postRouter_1 = __importDefault(require("./routes/postRouter"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use("/public", express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
process.on("uncaughtException", (ex) => {
    console.log(ex.message, ex);
    process.exit(1);
});
process.on("unhandledRejection", (ex) => {
    console.log(ex.message, ex);
    process.exit(1);
});
//connecting mongoose
let mongoUrl = "mongodb+srv://xabibullayevmm:16xm06xm@cluster0.mvuaqog.mongodb.net/?retryWrites=true&w=majority";
if (mongoUrl) {
    mongoose_1.default
        .connect(mongoUrl)
        .then(() => {
        console.log("MongoDB connected...");
    })
        .catch((err) => console.log(err));
}
// routes
app.use("/api/auth", authRouter_1.default);
app.use("/api/categories", categoryRouter_1.default);
app.use("/api/posts", postRouter_1.default);
//listen specific port
app.listen(5000, () => console.log("Server is running on port http://localhost:5000..."));
