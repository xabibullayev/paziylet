import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
  getCategory,
} from "../controllers/categoryController";
import { verifyAdmin } from "../middlewares/verifyAdmin";
import { verifyUser } from "../middlewares/verifyUser";

const router = Router();

router.get("/:id", verifyUser, getCategory);
router.get("/", verifyUser, getCategories);
router.post("/", verifyUser, verifyAdmin, addCategory);
router.patch("/:id", verifyUser, verifyAdmin, editCategory);
router.delete("/:id", verifyUser, verifyAdmin, deleteCategory);

export default router;
