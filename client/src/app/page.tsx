import LogoutButton from "@/components/ui/LogoutButton";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black ">
      <h1>HOME PAGE</h1>{" "}
      <div className=" flex justify-between">
      <Link href="/auth/login">Login</Link>
      <LogoutButton/></div>
    </main>
  );
}
