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
          className="inline-block max-h-[42rem] max-w-[42rem] transform overflow-visible rounded-xl border border-white/10 bg-gradient-to-br from-contrast/95 via-contrast to-contrast/90 p-6 align-bottom shadow-xl shadow-secondary/5 backdrop-blur-md transition-all duration-300 ease-out sm:align-middle"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          {isClosable && (
            <button
              type="button"
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-3xl text-white transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2"
              aria-label="Close"
              tabIndex={0}
              onClick={onClose}
            >
              &times;
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
