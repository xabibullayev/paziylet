import Post from "../models/PostModel";
import { Request, Response } from "express";
import fs from "fs";

//Get a post
export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //validate
    if (!id) {
      return res.status(400).json("Post id is required!");
    }

    const category = await Post.findById(id);
    if (!category) {
      return res.status(400).json("No post found for the given id!");
    }

    res.status(200).json(category);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    res.status(500).json(message);
  }
};

//Get all posts
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    res.status(500).json(message);
  }
};

//Add new post
export const addPost = async (req: Request, res: Response) => {
  try {
    const { title, description, tags } = req.body;
    const files = req.files as Express.Multer.File[];

    const images = files.map((file) => {
      return file.filename;
    });

    //validation
    if (!title || !description || !tags || !images) {
      return res.status(400).json("Please enter all required fields!");
    }

    const newPost = new Post({
      images,
      title,
      description,
      tags,
    });

    await newPost.save();

    res.status(200).json("Post has been created!");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    res.status(500).json(message);
  }
};

//Edit post
export const editPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    //validate
    if (!id) {
      return res.status(400).json("Post id is required!");
    }

    const existingCategory = await Post.findByIdAndUpdate(id, {
      $set: req.body,
    });

    if (!existingCategory) {
      return res.status(400).json("No post found for the given id!");
    }

    res.status(200).json("Post has been updated!");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    res.status(500).json(message);
  }
};

//Delete post
export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let message;

    //validate
    if (!id) {
      return res.status(400).json("Post id is required!");
    }

    const existingPost = await Post.findById(id);

    if (!existingPost) {
      return res.status(400).json("No post found for the given id!");
    }

    if (existingPost.images) {
      existingPost.images.map((img) => {
        try {
          fs.unlinkSync(`./public/images/${img}`);
        } catch (err) {}
      });
    }

    await existingPost.deleteOne();

    res.status(200).json("Post has been deleted!");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error!";
    return res.status(500).json(message);
  }
};
