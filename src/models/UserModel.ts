import mongoose from "mongoose";
import { IUser } from "../interfaces/UserInterface";

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
