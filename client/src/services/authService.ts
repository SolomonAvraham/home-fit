import {
  APIError,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await axiosInstance.post<User>(
      `/api/users/login`,
      credentials,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const apiError: APIError = {
        message: error.response.data.error || "An unknown error occurred",
        statusCode: error.response.status,
      };

      throw apiError;
    } else {
      throw new Error("Network error or server is unreachable");
    }
  }
};

export const logout = async (): Promise<void> => {
  try {
    await axiosInstance.get(`/api/users/logout`, { withCredentials: true });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const apiError: APIError = {
        message: error.response.data.error || "An unknown error occurred",
        statusCode: error.response.status,
      };
      console.log(error);

      throw apiError;
    } else {
      throw new Error("Network error or server is unreachable");
    }
  }
};

export const register = async (
  credentials: RegisterCredentials
): Promise<any> => {
  try {
    const response = await axiosInstance.post(
      `/api/users/register`,
      credentials
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const apiError: APIError = {
        message: error.response.data.error || "An unknown error occurred",
        statusCode: error.response.status,
      };
      throw apiError;
    } else {
      throw new Error("Network error or server is unreachable");
    }
  }
};
