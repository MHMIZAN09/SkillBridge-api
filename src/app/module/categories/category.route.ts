import { Router } from "express";
import { CategoryController } from "./category.controller";
// import { authMiddleware } from "../../middlewares/authMiddleware";
// import { adminMiddleware } from "../../middlewares/adminMiddleware";

const router = Router();

// Public routes
router.get("/", CategoryController.getAllCategories);
router.get("/slug/:slug", CategoryController.getCategoryBySlug);
router.get("/:id", CategoryController.getCategoryById);

// Admin routes
router.post(
  "/",
  // authMiddleware,
  // adminMiddleware,
  CategoryController.createCategory,
);

router.patch(
  "/:id",
  // authMiddleware,
  // adminMiddleware,
  CategoryController.updateCategory,
);

router.delete(
  "/:id",
  // authMiddleware,
  // adminMiddleware,
  CategoryController.deleteCategory,
);

export const CategoryRoute = router;
