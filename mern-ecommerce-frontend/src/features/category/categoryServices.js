import { instance } from "../../utils/Axios";
import { GetQueryParams } from "../../utils/GetQueryParams";
// service to get all categories
const getCategoriesService = async () => {
  const params = GetQueryParams();
  const searchQuery = params.get("q");
  const page = params.get("page");

  const res = await instance.get(`/category?q=${searchQuery}&page=${page}`);

  return res.data;
};

// service to add new category
const addCategoryService = async (categoryInfo) => {
  const res = await instance.post("/category", categoryInfo);
  return res;
};

// service to add new category
const removeCategoryService = async (id) => {
  const res = await instance.delete("/category/" + id);
  return res;
};

// service to update  category
const updateCategoryService = async (id, update) => {
  const res = await instance.put("/category/" + id, update);
  return res;
};

// service to update  category
const getCategoryService = async (id) => {
  const res = await instance.get("/category/" + id);
  return res.data;
};

const categoryServices = {
  getCategoriesService,
  addCategoryService,
  removeCategoryService,
  updateCategoryService,
  getCategoryService,
};

export default categoryServices;
