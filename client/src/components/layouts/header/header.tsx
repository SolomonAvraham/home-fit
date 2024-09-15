import { getAuthStatus } from "@/lib/auth";
import ClientHeader from "./clientHeader";
import axiosInstance from "@/utils/axiosInstance";

const verifyToken = async () => {
  const authStatus = await axiosInstance.get("/api");
  return authStatus.data;
};
export default async function Header() {
  const isLoggedIn = await verifyToken();

  return <ClientHeader initialIsLoggedIn={isLoggedIn} />;
}
