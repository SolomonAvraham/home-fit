import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LOCAL_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
