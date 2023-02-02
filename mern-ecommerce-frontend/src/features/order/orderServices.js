import { authInstance, instance } from "../../utils/Axios";
import { setToken } from "../../utils/SetToken";
import axios from "axios";

// const token = setToken();

// service to get all Orders
export const getAllOrders = async (token) => {
  const res = await instance.get("/order", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

// service to create new order
export const createOrderService = async (token, orderData) => {
  const res = await instance.post("/order", orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

// service to update new order with payment details
export const updateOrderDeliveryStatusService = async (
  token,
  orderId,
  isDelivered
) => {
  const res = await instance.put(
    `/order/${orderId}/deliverystatus`,
    { isDelivered },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(res);
  return res;
};

// service to get all orders of user
export const getUserOrders = async ({ userId, token }) => {
  const res = await instance.get(`/order/orders/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

export const getOrderDetail = async ({ orderId, token }) => {
  const res = await instance.get(`/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteOrderService = async ({ orderId, token }) => {
  const res = await instance.delete(`/order/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const order_services = {
  getUserOrders,
  getOrderDetail,
  getAllOrders,
  deleteOrderService,
  createOrderService,
  updateOrderDeliveryStatusService,
};
export default order_services;
