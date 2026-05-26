import { Router } from "express";
import { CategoryRoute } from "../module/categories/category.route";
import { AuthRoutes } from "../module/auth/auth.route";

const router = Router();
router.use("/categories", CategoryRoute);
router.use("/auth", AuthRoutes);
export const IndexRoute = router;
