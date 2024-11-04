"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "@/app/loading";
import { ClientHeaderProps } from "@/types/header";
import Logo from "@/components/ui/logo/logo";
import useUserStore from "@/store/userStore";
import DesktopMenu from "./desktopMenu";
import MobileMenu from "./mobileMenu";
import {
  FaHome,
  FaExpand,
  FaBolt,
  FaBars,
  FaUsers,
  FaArrowCircleRight,
  FaUserCircle,
  FaCompress,
  FaCalendarAlt,
  FaInfoCircle,
  FaCaretDown,
  FaPlus,
  FaEdit,
  FaTrash,
  FaRunning,
} from "react-icons/fa";
import { GiWeightLiftingUp } from "react-icons/gi";
import { useRouter } from "next/navigation";

const ClientHeader: React.FC<ClientHeaderProps> = ({ initialIsLoggedIn }) => {
  const router = useRouter();
  const { setUser, user } = useUserStore();

  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);
  const [isClient, setIsClient] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`/api/verifyToken`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (response.data.authenticated) {
          setIsLoggedIn(true);

          if (!user || user?.token !== response.data.token) {
            setUser({ ...user, token: response.data.token });
          }
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error: any) {
        console.error("checkAuthStatus", error.message);
        setUser(null);
        setIsLoggedIn(false);
      }
    };
    checkAuthStatus();
  }, [user]);

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
      handleLogout();
    }
  }, []);

  if (!isClient) {
    return <Loading />;
  }

  async function handleLogout() {
    try {
      const response = await axios.get("/api/logout");

      if (response.headers["x-need-reload"] === "true") {
        setIsLoggedIn(false);
        setUser(null);
        setMobileMenuOpen(false);
        router.refresh();
        //router.push("/auth/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const unsignedMenuItems = [
    { text: "Home", path: "/", icon: <FaHome className="h-5 w-5" /> },
    {
      text: "Workouts",
      path: "/workouts",
      icon: <FaBolt className="h-5 w-5" />,
    },
    {
      text: "Community",
      path: "/community",
      icon: <FaUsers className="h-5 w-5" />,
    },
    {
      text: "About",
      path: "/about",
      icon: <FaInfoCircle className="h-5 w-5" />,
    },
    {
      text: "Sign Up",
      path: "/auth/register",
      icon: <FaArrowCircleRight className="h-5 w-5" />,
    },
    {
      text: "Login",
      path: "/auth/login",
      icon: <FaCompress className="h-5 w-5" />,
    },
  ];

  const signedMenuItems = [
    { text: "Home", path: "/", icon: <FaHome className="h-5 w-5" /> },
    {
      text: "Workouts",
      path: "/dashboard/workouts",
      icon: <GiWeightLiftingUp className="h-5 w-5" />,
      dropdown: true,
      dropdownMenu: [
        {
          text: "Workouts",
          path: "/workouts",
          icon: <GiWeightLiftingUp className="h-5 w-5" />,
        },
        {
          text: "My Workouts",
          path: "/dashboard/workouts/myWorkouts",
          icon: <FaBolt className="h-5 w-5" />,
        },
        {
          text: "Create Workout",
          path: "/dashboard/workouts/create",
          icon: <FaPlus className="h-5 w-5" />,
        },
      ],
    },
    {
      text: "Exercises",
      path: "/dashboard/exercises",
      icon: <FaRunning className="h-5 w-5" />,
      dropdown: true,
      dropdownMenu: [
        {
          text: "Exercises",
          path: "/dashboard/exercises",
          icon: <FaRunning className="h-5 w-5" />,
        },
        {
          text: "My Exercises",
          path: "/dashboard/exercises/myExercises",
          icon: <FaBolt className="h-5 w-5" />,
        },
        {
          text: "Create Exercise",
          path: "/dashboard/exercises/create",
          icon: <FaPlus className="h-5 w-5" />,
        },
      ],
    },
    // {
    //   text: "Schedule",
    //   path: "/dashboard/schedule",
    //   icon: <FaCalendarAlt className="h-5 w-5" />,
    //   dropdown: true,
    //   dropdownMenu: [
    //     {
    //       text: "Schedule",
    //       path: "/dashboard/schedule",
    //       icon: <FaCalendarAlt className="h-5 w-5" />,
    //     },
    //     {
    //       text: "Create Schedule",
    //       path: "/dashboard/schedule/create",
    //       icon: <FaPlus className="mr-2" />,
    //     },
    //     {
    //       text: "Edit Schedule",
    //       path: "/dashboard/schedule/edit",
    //       icon: <FaEdit className="mr-2" />,
    //     },
    //     {
    //       text: "Delete Schedule",
    //       path: "/dashboard/schedule/delete",
    //       icon: <FaTrash className="mr-2" />,
    //     },
    //   ],
    // },
    {
      text: "Community",
      path: "/community",
      icon: <FaUsers className="h-5 w-5" />,
    },
    {
      text: "Profile",
      path: `/dashboard/profile/${user?.id}`,
      icon: <FaUserCircle className="h-5 w-5" />,
    },
  ];

  const menuItems = isLoggedIn ? signedMenuItems : unsignedMenuItems;

  return (
    <header className="relative z-50">
      <div className="navbar bg-slate-800 tracking-[0.12rem] flex flex-row items-center font-BebasNeue">
        <div className="flex-1 z-50 navbar-start">
          <Logo w={70} h={70} />
        </div>

        <button
          className="md:hidden text-white  w-auto p-1 relative z-50 mr-5 navbar-end"
          onClick={toggleMobileMenu}
        >
          <FaBars
            className={`h-10 w-10 transition-transform duration-300 ${
              mobileMenuOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <div className="hidden md:flex navbar-center">
          <DesktopMenu
            menuItems={menuItems}
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
          />
        </div>
      </div>
      <div className="md:hidden navbar-center ">
        <MobileMenu
          menuItems={menuItems}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        />
      </div>
    </header>
  );
};

export default ClientHeader;
