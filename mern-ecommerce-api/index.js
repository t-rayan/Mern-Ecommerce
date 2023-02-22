import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/configs/db.config.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import userRouter from "./src/routes/user.route.js";
import categoryRouter from "./src/routes/category.route.js";
import productRouter from "./src/routes/product.route.js";

import cors from "cors";
import fileUpload from "express-fileupload";
import orderRouter from "./src/routes/order.route.js";
import { verifyToken } from "./src/middlewares/auth.middleware.js";
import brandRouter from "./src/routes/brand.route.js";

const port = process.env.PORT || 5000;

dotenv.config();
// database connection initialized
connectDB();

const app = express();
app.use(cors());

app.use(
  fileUpload({
    createParentPath: true,
    useTempFiles: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({
    limit: "50mb",
    parameterLimit: 1000000,
    extended: false,
  })
);
// app.use("/api", (req, res) => {
//   res.send("Welcome to Ecommerce API");
// });
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/brand", brandRouter);

app.use("/api/config/paypal", verifyToken, (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// app.use(errorHandler);

app.listen(5000, () => console.log(`serever running on port ${port}`));
