import ClientHeader from "./clientHeader";
import axiosInstance from "@/utils/axiosInstance";

async function verifyToken() {
  const response = await axiosInstance.get(`/api/verifyToken`);
  return response.data;
}

export default async function Header() {
  const isLoggedIn = await verifyToken();

  return <ClientHeader initialIsLoggedIn={isLoggedIn} />;
}
