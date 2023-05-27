import mongoose from "mongoose";
import { IPost } from "../interfaces/PostInterface";

const postSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
});

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
