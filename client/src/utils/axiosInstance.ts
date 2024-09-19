import axios from "axios";
import { parseCookies } from "nookies"; // Make sure to install nookies: npm install nookies

export const baseURL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_SERVER_URL
    : process.env.NEXT_PUBLIC_LOCAL_SERVER_URL;

const isServer = typeof window === "undefined";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
let a;
axiosInstance.interceptors.request.use(
  (config) => {
    if (isServer) {
      const cookies = parseCookies();
      const token = cookies.token; // Assuming the HTTP-only cookie is named 'token'
      console.log("🚀 ~ token:", token)
      a= token
      if (token) {
        config.headers["Cookie"] = `token=${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
console.log("a",a)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("🚀 ~ error:", error);
    if (!isServer && error.response && error.response.status === 401) {
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
