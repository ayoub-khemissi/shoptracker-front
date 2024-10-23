"use client";

import { useState } from "react";
import Button from "../components/Button";
import TextLabel from "../components/TextLabel";
import TextSeparator from "../components/TextSeparator";
import Switch from "../components/Switch";
import Subscription from "../components/Subscription";
import { fetchData } from "@/modules/Fetch";
import { useToast } from "../contexts/ToastContext";
import { useAuthContext } from "../contexts/AuthContext";

export default function Settings() {
  const [tab, setTab] = useState("notifications");
  const { showToast } = useToast();
  const { user, saveUser } = useAuthContext();
  const [notificationMailbox, setNotificationMailbox] = useState(!!user.alert_email);
  const [notificationTextMessage, setNotificationTextMessage] = useState(!!user.alert_text);

  const handleUpdateNotifications = async () => {
    const response = await fetchData("/notifications/update", "PATCH", {
      alertEmail: notificationMailbox,
      alertText: notificationTextMessage,
      alertBrowserNotification: false,
      alertPushNotification: true,
    });

    if (!response || response.status !== 200) {
      showToast(
        "An error occurred while saving your notifications settings. Please try again later.",
        "error",
      );
      return;
    }

    user.alert_email = notificationMailbox;
    user.alert_text = notificationTextMessage;
    saveUser(user);

    showToast("Notifications settings saved! 🥳", "success");
  };

  return (
    <main className="h-full space-y-3 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:px-40">
      <div className="flex flex-wrap items-center justify-center sm:flex-nowrap sm:space-x-4">
        <Button
          locked
          className="my-1"
          type={tab === "notifications" ? "primary" : "contrast"}
          defaultCursor
          onClick={() => {
            setTab("notifications");
          }}
        >
          Notifications
        </Button>
        <Button
          locked
          className="my-1"
          type={tab === "account" ? "primary" : "contrast"}
          defaultCursor
          onClick={() => {
            setTab("account");
          }}
        >
          Account
        </Button>
      </div>
      {tab === "notifications" && (
        <div className="flex w-full items-center justify-center py-4">
          <div className="flex w-96 flex-col items-center justify-evenly space-y-5">
            <TextSeparator className="w-full">Receive a notification</TextSeparator>
            <div
              className="flex w-full items-center justify-between"
              onClick={() => {
                if (notificationTextMessage && !notificationMailbox) {
                  showToast("You must choose at least one notification method.", "error");
                  return;
                }

                setNotificationTextMessage(!notificationTextMessage);
              }}
            >
              <TextLabel>By text message</TextLabel>
              <Switch checked={notificationTextMessage} opacityWhenOff />
            </div>
            <div
              className="flex w-full items-center justify-between"
              onClick={() => {
                if (notificationMailbox && !notificationTextMessage) {
                  showToast("You must choose at least one notification method.", "error");
                  return;
                }

                setNotificationMailbox(!notificationMailbox);
              }}
            >
              <TextLabel>In your mailbox</TextLabel>
              <Switch checked={notificationMailbox} opacityWhenOff />
            </div>
            <div className="flex w-full items-center justify-center">
              <Button onClick={handleUpdateNotifications}>Save notifications</Button>
            </div>
          </div>
        </div>
      )}
      {tab === "account" && (
        <div className="flex w-full items-center justify-center py-4">
          <div className="flex w-96 flex-col items-center justify-center space-y-5">
            <Subscription />
          </div>
        </div>
      )}
    </main>
  );
}
