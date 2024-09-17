import ClientHeader from "./clientHeader";
import { cookies } from "next/headers";

export default async function Header() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  const isLoggedIn = token ? true : false;

  return <ClientHeader initialIsLoggedIn={isLoggedIn} />;
}
