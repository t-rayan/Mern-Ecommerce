import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import brandServices from "./brandService";

const initialState = {
  brands: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isEdit: false,
};

// get all categories
export const getAllBrands = createAsyncThunk(
  "brand/getAll",
  async (thunkAPI) => {
    try {
      const { status, data } = await brandServices.getAllBrandsService();
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

// add new category
export const addBrand = createAsyncThunk(
  "brand/add",
  async (payload, thunkAPI) => {
    const { brandInfo, onClose } = payload;
    const { token } = thunkAPI.getState().auth.userInfo;
    try {
      const { status, data } = await brandServices.addBrandService(
        brandInfo,
        token
      );

      console.log(data);
      if (status === 201) {
        onClose();
        toast.success("Brand added", {
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

// // remove category
// export const removeCategory = createAsyncThunk(
//   "category/remove",
//   async (id, thunkAPI) => {
//     try {
//       const { status, data } = await categoryServices.removeCategoryService(id);
//       if (status === 200) {
//         toast.error("Product deleted", {
//           position: "bottom-left",
//         });
//         return data;
//       }
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.msg) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
// // update category
// export const updateCategory = createAsyncThunk(
//   "category/update",
//   async (update, thunkAPI) => {
//     const { navigate, id, values } = update;
//     try {
//       const { status, data } = await categoryServices.updateCategoryService(
//         id,
//         values
//       );
//       if (status === 201) {
//         navigate(-1);
//         toast.info("Product updated", {
//           position: "bottom-left",
//         });
//         return data;
//       }
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.msg) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // get category
// export const getCategory = createAsyncThunk(
//   "category/get",
//   async (id, thunkAPI) => {
//     try {
//       const { category } = await categoryServices.getCategoryService(id);
//       return category;
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.msg) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    resetBrandMsg: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
    // filterCategory: (state, action) => {
    //   state.isError = false;
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.message = "";
    //   state.category = null;
    //   state.isEdit = false;
    //   state.categories = state.categories.filter(
    //     (cat) =>
    //       cat.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
    //   );
    // },
  },
  extraReducers: {
    // get categories reducers
    [getAllBrands.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllBrands.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.brands = action.payload?.brands;
    },
    [getAllBrands.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // add category reducers
    [addBrand.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addBrand.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.brands = [action.payload?.newBrand, ...state.brands];
      state.message = action.payload?.msg;
    },
    [addBrand.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // // remove category reducers
    // [removeCategory.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    // [removeCategory.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.categories = state.categories.filter(
    //     (category) => category._id !== action.payload?.deleted?._id
    //   );
    //   state.message = action.payload?.msg;
    // },
    // [removeCategory.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // },
    // // update category reducers
    // [updateCategory.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    // [updateCategory.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.message = action.payload?.msg;
    // },
    // [updateCategory.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // },
    // // get category reducers
    // [getCategory.pending]: (state, action) => {
    //   state.isLoading = true;
    // },
    // [getCategory.fulfilled]: (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.category = action.payload;
    // },
    // [getCategory.rejected]: (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = false;
    //   state.isEdit = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // },
  },
});
export const { resetBrandMsg } = brandSlice.actions;
export default brandSlice.reducer;
