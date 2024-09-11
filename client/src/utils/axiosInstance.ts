import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://13.60.96.4:9001"
    : process.env.NEXT_PUBLIC_LOCAL_SERVER_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axiosInstance;
