import express from "express";
import { addNewBrand, getAllBrands } from "../controllers/brand.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const brandRouter = express.Router();

// route to create a new brand
brandRouter.get("/", getAllBrands);

brandRouter.post("/", verifyToken, addNewBrand);

export default brandRouter;
