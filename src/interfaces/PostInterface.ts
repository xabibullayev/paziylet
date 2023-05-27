import { Document } from "mongoose";

export interface IPost extends Document {
  images: [String];
  title: String;
  description: String;
  tags: [String];
}
