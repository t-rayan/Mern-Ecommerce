import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingAddress: null,
  shippingCharge: 0,
  shippingType: null,
  paymentMode: null,
  total: 0,
};

export const categorySlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.cartItems = [];
      state.shippingAddress = null;
      state.shippingCharge = 0;
      state.shippingType = null;
      state.paymentMode = null;
      state.total = 0;
    },
    resetShippingAddress: (state) => {
      state.shippingAddress = null;
    },
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].qty += 1;
        toast.info("Product Qty Increased", {
          position: "bottom-left",
        });
      } else {
        const tempProduct = { ...action.payload, qty: 1 };
        const finalProduct = {
          ...tempProduct,
          total: tempProduct.qty * tempProduct.price,
        };
        state.cartItems.push(finalProduct);
        toast.success(`${action.payload.name} added to the cart.`, {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;

          toast.error("Product removed from cart", {
            position: "bottom-left",
          });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    incQty: (state, action) => {
      let itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].qty += 1;
        state.cartItems[itemIndex].total =
          state.cartItems[itemIndex].price * state.cartItems[itemIndex].qty;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decQty: (state, action) => {
      let itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].qty > 1) {
        state.cartItems[itemIndex].qty -= 1;
        state.cartItems[itemIndex].total =
          state.cartItems[itemIndex].price * state.cartItems[itemIndex].qty;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeAll: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },

    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    setShippingType: (state, action) => {
      state.shippingType = action.payload.name;
      state.shippingCharge = action.payload.value;
    },
    setShippingCharge: (state, action) => {
      state.shippingCharge = action.payload.shippingFee;
      state.shippingType = action.payload.deliveryType;
    },
    setPaymentMode: (state, action) => {
      state.paymentMode = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    extraReducers: {},
  },
});
export const {
  resetCart,
  addToCart,
  setShippingAddress,
  removeFromCart,
  incQty,
  decQty,
  removeAll,
  resetShippingAddress,
  setPaymentMode,
  setTotal,
  setShippingCharge,
  setShippingType,
} = categorySlice.actions;
export default categorySlice.reducer;
