import { getAuthStatus } from "@/lib/auth";
import ClientHeader from "./clientHeader";

export default async function Header() {
  const isLoggedIn = await getAuthStatus();

  return <ClientHeader initialIsLoggedIn={isLoggedIn} />;
}
