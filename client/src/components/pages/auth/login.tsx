"use client";

import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { UseLoginMutation } from "@/lib/queries";
import Logo from "@/components/ui/logo/logo";
import Image from "next/image";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const loginMutation = UseLoginMutation(setError);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Za-z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

    await loginMutation.mutateAsync({ email, password });
  };

  return (
    <div className="card rounded-xl max-w-sm shadow-xl md:grid md:grid-cols-2 md:max-w-3xl md:gap-2 md:place-items-center">
      <div className="card-body">
        <div className="flex justify-center mb-4">
          <div className="avatar">
            <div className="w-24  rounded-full ring ring-black ring-offset-base-100 ring-offset-1">
              <FaUserCircle className="text-8xl text-black" />
            </div>
          </div>
        </div>
        <h2 className="text-center text-4xl font-semibold font-Acme mb-4 tracking-wide">
          Log-in
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className={`input input-bordered w-full  text-center ${
                emailError && "input-error"
              }`}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <p className="text-red-500 text-sm text-center py-1 font-semibold">
                {emailError}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className={`input input-bordered w-full text-center ${
                passwordError && "input-error"
              }`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className="text-red-500 text-sm text-center py-1 font-semibold">
                {passwordError}
              </p>
            )}
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center py-1 font-semibold">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="btn btn-neutral bg-gray-600 text-white text-xl font-extralight tracking-wide w-full"
          >
            {loginMutation.isPending ? "Login in..." : "Log In"}
          </button>
          <div className="flex justify-center items-center mt-4">
            <Link href="/auth/register" className="link link-primary">
              {"Don't have an account? Sign Up"}
            </Link>
          </div>
        </form>
      </div>
      <div className=" flex-col items-center justify-center p-5 hidden md:flex relative">
        <Logo h={80} w={80} />
        <Image
          src={"/bg/bg-2.jpg"}
          alt="bg-picture"
          width={500}
          height={500}
          priority={false}
          className="rounded-lg h-3/4 object-cover object-bottom"
        />
      </div>
    </div>
  );
};

export default LoginPage;
