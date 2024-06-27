"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../services/authService";

const LogoutButton: React.FC = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };

  return (
    <button onClick={handleLogout} disabled={mutation.isPending}>
      {mutation.isPending ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
