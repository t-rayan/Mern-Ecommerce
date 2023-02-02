import { instance } from "../../utils/Axios";

// service to get all products
const getProductsService = async (filters) => {
  // const { brandFilter, categoryFilter, filterPrice } = filters;
  // let brand = brandFilter;
  // let category = categoryFilter;
  // let price = filterPrice;
  // const res = await instance.get(
  //   `/product?category=${category}&brand=${brand}&price=${price}`
  // );

  const { brand, category, price } = filters;

  console.log(filters);

  const res = await instance.get(
    `/product?category=${category}&brand=${brand}&minPrice=${price.minPrice}&maxPrice=${price.maxPrice}`
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
};

export default productServices;
