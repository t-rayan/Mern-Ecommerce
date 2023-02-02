import express from "express";
import {
  createNewOrder,
  getEveryOrders,
  getOrderDetail,
  getOrdersByUser,
  removeOrder,
  updateOrderDeliveryStatus,
} from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { checkisAdmin } from "../middlewares/isAdmin.middleware.js";

const orderRouter = express.Router();
orderRouter.get("/", verifyToken, checkisAdmin, getEveryOrders);
orderRouter.post("/", verifyToken, createNewOrder);

orderRouter.put("/:id/deliverystatus", verifyToken, updateOrderDeliveryStatus);

orderRouter.get("/orders/:userId", verifyToken, getOrdersByUser);

orderRouter.get("/:orderId", verifyToken, getOrderDetail);

orderRouter.delete("/:orderId", verifyToken, removeOrder);

// orderRouter.post("/payment", createPayment);
// orderRouter.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   webhookController
// );
export default orderRouter;
