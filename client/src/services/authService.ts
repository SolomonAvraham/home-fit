import axios from "axios";
import { LoginCredentials, RegisterCredentials, User } from "../types/auth";
import axiosInstance, { baseURL } from "../utils/axiosInstance";

export const login = async (credentials: LoginCredentials) => {
  const response = await axios.post(`${baseURL}/api/users/login`, credentials);
  return response;
};
 

export const register = async (
  credentials: RegisterCredentials
): Promise<User> => {
  const response = await axiosInstance.post(`/api/users/register`, credentials);
  return response.data;
};
