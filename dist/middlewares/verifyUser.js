"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyUser = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json("Unauthorized!");
        }
        const jwt_secret = process.env.JWT_SECRET;
        if (!jwt_secret) {
            console.log(new Error("jwt secret key env not found!"));
            return res.status(500).json("Server error!");
        }
        try {
            const user = jsonwebtoken_1.default.verify(token, jwt_secret);
            req.user = user;
            next();
        }
        catch (err) {
            return res.status(403).json("Invalid token!");
        }
    }
    catch (err) {
        res.status(401).json("Unssfsfsdfs");
    }
};
exports.verifyUser = verifyUser;
