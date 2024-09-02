import RegisterPage from "@/components/pages/auth/register";

export default function Register() {
  return (
    <div className="container mx-auto min-h-screen py-10 grid place-items-center">
      <div className="py-5 grid place-items-center ">
        <RegisterPage />;
      </div>
    </div>
  );
}
