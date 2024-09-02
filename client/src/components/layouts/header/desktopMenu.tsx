import React from "react";
import Link from "next/link";
import { MenuItemProps } from "@/types/header";
import { FaCaretDown, FaExpand } from "react-icons/fa";

const DesktopMenu: React.FC<{
  menuItems: MenuItemProps[];
  isLoggedIn: boolean;
  handleLogout: () => Promise<void>;
  isPending: boolean;
}> = ({ menuItems, isLoggedIn, handleLogout, isPending }) => {
  return (
    <ul className="relative desktop-nav menu menu-horizontal p-0 gap-4 flex flex-row items-center">
      {menuItems.map((item) => (
        <li key={item.text} className="desktop-nav-item">
          {item.dropdown ? (
            <div className="relative group">
              <button className="desktop-dropdown-button flex flex-col items-center justify-center">
                {item.icon}
                <span className={`font-semibold  `}>{item.text}</span>
                <FaCaretDown
                  className="transition-transform duration-500 text-xl group-hover:rotate-180"
                />{" "}
              </button>
              <div className="desktop-dropdown-content hidden   group-hover:block  absolute top-full rounded-md z-50 -translate-x-9 bg-slate-800 p-4">
                <ul>
                  {item.dropdownMenu?.map((dropdownItem) => (
                    <li key={dropdownItem.text}>
                      <Link href={dropdownItem.path} passHref>
                        {dropdownItem.icon} {dropdownItem.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <Link href={item.path} passHref className="flex flex-col">
              {item.icon} {item.text}
            </Link>
          )}
        </li>
      ))}

      {isLoggedIn && (
        <li key={11} className="mx-auto">
          <button
            onClick={handleLogout}
            disabled={isPending}
            className="flex flex-col justify-center items-center"
          >
            <FaExpand className="h-5 w-5" />
            Logout
          </button>
        </li>
      )}
    </ul>
  );
};

export default DesktopMenu;
