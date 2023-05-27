import { Router } from "express";
import {
  addPost,
  deletePost,
  editPost,
  getPost,
  getPosts,
} from "../controllers/postController";
import { verifyUser } from "../middlewares/verifyUser";
import { uploadImage } from "../middlewares/uploadMiddleware";
import { verifyAdmin } from "../middlewares/verifyAdmin";

const router = Router();

router.get("/:id", verifyUser, getPost);
router.get("/", verifyUser, getPosts);
router.post("/", verifyUser, verifyAdmin, uploadImage, addPost);
router.patch("/:id", verifyUser, verifyAdmin, editPost);
router.delete("/:id", verifyUser, verifyAdmin, deletePost);

export default router;
