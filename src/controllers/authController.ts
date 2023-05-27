import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { IUser } from "../interfaces/UserInterface";
import User from "../models/UserModel";
import jwt from "jsonwebtoken";

//REGISTER A USER
export const register = async (req: Request, res: Response) => {
  try {
    const { phone, password, isAdmin } = req.body;

    //validation
    if (!phone || !password) {
      return res.status(400).json("Please enter all required fields!");
    }

    const existingUser: IUser | null = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json("This phone is already exist!");
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //save new user
    const newUser = new User({
      phone,
      password: hashedPassword,
      isAdmin,
    });
    await newUser.save();

    //response to client
    res.status(200).json("User has been created!");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    res.status(500).json(message);
  }
};

// LOGIN A USER
export const login = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    //validate
    if (!phone || !password) {
      return res.status(400).json("Please enter all required fields!");
    }

    const user: IUser | null = await User.findOne({ phone });
    if (!user) {
      return res.status(400).json("Phone or password is incorrect!");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json("Phone or password is incorrect!");
    }

    //generate token
    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
      return res.status(500).json("Server error!");
    }

    const token = jwt.sign(
      {
        phone: user.phone,
        isAdmin: user.isAdmin,
      },
      jwt_secret
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json("Logged in succesfully!");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    res.status(500).json(message);
  }
};

//LOGOUT
export const logout = async (req: Request, res: Response) => {
  try {
    res
      .cookie("access_token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .status(200)
      .json("Logged out succesfully!");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    res.status(500).json(message);
  }
};
