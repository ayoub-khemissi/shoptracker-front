"use client";

import { useEffect, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";

const INSTALL_PROMPT_DELAY_DAYS = 7;

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const lastRejection = localStorage.getItem("installPromptRejected");
    if (lastRejection) {
      const rejectionDate = new Date(lastRejection);
      const delayExpired =
        new Date() >
        new Date(rejectionDate.setDate(rejectionDate.getDate() + INSTALL_PROMPT_DELAY_DAYS));
      if (!delayExpired) return;
    }

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    const { outcome } = await deferredPrompt.prompt();

    if (outcome !== "accepted") {
      localStorage.setItem("installPromptRejected", new Date().getTime().toString());
    }

    setDeferredPrompt(null);
    setIsVisible(false);
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={() => {
        localStorage.setItem("installPromptRejected", new Date().getTime().toString());
        setIsVisible(false);
      }}
    >
      <div className="space-y-4">
        <h3 className="text-center text-xl font-bold">Install ShopTracker</h3>
        <p className="text-center">Add ShopTracker to your home screen for faster access! 🚀</p>
        <div className="flex justify-center gap-4">
          <Button type="secondary" onClick={() => setIsVisible(false)}>
            Later
          </Button>
          <Button type="quaternary" onClick={handleInstallClick}>
            Install
          </Button>
        </div>
      </div>
    </Modal>
  );
}
