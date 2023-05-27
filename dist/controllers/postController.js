"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.addPost = exports.getPosts = exports.getPost = void 0;
const PostModel_1 = __importDefault(require("../models/PostModel"));
const fs_1 = __importDefault(require("fs"));
//Get a post
const getPost = async (req, res) => {
    try {
        const { id } = req.params;
        //validate
        if (!id) {
            return res.status(400).json("Post id is required!");
        }
        const category = await PostModel_1.default.findById(id);
        if (!category) {
            return res.status(400).json("No post found for the given id!");
        }
        res.status(200).json(category);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.getPost = getPost;
//Get all posts
const getPosts = async (req, res) => {
    try {
        const posts = await PostModel_1.default.find();
        res.status(200).json(posts);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.getPosts = getPosts;
//Add new post
const addPost = async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const files = req.files;
        const images = files.map((file) => {
            return file.filename;
        });
        //validation
        if (!title || !description || !tags || !images) {
            return res.status(400).json("Please enter all required fields!");
        }
        const newPost = new PostModel_1.default({
            images,
            title,
            description,
            tags,
        });
        await newPost.save();
        res.status(200).json("Post has been created!");
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.addPost = addPost;
//Edit post
const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        //validate
        if (!id) {
            return res.status(400).json("Post id is required!");
        }
        const existingCategory = await PostModel_1.default.findByIdAndUpdate(id, {
            $set: req.body,
        });
        if (!existingCategory) {
            return res.status(400).json("No post found for the given id!");
        }
        res.status(200).json("Post has been updated!");
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        res.status(500).json(message);
    }
};
exports.editPost = editPost;
//Delete post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        let message;
        //validate
        if (!id) {
            return res.status(400).json("Post id is required!");
        }
        const existingPost = await PostModel_1.default.findById(id);
        if (!existingPost) {
            return res.status(400).json("No post found for the given id!");
        }
        if (existingPost.images) {
            existingPost.images.map((img) => {
                try {
                    fs_1.default.unlinkSync(`./public/images/${img}`);
                }
                catch (err) { }
            });
        }
        await existingPost.deleteOne();
        res.status(200).json("Post has been deleted!");
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error!";
        return res.status(500).json(message);
    }
};
exports.deletePost = deletePost;
