import { cookies } from "next/headers";
import ClientHeader from "./clientHeader";

async function verifyToken() {
  const cookieStore = cookies();
  const authStatus = cookieStore.get("auth_status")?.value;

  return authStatus === "authenticated";
}

export default async function Header() {
  const isLoggedIn = await verifyToken();

  return <ClientHeader initialIsLoggedIn={isLoggedIn} />;
}
