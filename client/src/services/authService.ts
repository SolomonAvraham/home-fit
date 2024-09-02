import { LoginCredentials, RegisterCredentials, User } from "../types/auth";
import axiosInstance from "../utils/axiosInstance";

export const login = async (credentials: LoginCredentials): Promise<User> => {
  const response = await axiosInstance.post<User>(
    `/api/users/login`,
    credentials
  );

  return response.data;
};

export const logout = async (): Promise<void> => {
  const response = await axiosInstance.get(`/api/users/logout`);
  return response.data;
};

export const register = async (
  credentials: RegisterCredentials
): Promise<User> => {
  const response = await axiosInstance.post(`/api/users/register`, credentials);
  return response.data;
};
