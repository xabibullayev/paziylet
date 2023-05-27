import Category from "../models/CategoryModel";
import { Request, Response } from "express";

//Get a category
export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //validate
    if (!id) {
      return res.status(400).json("Category id is required!");
    }

    const category = await Category.findById(id);

    res.status(200).json(category);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    res.status(500).json(message);
  }
};

//Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    res.status(500).json(message);
  }
};

//Add new category
export const addCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    //validate
    if (!name) {
      return res.status(400).json("Please enter all required fields!");
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json("This category is already exist!");
    }

    //save new category
    const newCategory = new Category({
      name,
    });

    await newCategory.save();

    res.status(200).json("Category has been created!");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    res.status(500).json(message);
  }
};

//Edit category
export const editCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    //validate
    if (!name || !id) {
      return res.status(400).json("Category id and name is required!");
    }

    const existingCategory = await Category.findByIdAndUpdate(id, {
      $set: { name },
    });
    if (!existingCategory) {
      return res.status(400).json("No category found for the given id!");
    }

    res.status(200).json("Category has been updated!");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    res.status(500).json(message);
  }
};

//Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //validate
    if (!id) {
      return res.status(400).json("Category id is required!");
    }

    const existingCategory = await Category.findByIdAndDelete(id);
    if (!existingCategory) {
      return res.status(400).json("No category founf for the given id!");
    }

    res.status(200).json("Category has been deleted!");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    res.status(500).json(message);
  }
};
