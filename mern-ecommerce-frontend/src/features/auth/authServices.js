import { setToken } from "../../utils/SetToken";
import { instance } from "../../utils/Axios";

// service to register a new user
const registerService = async (userData) => {
  const res = await instance.post(`/user/register`, userData);
  return res.data;
};

// service to login a registered user
const loginService = async (creds) => {
  const res = await instance.post(`/user/login`, creds);

  if (res.data) {
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  }

  return res;
};

// get current user
const currentUserService = async (token) => {
  const res = await instance.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

// update user address service
const updateUserAddressService = async (token, addressDetails) => {
  const res = await instance.put("/user", addressDetails, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
};

// service to get user by id
const getUserById = async (id) => {
  const res = await instance.get(`/user/${id}`, setToken());
  console.log(res);
};

// service to logout
const logoutService = () => {
  localStorage.removeItem("userInfo");
};

const authServices = {
  registerService,
  loginService,
  logoutService,
  currentUserService,
  getUserById,
  updateUserAddressService,
};

export default authServices;
