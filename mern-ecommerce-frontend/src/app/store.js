import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import uiReducer from "../features/ui/uiSlice";
import cartReducer from "../features/cart/cartSlice";
import paymentReducer from "../features/payment/paymentSlice";
import orderReducer from "../features/order/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    products: productReducer,
    ui: uiReducer,
    cart: cartReducer,
    payment: paymentReducer,
    order: orderReducer,
  },
});
