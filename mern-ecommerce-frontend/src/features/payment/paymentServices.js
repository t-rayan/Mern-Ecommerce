import { authInstance, instance } from "../../utils/Axios";
import { setToken } from "../../utils/SetToken";

// service to get all categories
export const createPaymentService = async ({ paymentInfo }) => {
  const { cartItems, userId } = paymentInfo;
  const res = await instance.post("/order/payment", {
    cartItems,
    userId,
  });
  return res;
};

export const getPaypalClientIDService = async (token) => {
  const res = await instance.get("/config/paypal", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const payment_services = {
  createPaymentService,
  getPaypalClientIDService,
};
export default payment_services;
