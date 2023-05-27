import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRouter";
import categoryRouter from "./routes/categoryRouter";
import postRouter from "./routes/postRouter";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(express.json());
app.use("/public", express.static("public"));
app.use(cookieParser());
app.use(cors());

process.on("uncaughtException", (ex) => {
  console.log(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex: any) => {
  console.log(ex.message, ex);
  process.exit(1);
});

//connecting mongoose
let mongoUrl =
  "mongodb+srv://xabibullayevmm:16xm06xm@cluster0.mvuaqog.mongodb.net/?retryWrites=true&w=majority";

if (mongoUrl) {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      console.log("MongoDB connected...");
    })
    .catch((err) => console.log(err));
}

// routes
app.use("/api/auth", authRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/posts", postRouter);

//listen specific port
app.listen(5000, () =>
  console.log("Server is running on port http://localhost:5000...")
);
