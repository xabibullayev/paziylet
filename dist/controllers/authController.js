"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//REGISTER A USER
const register = async (req, res) => {
    try {
        const { phone, password, isAdmin } = req.body;
        //validation
        if (!phone || !password) {
            return res.status(400).json("Please enter all required fields!");
        }
        const existingUser = await UserModel_1.default.findOne({ phone });
        if (existingUser) {
            return res.status(400).json("This phone is already exist!");
        }
        //hashing password
        const salt = await bcryptjs_1.default.genSalt(10);
        const hashedPassword = await bcryptjs_1.default.hash(password, salt);
        //save new user
        const newUser = new UserModel_1.default({
            phone,
            password: hashedPassword,
            isAdmin,
        });
        await newUser.save();
        //response to client
        res.status(200).json("User has been created!");
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.register = register;
// LOGIN A USER
const login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        //validate
        if (!phone || !password) {
            return res.status(400).json("Please enter all required fields!");
        }
        const user = await UserModel_1.default.findOne({ phone });
        if (!user) {
            return res.status(400).json("Phone or password is incorrect!");
        }
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json("Phone or password is incorrect!");
        }
        //generate token
        const jwt_secret = process.env.JWT_SECRET;
        if (!jwt_secret) {
            return res.status(500).json("Server error!");
        }
        const token = jsonwebtoken_1.default.sign({
            phone: user.phone,
            isAdmin: user.isAdmin,
        }, jwt_secret);
        res
            .cookie("access_token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        })
            .status(200)
            .json("Logged in succesfully!");
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.login = login;
//LOGOUT
const logout = async (req, res) => {
    try {
        res
            .cookie("access_token", "", {
            httpOnly: true,
            expires: new Date(0),
        })
            .status(200)
            .json("Logged out succesfully!");
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.logout = logout;
