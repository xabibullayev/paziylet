import { Document } from "mongoose";

export interface IUser extends Document {
  phone: string;
  password: string;
  isAdmin: boolean;
}
