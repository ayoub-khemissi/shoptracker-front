"use client";

import React, { useEffect, useState } from "react";

const Toast = ({ message, type, show, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  const getBackgroundAndTextColor = () => {
    switch (type) {
      case "success":
        return "bg-success text-primary";
      case "error":
        return "bg-error text-primary";
      case "warning":
        return "bg-yellow-500 text-contrast";
      case "info":
      default:
        return "bg-blue-500 text-primary";
    }
  };

  return (
    <>
      {show && (
        <div
          className={`fixed left-1/2 top-8 -translate-x-1/2 transform rounded-lg px-4 py-3 text-center shadow-lg transition-opacity duration-500 ${
            visible ? "opacity-100" : "opacity-0"
          } ${getBackgroundAndTextColor()}`}
        >
          <div className="flex select-none items-center justify-between">
            <span>{message}</span>
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(onClose, 500);
              }}
              className="ml-4 font-bold"
            >
              &#x2715;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
