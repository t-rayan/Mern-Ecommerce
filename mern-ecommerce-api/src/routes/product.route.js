import express from "express";
import {
  addProduct,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  getProduct,
  searchProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/search", searchProducts);

productRouter.post("/", addProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", updateProduct);

productRouter.post("/image", deleteProductImage);

export default productRouter;
