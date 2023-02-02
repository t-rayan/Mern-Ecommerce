import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import payment_services from "./paymentServices";

const initialState = {
  stripe_url: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create payment
export const createPayment = createAsyncThunk(
  "payment/create",
  async (paymentInfo, thunkAPI) => {
    try {
      const { data, status } = await payment_services.createPaymentService(
        paymentInfo
      );
      if (status === 200) {
        window.location.href = data.url;
        return data.url;
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

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetCategory: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: {
    // add category reducers
    [createPayment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [createPayment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.url = action.payload;
      state.message = action.payload?.msg;
    },
    [createPayment.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});
// export const { } = paymentSlice.actions;
export default paymentSlice.reducer;
