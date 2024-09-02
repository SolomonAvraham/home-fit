"use client";

import React, { useState } from "react";
import { UseRegisterMutation } from "@/lib/queries";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import Logo from "@/components/ui/logo/logo";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const registerMutation = UseRegisterMutation(setError);
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

    registerMutation.mutate({ name, email, password });
  };

  return (
    <div className="card rounded-xl max-w-sm shadow-xl md:grid md:grid-cols-2 md:max-w-3xl md:gap-2">
      <div className="card-body">
        <div className="flex justify-center mb-4">
          <div className="avatar">
            <div className="w-24  rounded-full ring ring-black ring-offset-base-100 ring-offset-1">
              <FaUserCircle className="text-8xl text-black" />
            </div>
          </div>
        </div>
        <h2 className="text-center text-4xl font-semibold font-Acme mb-4 tracking-wide">
          Sign up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className={`input  input-bordered w-full text-center ${
                nameError && "input-error"
              }`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && (
              <p className="text-red-500 text-sm text-center py-1 font-semibold">
                {nameError}
              </p>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className={`input input-bordered w-full text-center ${
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
            {registerMutation.isPending ? "Signing up..." : "Sign Up"}
          </button>

          <div className="flex justify-center items-center mt-4">
            <Link href="/auth/login" className="link link-primary">
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </div>
      <div className=" flex-col items-center justify-center p-5 hidden md:flex relative">
        <Logo h={80} w={80} />
        <Image
          src={"/bg/bg-1.jpg"}
          alt="bg-picture"
          width={500}
          height={500}
          priority={false}
          className="rounded-lg h-full object-cover object-left"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
