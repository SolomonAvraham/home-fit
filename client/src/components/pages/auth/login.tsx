"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { APIError, LoginCredentials, User } from "@/types/auth";
import { login } from "@/services/authService";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();

  const mutation = useMutation<User, APIError, LoginCredentials>({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("userId", data.id);
      localStorage.setItem("userName", data.name);
      router.push("/");
    },
    onError: (error: APIError) => {
      setError(error.message);
    },
  });

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError(null);
    setPasswordError(null);
    setError(null);

    if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one letter"
      );
      return;
    }

    mutation.mutateAsync({ email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <div className="flex justify-center mb-4">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <UserCircleIcon className="text-black " />
              </div>
            </div>
          </div>
          <h2 className="text-center text-2xl font-semibold mb-4">Sign in</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className={`input input-bordered w-full ${
                  emailError ? "input-error" : ""
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-sm">{emailError}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className={`input input-bordered w-full ${
                  passwordError ? "input-error" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="btn btn-primary w-full">
              {mutation.isPending ? "Signing in..." : "Sign In"}
            </button>
            <div className="flex justify-between mt-4">
              <Link href="/auth/register" className="link link-primary">
                {"Don't have an account? Sign Up"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
