import { MenuItemProps } from "@/types/header";
import Link from "next/link";
import { useRef } from "react";
import {
  FaHome,
  FaBolt,
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

export const unsignedMenuItems = [
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

export const signedMenuItems = [
  { text: "Home", path: "/", icon: <FaHome className="h-5 w-5" /> },
  {
    text: "Workouts",
    path: "/dashboard/workouts",
    icon: <FaBolt className="h-5 w-5" />,
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
  {
    text: "Schedule",
    path: "/dashboard/schedule",
    icon: <FaCalendarAlt className="h-5 w-5" />,
    dropdown: true,
    dropdownMenu: [
      {
        text: "Schedule",
        path: "/dashboard/schedule",
        icon: <FaCalendarAlt className="h-5 w-5" />,
      },
      {
        text: "Create Schedule",
        path: "/dashboard/schedule/create",
        icon: <FaPlus className="mr-2" />,
      },
      {
        text: "Edit Schedule",
        path: "/dashboard/schedule/edit",
        icon: <FaEdit className="mr-2" />,
      },
      {
        text: "Delete Schedule",
        path: "/dashboard/schedule/delete",
        icon: <FaTrash className="mr-2" />,
      },
    ],
  },
  {
    text: "Community",
    path: "/community",
    icon: <FaUsers className="h-5 w-5" />,
  },
  {
    text: "Profile",
    path: "/dashboard/profile",
    icon: <FaUserCircle className="h-5 w-5" />,
  },
];

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  index,
  isMobile,
  drawerOpen,
  dropdownOpen,
  handleDropdownToggle,
  handleDrawerToggle,
  setDropdownOpen,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  return (
    <li
      key={item.text}
      className={`${isMobile ? "w-full" : ""} ${
        drawerOpen ? `menu-item menu-item-delay-${index + 1}` : ""
      }`}
    >
      {item.dropdown ? (
        <div className="relative" ref={dropdownRef}>
          <button
            className={`text-white flex flex-col justify-center items-center ${
              isMobile
                ? "text-center font-semibold text-4xl bg-slate-700 bg-opacity-20 w-full p-1 tracking-[0.2rem]"
                : ""
            }`}
            onClick={() => handleDropdownToggle(index)}
          >
            {item.icon}
            <span className={`${isMobile ? "" : "font-semibold"}`}>
              {item.text}
            </span>
            <FaCaretDown />
          </button>
          {dropdownOpen === index && (
            <div className="dropdown absolute top-16 -translate-x-12 bg-slate-700 mt-2 rounded shadow-lg z-50 w-52 p-2">
              <ul>
                {item.dropdownMenu?.map((dropdownItem, i) => (
                  <li
                    key={dropdownItem.text}
                    className="hover:bg-slate-600 rounded"
                  >
                    <Link
                      href={dropdownItem.path}
                      passHref
                      onClick={() => setDropdownOpen(null)}
                    >
                      <span className="text-white flex items-center p-2">
                        {dropdownItem.icon}
                        <span className="ml-2">{dropdownItem.text}</span>
                        {dropdownItem.dropdown && (
                          <FaCaretDown className="ml-2" />
                        )}
                      </span>
                    </Link>
                    {dropdownItem.dropdown && (
                      <div className="dropdown absolute top-[3.2rem] -translate-x-8 bg-slate-700 mt-2 rounded shadow-lg z-50 w-52 p-2">
                        <ul>
                          {dropdownItem.dropdownMenu?.map(
                            (nestedDropdownItem, j) => (
                              <li
                                key={nestedDropdownItem.text}
                                className="hover:bg-slate-600 rounded"
                              >
                                <Link href={nestedDropdownItem.path} passHref>
                                  <span className="text-white flex items-center p-2">
                                    {nestedDropdownItem.icon}
                                    <span className="ml-2">
                                      {nestedDropdownItem.text}
                                    </span>
                                  </span>
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link
          href={item.path}
          className={`text-white flex flex-col items-center ${
            isMobile
              ? "text-center font-semibold text-4xl bg-slate-700 bg-opacity-20 w-full p-1 tracking-[0.2rem]"
              : ""
          }`}
          onClick={isMobile ? handleDrawerToggle : undefined}
          passHref
        >
          {item.icon}
          <span className={isMobile ? "" : "ml-1 font-semibold"}>
            {item.text}
          </span>
        </Link>
      )}
    </li>
  );
};

export default MenuItem;
