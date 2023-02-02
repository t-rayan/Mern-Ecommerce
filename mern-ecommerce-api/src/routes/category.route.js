import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
  getCategory,
} from "../controllers/category.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkisAdmin } from "../middlewares/isAdmin.middleware.js";

const categoryRouter = express.Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", addCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.get("/:id", getCategory);
export default categoryRouter;
