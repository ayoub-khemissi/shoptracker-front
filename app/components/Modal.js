"use client";

import { useEffect } from "react";

const Modal = ({ children, isVisible = false, onClose = () => {} }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isVisible) {
      document.body.style.position = "hidden";
      document.body.style.overflowY = "scroll";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.position = "static";
      document.body.style.overflowY = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-10">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <span className="sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>

        <div
          className="inline-block transform overflow-hidden rounded-lg bg-contrast text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-contrast p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
