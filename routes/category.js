import express from 'express';
import categoryController from "../controllers/category.js";

const router = express.Router();
router.post("/", categoryController.createCategory);
router.get("/", categoryController.getAllCategories);
router.get("/:categoryId", categoryController.getCategoryById);
router.put("/:categoryId", categoryController.updateCategory);
router.delete("/:categoryId", categoryController.deleteCategory);

export default router;
