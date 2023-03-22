import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { removeAll, resetCart } from "../cart/cartSlice";
import order_services from "./orderServices";

const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create new order
export const createNewOrderAction = createAsyncThunk(
  "order/create",
  async (payload, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.userInfo;
    const { orderDetails, paymentDetails, navigateHelper } = payload;
    let orderData = { ...orderDetails, paymentDetails };
    try {
      const { status, data } = await order_services.createOrderService(
        token,
        orderData
      );
      if (status === 201) {
        // const orderId = data?.newOrder?._id.toString();
        // // TODO:CALL UPDATE ORDER WITH PAYMENT DETAILS
        // thunkAPI.dispatch(updateOrderWithPaymentDetailsAction({ orderId }));
        thunkAPI.dispatch(resetCart());
        thunkAPI.dispatch(removeAll());
        navigateHelper(`/${data.newOrder._id}/checkout-success`);
        return data;
      }
    } catch (error) {
      const { status } = error.response;
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update order with payment status
export const updateOrderDeliveryStatusAction = createAsyncThunk(
  "order/update-delivery-status",
  async (payload, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.userInfo;
    const { orderId, isDelivered, modelCloseHandler } = payload;

    try {
      const { status, data } =
        await order_services.updateOrderDeliveryStatusService(
          token,
          orderId,
          isDelivered
        );
      if (status === 201) {
        modelCloseHandler();
        toast.success("Order delivered", {
          position: "bottom-left",
        });
        return data;
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// fetch all orders
export const fetchAllOrders = createAsyncThunk(
  "order/all",
  async (_, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.userInfo;

    try {
      const { status, data } = await order_services.getAllOrders(token);
      if (status === 200) {
        return data;
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get all orders for current user
export const fetchUserOrders = createAsyncThunk(
  "order/getAll",
  async (userId, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.userInfo;

    try {
      const { status, data } = await order_services.getUserOrders({
        userId,
        token,
      });
      if (status === 200) {
        return data.orders;
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      // if (status === 401) {
      //   localStorage.removeItem("userInfo");
      //   window.location.replace("http://localhost:3000/login");
      // }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// get single order
export const fetchSingleOrder = createAsyncThunk(
  "order/get",
  async (orderId, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.userInfo;

    try {
      const { data, status } = await order_services.getOrderDetail({
        orderId,
        token,
      });
      // if (res) {
      //   return res.url;
      // }

      if (status === 200) {
        return data;
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get single order
export const removeSingleOrder = createAsyncThunk(
  "order/remove",
  async (orderId, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.userInfo;

    try {
      const res = await order_services.deleteOrderService({ orderId, token });

      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.orders = [];
    },
    resetSingleOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers: {
    //create a new order reducer
    [createNewOrderAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createNewOrderAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.msg;
    },
    [createNewOrderAction.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    },

    [updateOrderDeliveryStatusAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateOrderDeliveryStatusAction.fulfilled]: (state, action) => {
      const { _id, isDelivered } = action.payload.updated;
      const order = state?.orders.findIndex((order) => order._id === _id);

      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.msg;
      if (state.orders) {
        state.orders[order].isDelivered = isDelivered;
      }
      if (state.order) {
        state.order.isDelivered = isDelivered;
      }
    },
    [updateOrderDeliveryStatusAction.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
    },

    // get all orders for ciurrent user
    [fetchAllOrders.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchAllOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.orders = action.payload?.orders;
      state.pagination = action.payload?.pagination;
    },
    [fetchAllOrders.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // get all orders for ciurrent user
    [fetchUserOrders.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchUserOrders.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.orders = action.payload;
    },
    [fetchUserOrders.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    //get single order details
    [fetchSingleOrder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [fetchSingleOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.order = action.payload.details;
    },
    [fetchSingleOrder.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    //remove single order
    [removeSingleOrder.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeSingleOrder.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload.deleted?._id
      );
      state.message = action.payload.msg;
    },
    [removeSingleOrder.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});
export const { resetSingleOrder, resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
