import { instance } from "../../utils/Axios";
import { GetQueryParams } from "../../utils/GetQueryParams";

// service to get all products
const getProductsService = async () => {
  const params = GetQueryParams();

  const searchQuery = params.get("q") || "";
  const page = params.get("page");

  const res = await instance.get(`/product?q=${searchQuery}&page=${page}`);
  return res;
};

// service to get all product by category provided
const getProductByCategoryService = async (payload) => {
  console.log(payload);
  const myUrl = new URL(window.location.href);

  const params = new URLSearchParams(myUrl.search);

  const brand = params?.get("brand") || null;
  const sort = params?.get("sort");
  const minPrice = params?.get("minPrice") || null;
  const maxPrice = params?.get("maxPrice") || null;

  const res = await instance.get(
    `/product/category/${payload}?brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`
  );
  return res;
};

const searchProductsService = async (query) => {
  const res = await instance.get(`/product/search/?q=${query}`);

  return res;
};

// service to add new product
const addProductService = async (formData) => {
  const res = await instance.post("/product", formData);
  return res;
};

// service to add new product
const removeProductService = async (id) => {
  const res = await instance.delete("/product/" + id);
  return res;
};

// service to update  product
const updateProductService = async (id, update) => {
  const res = await instance.put("/product/" + id, update);
  return res;
};

// service to update  product
const getProductService = async (id) => {
  const res = await instance.get(`/product/${id}`);
  return res;
};

// service to delete single image of product
const deleteProductImageService = async (payload) => {
  const res = await instance.post("/product/image", payload);
  return res;
};

const productServices = {
  getProductsService,
  addProductService,
  removeProductService,
  updateProductService,
  getProductService,
  searchProductsService,
  deleteProductImageService,
  getProductByCategoryService,
};

export default productServices;
