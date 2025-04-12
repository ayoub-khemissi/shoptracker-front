"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useToast } from "@/app/contexts/ToastContext";
import Button from "./Button";
import Title from "./Title";
import { useAuthContext } from "@/app/contexts/AuthContext";
import { subscribeToBrowserNotification } from "@/modules/BrowserNotification";
import { fetchData } from "@/modules/Fetch";

const INSTALL_PROMPT_DELAY_DAYS = 7;

export default function BrowserNotificationPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const { user, saveUser } = useAuthContext();
  const { showToast } = useToast();

  useEffect(() => {
    if (
      !(navigator?.serviceWorker && window?.PushManager) ||
      !user ||
      (user.alert_browser && user.alert_browser_subscription)
    ) {
      return;
    }

    const lastRejection = localStorage.getItem("browserNotificationPromptRejected");
    if (lastRejection) {
      const rejectionDate = Number(lastRejection);
      const sevenDaysLater = rejectionDate + INSTALL_PROMPT_DELAY_DAYS * 24 * 60 * 60 * 1000;

      if (Date.now() < sevenDaysLater) {
        return;
      }
    }

    setIsVisible(true);
  }, [user]);

  function handleClose() {
    localStorage.setItem("browserNotificationPromptRejected", new Date().getTime());
    setIsVisible(false);
  }

  const handleSubscribe = async () => {
    if (!user) return;

    const subscription = await subscribeToBrowserNotification(navigator, window);
    if (!subscription) {
      showToast("Failed to subscribe to browser notifications.", "error");
      return;
    }

    const response = await fetchData("/notifications/update", "PATCH", {
      alertEmail: !!user.alert_email,
      alertSms: !!user.alert_sms,
      alertBrowser: true,
      alertPush: !!user.alert_push,
      alertBrowserSubscription: subscription,
      alertPushSubscription: user.alert_push_subscription,
    });

    if (!response || response.status !== 200) {
      showToast(
        "An error occurred while saving your notifications settings. Please try again later.",
        "error",
      );
      return;
    }

    user.alert_browser = true;
    user.alert_browser_subscription = subscription;
    saveUser(user);
    showToast("Browser notifications enabled successfully! 🎉", "success");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Modal isVisible={isVisible} onClose={handleClose}>
      <div className="space-y-4">
        <Title className="text-center text-xl">Enable Browser Notifications</Title>
        <p className="text-center">Get real-time updates directly to your device!</p>
        <div className="flex justify-center gap-4">
          <Button type="secondary" onClick={handleClose}>
            Later
          </Button>
          <Button type="quaternary" onClick={handleSubscribe}>
            Enable
          </Button>
        </div>
      </div>
    </Modal>
  );
}
