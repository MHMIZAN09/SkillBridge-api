import { Router } from "express";
import { CategoryRoute } from "../module/categories/category.route";

const router = Router();
router.use("/categories", CategoryRoute);

export const IndexRoute = router;
