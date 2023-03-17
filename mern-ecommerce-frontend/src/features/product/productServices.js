import { instance } from "../../utils/Axios";

// service to get all products
const getProductsService = async () => {
  const myUrl = new URL(window.location.href);

  const params = new URLSearchParams(myUrl.search);

  const searchQuery = params.get("q") || "";

  const res = await instance.get(`/product?q=${searchQuery}`);
  return res;
};

// service to get all product by category provided
const getProductByCategoryService = async (payload) => {
  const myUrl = new URL(window.location.href);

  const params = new URLSearchParams(myUrl.search);

  const brand = params?.get("brand") || "all";
  const sort = params?.get("sort");
  const minPrice = params?.get("minPrice") || null;
  const maxPrice = params?.get("maxPrice") || null;

  const res = await instance.get(
    `/product/${payload}?brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`
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
  const res = await instance.get("/product/" + id);
  return res.data;
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
