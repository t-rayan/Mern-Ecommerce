import { instance } from "../../utils/Axios";

// get all brands service
const getAllBrandsService = async () => {
  const res = await instance.get("/brand");
  return res;
};

// add new brand service
const addBrandService = async (brandInfo, token) => {
  const res = await instance.post("/brand", brandInfo, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

const brandServices = {
  getAllBrandsService,
  addBrandService,
};
export default brandServices;
