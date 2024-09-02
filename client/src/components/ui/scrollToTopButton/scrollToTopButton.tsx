"use client";

import React, { useState, useEffect } from "react";
import { IoIosArrowDropupCircle } from "react-icons/io";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-12 right-0 md:right-12 p-3  text-4xl rounded  text-gray-500 border-none cursor-pointer ${
        isVisible ? "block" : "hidden"
      }`}
    >
      <IoIosArrowDropupCircle />
    </button>
  );
};

export default ScrollToTopButton;
