import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authServices";

import { toast } from "react-toastify";

// Get user from localStorage
const user = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// user registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authServices.registerService(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// userlogin
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    const { creds, navigate } = userData;
    try {
      const { status, data } = await authServices.loginService(creds);

      if (status === 200 && data.token && data.isAdmin) {
        navigate("/admin");
      } else if (status === 200 && data.token && !data.isAdmin) {
        navigate("/");
      }
      return data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get current user
export const getUser = createAsyncThunk("auth/user", async (_, thunkAPI) => {
  const { token } = thunkAPI.getState().auth.userInfo;
  try {
    const { status, data } = await authServices.currentUserService(token);
    if (status === 200) {
      return data;
    }
  } catch (error) {
    const { status } = error.response;
    const message =
      (error.response && error.response.data && error.response.data.errMsg) ||
      error.message ||
      error.toString();

    if (status === 401) {
      authServices.loginService();
    }

    return thunkAPI.rejectWithValue({ status, message });
  }
});

// get current user
export const updateUserAddress = createAsyncThunk(
  "auth/update_user_address",
  async (payload, thunkAPI) => {
    const { token } = thunkAPI.getState().auth.userInfo;
    const { addressDetails, onClose } = payload;
    try {
      const { status, data } = await authServices.updateUserAddressService(
        token,
        addressDetails
      );
      const { msg } = data;
      if (status === 200) {
        msg === "Address added" && onClose();
        return data;
      }
    } catch (error) {
      const { status } = error.response;
      const message =
        (error.response && error.response.data && error.response.data.errMsg) ||
        error.message ||
        error.toString();

      if (status === 401) {
        authServices.loginService();
      }

      return thunkAPI.rejectWithValue({ status, message });
    }
  }
);

// user logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authServices.logoutService();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.status = "";
      state.userInfo = null;
      state.currentUser = null;
    },
  },
  extraReducers: {
    // register reducers
    [registerUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.msg;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // login reducers
    [loginUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userInfo = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // get current user reducers
    [getUser.pending]: (state, action) => {
      state.isLoading = true;
      state.status = "";
    },
    [getUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.currentUser = action.payload;
    },
    [getUser.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.userInfo = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.status = status;
      state.message = message;
    },

    //add address to current user
    [updateUserAddress.pending]: (state, action) => {
      state.isLoading = true;
      state.status = "";
    },
    [updateUserAddress.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.currentUser = action.payload.data;
    },
    [updateUserAddress.rejected]: (state, action) => {
      const { message, status } = action.payload;
      state.userInfo = null;
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.status = status;
      state.message = message;
    },

    // logout reducers
    [logoutUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userInfo = null;
    },
    [logoutUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
