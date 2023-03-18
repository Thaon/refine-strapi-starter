import axios from "axios";
import { API_URL } from "../constants";

// ----------------------------------------------------------------------

console.log(API_URL, process.env);

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
