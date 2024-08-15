import useAlertStore from "@/store/alertStore";
import React, { useEffect } from "react";

const Alert = () => {
  const { alert, setAlert } = useAlertStore();

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  if (!alert) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 text-lg font-semibold px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg transition-opacity duration-500 ease-out z-50">
      {alert}
    </div>
  );
};

export default Alert;
