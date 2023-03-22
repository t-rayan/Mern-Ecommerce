import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryServices from "./categoryServices";

import { toast } from "react-toastify";

const initialState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isEdit: false,
};

// get all categories
export const getAllCategories = createAsyncThunk(
  "category/getAll",
  async (thunkAPI) => {
    try {
      return await categoryServices.getCategoriesService();
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
export const addCategory = createAsyncThunk(
  "category/add",
  async (categoryInfo, thunkAPI) => {
    const { values, navigate } = categoryInfo;
    try {
      const { status, data } = await categoryServices.addCategoryService(
        values
      );

      if (status === 201) {
        navigate(-1);
        toast.success("Category added", {
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

// remove category
export const removeCategory = createAsyncThunk(
  "category/remove",
  async (id, thunkAPI) => {
    try {
      const { status, data } = await categoryServices.removeCategoryService(id);
      if (status === 200) {
        toast.error("Category deleted", {
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
// update category
export const updateCategory = createAsyncThunk(
  "category/update",
  async (update, thunkAPI) => {
    const { navigate, id, values } = update;
    try {
      const { status, data } = await categoryServices.updateCategoryService(
        id,
        values
      );
      if (status === 201) {
        navigate(-1);
        toast.info("Category updated", {
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

// get category
export const getCategory = createAsyncThunk(
  "category/get",
  async (id, thunkAPI) => {
    try {
      const { category } = await categoryServices.getCategoryService(id);
      return category;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategory: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.category = null;
      state.isEdit = false;
    },
    filterCategory: (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.category = null;
      state.isEdit = false;
      state.categories = state.categories.filter(
        (cat) =>
          cat.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
      );
    },
  },
  extraReducers: {
    // get categories reducers
    [getAllCategories.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = action.payload?.categories;
      state.pagination = action.payload?.pagination;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // add category reducers
    [addCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = [action.payload?.category, ...state.categories];
      state.message = action.payload?.msg;
    },
    [addCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // remove category reducers
    [removeCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload?.deleted?._id
      );
      state.message = action.payload?.msg;
    },
    [removeCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
    // update category reducers
    [updateCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload?.msg;
    },
    [updateCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
    // get category reducers
    [getCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.category = action.payload;
    },
    [getCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isEdit = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});
export const { resetCategory, filterCategory } = categorySlice.actions;
export default categorySlice.reducer;
