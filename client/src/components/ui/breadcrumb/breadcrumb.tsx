"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface BreadcrumbProps {
  currentPath: string;
  excludePaths?: string[]; // Optional array of paths to exclude
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentPath,
  excludePaths = [],
}) => {
  const router = useRouter();

  // Ensure currentPath is defined and is a string
  const validCurrentPath = currentPath || ""; // Default to an empty string if currentPath is undefined

  // Split the path and filter out any excluded segments
  const pathArray = validCurrentPath
    .split("/")
    .filter((path: string) => path && !excludePaths.includes(path));

  return (
    <div className="flex  justify-start items-center p-4">
      {pathArray.map((path: string, index: number) => {
        const isFirst: boolean = index === 0 && path === "dashboard"; // Check if the first path is "dashboard"
        const isLast: boolean = index === pathArray.length - 1; // Check if it's the last path
        const fullPath: string = "/" + pathArray.slice(0, index + 1).join("/");

        return (
          <React.Fragment key={index}>
            {isFirst ? (
              // Render the first "dashboard" item as non-clickable (disabled) but not bold
              <span className="text-sm text-gray-600">{path}</span>
            ) : isLast ? (
              // Render the last item as non-clickable (disabled) and bold
              <span className="text-sm font-bold text-black">{path}</span>
            ) : (
              <Link
                href={fullPath}
                className={`text-sm text-gray-600 hover:text-black transition`}
              >
                {path}
              </Link>
            )}
            {!isLast && (
              <span className="text-gray-500">
                <MdOutlineKeyboardArrowRight />
              </span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
