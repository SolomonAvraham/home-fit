import { LoginCredentials, RegisterCredentials, User } from "../types/auth";
import axiosInstance from "../utils/axiosInstance";

export const login = async (credentials: LoginCredentials) => {
  const response = await axiosInstance.post(`/api/users/login`, credentials);
  return response;
};
 

export const register = async (
  credentials: RegisterCredentials
): Promise<User> => {
  const response = await axiosInstance.post(`/api/users/register`, credentials);
  return response.data;
};
