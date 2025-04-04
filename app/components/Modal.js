"use client";

import { useEffect } from "react";

const Modal = ({ children, isVisible = false, onClose = () => {}, isClosable = true }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isClosable) {
        onClose();
      }
    };

    if (isVisible) {
      document.body.style.position = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.position = "static";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isVisible, onClose, isClosable]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-10 w-full">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={isClosable ? onClose : null}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-tertiary/5"></div>
        </div>

        <span className="sm:inline-block sm:h-screen sm:align-middle">&#8203;</span>

        <div
          className="inline-block w-full transform overflow-visible rounded-xl border border-white/10 bg-gradient-to-br from-contrast/95 via-contrast to-contrast/90 p-1 text-left align-bottom shadow-xl shadow-secondary/5 backdrop-blur-md transition-all duration-300 ease-out sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
