import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://mern-ecommerce-api.onrender.com/api",
});

export { instance };
