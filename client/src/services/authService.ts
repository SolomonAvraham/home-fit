import axios from "axios";
import {
  APIError,
  LoginCredentials,
  RegisterCredentials,
  User,
} from "../types/auth";

export const login = async (credentials: LoginCredentials): Promise<User> => {
  try {
    const response = await axios.post<User>(
      `${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/api/users/login`,
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
    await axios.get(
      `${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/api/users/logout`,
      { withCredentials: true }
    );
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
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/api/users/register`,
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
