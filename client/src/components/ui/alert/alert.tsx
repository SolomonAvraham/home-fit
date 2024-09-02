"use client";

import useAlertStore from "@/store/alertStore";
import React, { useEffect } from "react";

const Alert = () => {
  const { alert, setAlert, isError } = useAlertStore();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [alert, setAlert, isError]);

  if (!alert) return null;

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 text-base md:text-lg font-semibold px-6 py-3 ${
        isError ? "bg-red-500" : "bg-slate-700"
      } text-white rounded-lg shadow-lg transition-opacity duration-500 ease-in-out z-50 min-w-sm`}
    >
      {alert}
    </div>
  );
};

export default Alert;
