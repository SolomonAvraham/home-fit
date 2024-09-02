import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MenuItemProps } from "@/types/header";
import { FaCaretDown, FaExpand } from "react-icons/fa";

const MobileMenu: React.FC<{
  menuItems: MenuItemProps[];
  mobileMenuOpen: boolean;
  isLoggedIn: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  handleLogout: () => Promise<void>;
  isPending: boolean;
}> = ({
  menuItems,
  mobileMenuOpen,
  setMobileMenuOpen,
  isLoggedIn,
  handleLogout,
  isPending,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleDropdownClick = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  // useEffect(() => {
  //   if (mobileMenuOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [mobileMenuOpen]);

  return (
    <>
      {mobileMenuOpen && (
        <ul className="mobile-nav  bg-slate-800  w-screen  tracking-widest pb-12 text-3xl flex flex-col items-center justify-center gap-5 font-BebasNeue">
          {" "}
          {menuItems.map((item, i: number) => (
            <li key={item.text} className="mobile-nav-item  w-screen p-3">
              {item.dropdown ? (
                <div className="flex flex-col items-center justify-center">
                  <button
                    className="hover:bg-white  hover:text-white hover:bg-opacity-30 flex flex-col items-center justify-center w-screen p-3"
                    onClick={() => handleDropdownClick(i)}
                  >
                    {item.icon} {item.text}
                    <FaCaretDown
                      className={` ${openIndex === i && "rotate-180"}  `}
                    />{" "}
                  </button>
                  {openIndex === i && (
                    <ul className="mobile-dropdown flex  flex-col gap-2 p-4 items-center justify-center text-2xl">
                      {item.dropdownMenu?.map((dropdownItem) => (
                        <li
                          key={dropdownItem.text}
                          className="hover:bg-white hover:text-white hover:bg-opacity-30 w-screen flex gap-3 items-center justify-center p-3"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setOpenIndex(null);
                          }}
                        >
                          {dropdownItem.icon}
                          <Link href={dropdownItem.path} passHref>
                            {dropdownItem.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <Link
                  href={item.path}
                  passHref
                  className="flex flex-col items-center justify-center hover:bg-white hover:text-white hover:bg-opacity-30 p-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon} {item.text}
                </Link>
              )}
            </li>
          ))}{" "}
          {isLoggedIn && (
            <li
              key={11}
              className="flex flex-col items-center justify-center hover:bg-white hover:text-white hover:bg-opacity-30 p-3 w-screen"
            >
              <button
                onClick={handleLogout}
                disabled={isPending}
                className="flex flex-col justify-center items-center p-3"
              >
                <FaExpand className="h-5 w-5" />
                Logout
              </button>
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default MobileMenu;
