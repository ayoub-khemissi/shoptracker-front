"use client";

import React, { useEffect, useState } from "react";
import InvisibleButton from "./InvisibleButton";

const Toast = ({ message, type, show, onClose }) => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (show) {
      setVisible(true);
      setProgress(100);
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(timer);
            setVisible(false);
            setTimeout(onClose, 500);
            return 0;
          }
          return prev - 100 / 30;
        });
      }, 100);

      return () => {
        clearInterval(timer);
      };
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
        return "bg-blue-600 text-primary";
    }
  };

  return (
    <>
      {show && (
        <div
          className={`fixed bottom-20 left-1/2 z-50 -translate-x-1/2 transform overflow-hidden rounded-lg px-4 py-3 text-center shadow-lg transition-opacity duration-500 ${
            visible ? "opacity-100" : "opacity-0"
          } ${getBackgroundAndTextColor()}`}
        >
          <div className="flex select-none items-center justify-between">
            <span>{message}</span>
            <InvisibleButton
              onClick={() => {
                setVisible(false);
                setTimeout(onClose, 500);
              }}
              className="ml-4 font-bold"
            >
              &#x2715;
            </InvisibleButton>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-1 bg-primary"
            style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
          />
        </div>
      )}
    </>
  );
};

export default Toast;
