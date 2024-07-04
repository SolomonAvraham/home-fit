"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Logo from "../ui/Logo";
import { useMutation, useMutationState } from "@tanstack/react-query";
import {
  HomeIcon,
  BoltIcon,
  UserGroupIcon,
  ArrowRightCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { logout } from "@/services/authService";

interface ClientHeaderProps {
  initialIsLoggedIn: boolean;
}

const ClientHeader: React.FC<ClientHeaderProps> = ({ initialIsLoggedIn }) => {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const loginMutation = useMutationState({
    filters: { mutationKey: ["login"] },
    select: (mutation) => mutation.state.data,
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get("/api/auth/status", {
          withCredentials: true,
        });

        if (response.data === true) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error: any) {
        console.error(error.message);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, [loginMutation]);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const unsignedMenuItems = [
    { text: "Home", path: "/", icon: <HomeIcon className="h-5 w-5" /> },
    {
      text: "Workouts",
      path: "/workouts",
      icon: <BoltIcon className="h-5 w-5" />,
    },
    {
      text: "Community",
      path: "/community",
      icon: <UserGroupIcon className="h-5 w-5" />,
    },
    {
      text: "Login",
      path: "/auth/login",
      icon: <ArrowRightCircleIcon className="h-5 w-5" />,
    },
  ];

  const signedMenuItems = [
    { text: "Home", path: "/", icon: <HomeIcon className="h-5 w-5" /> },
    {
      text: "Workouts",
      path: "/workouts",
      icon: <BoltIcon className="h-5 w-5" />,
    },
    {
      text: "Progress",
      path: "/progress",
      icon: <UserGroupIcon className="h-5 w-5" />,
    },
    {
      text: "Community",
      path: "/community",
      icon: <UserGroupIcon className="h-5 w-5" />,
    },
    {
      text: "Profile",
      path: "/profile",
      icon: <UserCircleIcon className="h-5 w-5" />,
    },
  ];

  const menuItems = isLoggedIn ? signedMenuItems : unsignedMenuItems;

  const renderMenuItems = (
    <ul
      className={
        isMobile
          ? "bg-slate-800 grid place-items-center gap-10 w-screen"
          : "menu menu-horizontal p-0"
      }
    >
      {menuItems.map((item, index) => (
        <li
          key={item.text}
          className={`${isMobile ? "w-full" : ""} ${
            drawerOpen ? `menu-item menu-item-delay-${index + 1}` : ""
          }`}
        >
          <Link
            href={item.path}
            className={`text-white flex flex-col items-center ${
              isMobile
                ? "text-center font-semibold text-4xl bg-slate-700 bg-opacity-20 w-full p-1 tracking-[0.2rem] "
                : ""
            }`}
            onClick={isMobile ? handleDrawerToggle : undefined}
          >
            {item.icon}
            <span className={isMobile ? "" : "ml-1 font-semibold"}>
              {item.text}
            </span>
          </Link>
        </li>
      ))}
      {isLoggedIn && (
        <li
          className={`${isMobile ? "w-full" : ""} ${
            drawerOpen
              ? `menu-item menu-item-delay-${menuItems.length + 1}`
              : ""
          }`}
        >
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="flex flex-col font-semibold text-white"
          >
            <ArrowRightCircleIcon className="h-5 w-5" />
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>{" "}
        </li>
      )}
    </ul>
  );

  return (
    <header>
      <div className="navbar bg-slate-800 tracking-[0.2rem] h-[4.7rem] ">
        <div className="flex-1">
          <Link href="/">
            <Image src="/logo/logo.png" alt="logo" width={70} height={70} />
          </Link>
        </div>
        <div className="flex-none">
          {isMobile ? (
            <>
              <button
                className="text-5xl text-white"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <Bars3Icon className="h-12 w-12" />
              </button>
              {drawerOpen && (
                <div
                  className={`fixed flex  flex-col items-center gap-10  inset-0 bg-slate-800 z-50 transition-opacity duration-300  ${
                    drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  {" "}
                  <button
                    className={`text-white menu-button ${
                      drawerOpen ? "menu-button-open" : "menu-button-closed"
                    }`}
                    aria-label="menu"
                    onClick={handleDrawerToggle}
                  >
                    <Bars3Icon className="h-20 w-20" />
                  </button>
                  {renderMenuItems}
                  <Logo w={120} h={120} />
                </div>
              )}
            </>
          ) : (
            renderMenuItems
          )}
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
