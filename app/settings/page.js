"use client";

import { useState } from "react";
import Button from "../components/Button";
import TextLabel from "../components/TextLabel";
import TextSeparator from "../components/TextSeparator";
import Switch from "../components/Switch";
import SubscriptionInfo from "../components/SubscriptionInfo";
import Constants from "@/utils/Constants";
import { fetchData } from "@/modules/Fetch";
import { useToast } from "../contexts/ToastContext";

export default function Settings() {
  const [tab, setTab] = useState("notifications");
  const [notificationMailbox, setNotificationMailbox] = useState(true);
  const [notificationTextMessage, setNotificationTextMessage] = useState(true);
  const [activeSubscription] = useState({
    planInfo: {
      id: Constants.SUBSCRIPTION_PLAN_ID_FREE,
      monthlyAnnually: false,
      title: "Free Plan",
      price: 0,
      trackCheckInterval: 21600000,
      trackEnabledMaxProducts: 1,
      trackDisabledMaxProducts: 5,
      trackMaxUserSearchesPerDay: 5,
    },
  });
  const [canceledOrExpiredSubscriptions] = useState([]);
  const { showToast } = useToast();

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
          type={tab === "subscriptions" ? "primary" : "contrast"}
          defaultCursor
          onClick={() => {
            setTab("subscriptions");
          }}
        >
          Subscriptions
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
      {tab === "subscriptions" && (
        <div className="flex w-full items-center justify-center py-4">
          <div className="flex w-96 flex-col items-center justify-center space-y-5">
            <TextSeparator className="w-full">Active</TextSeparator>
            <SubscriptionInfo
              subscriptionInfo={activeSubscription.subscriptionInfo}
              planInfo={activeSubscription.planInfo}
            />
            {canceledOrExpiredSubscriptions.slice(0, 3).map((subscription) => {
              return (
                <>
                  <TextSeparator className="w-full">Canceled or expired</TextSeparator>
                  <SubscriptionInfo
                    key={`subscription-${subscription.id}`}
                    subscriptionInfo={subscription.subscriptionInfo}
                    planInfo={subscription.planInfo}
                  />
                </>
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
