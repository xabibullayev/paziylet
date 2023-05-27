import mongoose from "mongoose";
import { ICategory } from "../interfaces/CategoryInterface";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
