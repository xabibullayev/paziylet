"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.editCategory = exports.addCategory = exports.getCategories = exports.getCategory = void 0;
const CategoryModel_1 = __importDefault(require("../models/CategoryModel"));
//Get a category
const getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        //validate
        if (!id) {
            return res.status(400).json("Category id is required!");
        }
        const category = await CategoryModel_1.default.findById(id);
        res.status(200).json(category);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.getCategory = getCategory;
//Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await CategoryModel_1.default.find();
        res.status(200).json(categories);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.getCategories = getCategories;
//Add new category
const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        //validate
        if (!name) {
            return res.status(400).json("Please enter all required fields!");
        }
        const existingCategory = await CategoryModel_1.default.findOne({ name });
        if (existingCategory) {
            return res.status(400).json("This category is already exist!");
        }
        //save new category
        const newCategory = new CategoryModel_1.default({
            name,
        });
        await newCategory.save();
        res.status(200).json("Category has been created!");
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.addCategory = addCategory;
//Edit category
const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        //validate
        if (!name || !id) {
            return res.status(400).json("Category id and name is required!");
        }
        const existingCategory = await CategoryModel_1.default.findByIdAndUpdate(id, {
            $set: { name },
        });
        if (!existingCategory) {
            return res.status(400).json("No category found for the given id!");
        }
        res.status(200).json("Category has been updated!");
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.editCategory = editCategory;
//Delete category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        //validate
        if (!id) {
            return res.status(400).json("Category id is required!");
        }
        const existingCategory = await CategoryModel_1.default.findByIdAndDelete(id);
        if (!existingCategory) {
            return res.status(400).json("No category founf for the given id!");
        }
        res.status(200).json("Category has been deleted!");
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.deleteCategory = deleteCategory;
