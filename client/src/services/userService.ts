import { GetUser } from "../types/auth";
import axiosInstance from "../utils/axiosInstance";

export const getUserById = async (
  id: string,
  token: string | undefined
): Promise<GetUser> => {
  const config = {
    headers: { Authorization: token ? `Bearer ${token}` : "" },
  };

  const response = await axiosInstance.get<GetUser>(
    `/api/users/getUserById/${id}`,
    config
  );
  return response.data;
};

export const updateUser = async (data: GetUser): Promise<GetUser> => {
  const response = await axiosInstance.put<GetUser>(
    `/api/users/updateUser/${data.id}`,
    data
  );

  return response.data;
};

export const deleteUser = async (id: string): Promise<number> => {
  const response = await axiosInstance.delete<number>(
    `/api/users/deleteUser/${id}`
  );

  return response.data;
};
