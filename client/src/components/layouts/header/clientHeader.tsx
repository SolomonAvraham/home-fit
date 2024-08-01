"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useMediaQuery } from "react-responsive";
import { useMutationState } from "@tanstack/react-query";
import { FaExpand, FaBars } from "react-icons/fa";
import Loading from "@/app/loading";
import { ClientHeaderProps } from "@/types/header";
import MenuItem, { signedMenuItems, unsignedMenuItems } from "./menuItem";
import Logo from "@/components/ui/logo/logo";
import { UseLogoutMutation } from "@/lib/queries";
import useUserStore from "@/store/useUserStore";

const ClientHeader: React.FC<ClientHeaderProps> = ({ initialIsLoggedIn }) => {
  const logoutMutation = UseLogoutMutation();

  const { setUser, user } = useUserStore();
  console.log("🚀 ~ user:", user)

  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isClient, setIsClient] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  const isUserLoggedIn = useMutationState({
    filters: { mutationKey: ["login"] },
    select: (mutation) => mutation.state.data,
  });

  useEffect(() => {
    if (isUserLoggedIn[0]) {
      const checkAuthStatus = async () => {
        try {
          const response = await axios.get("/api/auth/status", {
            withCredentials: true,
          });

          setIsLoggedIn(!!response.data);
        } catch (error: any) {
          console.error(error.message);
          setUser(null);
          setIsLoggedIn(false);
        }
      };
      checkAuthStatus();
    }
  }, [isUserLoggedIn[0]]);

  useEffect(() => {
    setIsClient(true);

    const userId = localStorage.getItem("userId") || null;
    const userName = localStorage.getItem("userName") || null;

    if (userId && userName) {
      setUser({ ...user, id: userId, name: userName });
    }

    if (!isLoggedIn) {
      setUser(null);
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      logoutMutation.mutate();
    }
  }, []);

  if (!isClient) {
    return <Loading />;
  }

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setIsLoggedIn(false);
    setUser(null);
  };

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleDropdownToggle = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const menuItems = isLoggedIn ? signedMenuItems : unsignedMenuItems;

  const renderMenuItems = (
    <ul
      className={
        isMobile
          ? "bg-slate-800 grid place-items-center gap-10 w-screen"
          : "menu menu-horizontal p-0 gap-2"
      }
    >
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          item={item}
          index={index}
          isMobile={isMobile}
          drawerOpen={drawerOpen}
          dropdownOpen={dropdownOpen}
          handleDropdownToggle={handleDropdownToggle}
          handleDrawerToggle={handleDrawerToggle}
          setDropdownOpen={setDropdownOpen}
        />
      ))}
      {isLoggedIn && (
        <li
          className={`${isMobile ? "w-full mx-auto" : ""} ${
            drawerOpen
              ? `menu-item menu-item-delay-${menuItems.length + 1} `
              : ""
          }`}
        >
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className={` flex flex-col font-semibold text-white justify-center items-center   ${
              isMobile
                ? "text-center font-semibold text-4xl bg-slate-700 bg-opacity-20 w-full p-1 tracking-[0.2rem] "
                : ""
            } `}
          >
            <FaExpand className="h-5 w-5" />
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </li>
      )}
    </ul>
  );

  return (
    <header>
      <div className="navbar bg-slate-800 tracking-[0.2rem] h-[5rem] z-10 relative">
        <div className="flex-1">
          <Logo w={70} h={70} />
        </div>
        <div className="flex-none">
          {isMobile ? (
            <div>
              <button
                className="text-5xl text-white"
                aria-label="menu"
                onClick={handleDrawerToggle}
              >
                <FaBars className="h-12 w-12" />
              </button>
              {drawerOpen && (
                <div
                  className={`fixed flex  flex-col items-center gap-10  inset-0 bg-slate-800 z-50 transition-opacity duration-300  ${
                    drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <button
                    className={`text-white menu-button ${
                      drawerOpen ? "menu-button-open" : "menu-button-closed"
                    }`}
                    aria-label="menu"
                    onClick={handleDrawerToggle}
                  >
                    <FaBars className="h-20 w-20" />
                  </button>
                  {renderMenuItems}
                  <Logo w={120} h={120} />
                </div>
              )}
            </div>
          ) : (
            renderMenuItems
          )}
        </div>
      </div>
    </header>
  );
};

export default ClientHeader;
