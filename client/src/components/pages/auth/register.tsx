"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/authService";
import { RegisterCredentials, User, APIError } from "@/types/auth";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/solid";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();

  const mutation = useMutation<User, APIError, RegisterCredentials>({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => {
      router.push("/auth/login");
    },
    onError: (error) => {
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

  const validateName = (name: string): boolean => {
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    return nameRegex.test(name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setError(null);

    if (!validateName(name)) {
      setNameError(
        "Name must be between 2 and 30 characters and contain only letters and spaces"
      );
      return;
    }

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

    mutation.mutate({ name, email, password });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-96 bg-white shadow-xl">
        <div className="card-body">
          <div className="flex justify-center mb-4">
            <div className="avatar">
              <div className="w-24  rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <UserCircleIcon className="text-black " />
              </div>
            </div>
          </div>
          <h2 className="text-center text-2xl font-semibold mb-4">Sign up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                className={`input input-bordered w-full ${
                  nameError ? "input-error" : ""
                }`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
            </div>
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
              {mutation.isPending ? "Signing up..." : "Sign Up"}
            </button>
            <div className="flex justify-between mt-4">
              <Link href="/auth/login" className="link link-primary">
                Already have an account? Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
