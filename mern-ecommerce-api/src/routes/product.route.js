import express from "express";
import {
  addProduct,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  getAllProductsByCategory,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProduct);
productRouter.get("/:category", getAllProductsByCategory);

productRouter.post("/", addProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", updateProduct);

productRouter.post("/image", deleteProductImage);

export default productRouter;
