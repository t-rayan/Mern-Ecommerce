import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productServices from "./productServices";
import { toast } from "react-toastify";

// get all categories

// get all categories
export const getAllProductsByCategoryAction = createAsyncThunk(
  "product/getAllByCategory",
  async (payload, thunkAPI) => {
    try {
      const { data, status } =
        await productServices.getProductByCategoryService(payload);

      if (status === 200) {
        return data;
      }

      // return await productServices.getProductsService();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (payload, thunkAPI) => {
    try {
      const { data, status } = await productServices.getProductsService();

      if (status === 200) {
        return data;
      }
      // return await productServices.getProductsService();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// search for products
export const searchProducts = createAsyncThunk(
  "product/search",
  async (query, thunkAPI) => {
    try {
      const { status, data } = await productServices.searchProductsService(
        query
      );
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

// add new product
export const addProduct = createAsyncThunk(
  "product/add",
  async (payload, thunkAPI) => {
    const { formData, navigate } = payload;
    try {
      const { status, data } = await productServices.addProductService(
        formData
      );
      if (status === 201) {
        navigate(-1);
        toast.success("Product added", {
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
export const removeProduct = createAsyncThunk(
  "product/remove",
  async (id, thunkAPI) => {
    try {
      const { status, data } = await productServices.removeProductService(id);
      if (status === 200) {
        toast.error("Product deleted", {
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
export const updateProduct = createAsyncThunk(
  "product/update",
  async (update, thunkAPI) => {
    const { id, formData, navigate } = update;
    try {
      const { status, data } = await productServices.updateProductService(
        id,
        formData
      );

      if (status === 201) {
        navigate(-1);
        toast.info("Product updated", {
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
export const getProduct = createAsyncThunk(
  "category/get",
  async (id, thunkAPI) => {
    try {
      return await productServices.getProductService(id);
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
export const removeAndUpdateProductImage = createAsyncThunk(
  "product/remove/img",
  async (data, thunkAPI) => {
    try {
      const res = await productServices.deleteProductImageService(data);
      if (res.status === 200) {
        return res.data;
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

export const sortProducts = createAsyncThunk(
  "category/sort",
  async (data, thunkAPI) => {
    try {
      const { filterType, products } = data;
      let sortedProducts;
      if (filterType && products?.length > 0) {
        if (filterType === "lowtohigh") {
          sortedProducts = [...products].sort((a, b) => a.price - b.price);
        } else if (filterType === "hightolow") {
          sortedProducts = [...products].sort((a, b) => b.price - a.price);
        }
      }
      return sortedProducts;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    product: null,
    filterGroup: {},
  },
  reducers: {
    reset: (state) => {
      state.products = [];
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.product = null;
      state.isEdit = false;
    },

    setFilterGroup: (state, action) => {
      let data = action.payload;

      state.filterGroup = { ...data, ...state.filterGroup };
    },
    resetFilter: (state) => {
      state.filterGroup = {
        // categoryFilter: "",
        // brandFilter: "",
        // priceFilter: "",
        // searchFilter: "",
      };
    },

    setSearchFilters: (state, action) => {
      state.filterGroup = {
        ...state.filterGroup,
        categoryFilter: "",
        searchFilter: action.payload,
      };
    },
    setPriceFilters: (state, action) => {
      const { minPrice, maxPrice } = action.payload?.priceFilter;
      state.filterGroup = {
        ...state.filterGroup,
        minPrice: minPrice,
        maxPrice: maxPrice,
      };
    },
    setCategoryFilters: (state, action) => {
      state.filterGroup = {
        ...state.filterGroup,
        brandFilter: "",
        priceFilter: "",
        categoryFilter: action.payload,
      };
    },
    setBrandFilters: (state, action) => {
      state.filterGroup = {
        ...state.filterGroup,
        brand: action.payload,
      };
    },
    setSortFilters: (state, action) => {
      state.filterGroup = {
        ...state.filterGroup,
        sort: action.payload,
      };
    },

    productSearch: (state, action) => {
      // const regex = /[A-Z]/g;

      // state.products = state.products.filter((product) =>
      //   product.name.includes(action.payload)
      // );
      state.filteredProducts = state.products.filter(
        (product) =>
          product.name.toLowerCase().includes(action.payload) ||
          product.category?.name.toLowerCase().includes(action.payload)
      );
    },
  },
  extraReducers: {
    // get products reducers
    [getAllProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload?.products;
    },
    [getAllProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // get products reducers
    [getAllProductsByCategoryAction.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllProductsByCategoryAction.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload?.products;
    },
    [getAllProductsByCategoryAction.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // search products reducers
    [searchProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [searchProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload?.products;
    },
    [searchProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // add product reducers
    [addProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = [action.payload?.newProduct, ...state.products];
      state.message = action.payload?.msg;
    },
    [addProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // remove product reducers
    [removeProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.isDel = true;
    },
    [removeProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDel = false;
      state.products = state.products.filter(
        (product) => product._id !== action.payload?.deleted?._id
      );

      state.message = action.payload?.msg;
    },
    [removeProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
    // update product reducers
    [updateProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload?.msg;
    },
    [updateProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
    // get product reducers
    [getProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.isEdit = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isEdit = false;
      state.isSuccess = true;
      state.product = action.payload?.product;
    },
    [getProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isEdit = false;
      state.isError = true;
      state.message = action.payload;
    },
    // delete single image of porduct
    [removeAndUpdateProductImage.pending]: (state, action) => {
      state.isLoading = true;
      state.isDel = true;
    },
    [removeAndUpdateProductImage.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isEdit = false;
      state.isSuccess = true;
      state.product = action.payload?.result;
      state.message = action.payload?.msg;
      state.isDel = false;
    },
    [removeAndUpdateProductImage.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isEdit = false;
      state.isError = true;
      state.message = action.payload;
    },
    // get products reducers
    [sortProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [sortProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload;
    },
    [sortProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});
export const {
  reset,
  setPriceFilters,
  setBrandFilters,
  setCategoryFilters,
  productSearch,
  resetFilter,
  setFilterGroup,
  setSearchFilters,
  setSortFilters,
} = productSlice.actions;
export default productSlice.reducer;
