"use client";

import { useState } from "react";
import Button from "../components/Button";
import TextLabel from "../components/TextLabel";
import TextSeparator from "../components/TextSeparator";
import Switch from "../components/Switch";
import SubscriptionInfo from "../components/SubscriptionInfo";
import Constants from "@/utils/Constants";

export default function Settings() {
  const [tab, setTab] = useState("notifications");
  const [notificationMailbox, setNotificationMailbox] = useState(true);
  const [notificationTextMessage, setNotificationTextMessage] = useState(true);
  const [notificationBrowser, setNotificationBrowser] = useState(true);
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

  return (
    <main className="h-full space-y-3 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:px-40">
      <div className="flex flex-wrap items-center justify-center space-x-4">
        <Button
          className="mb-2"
          locked
          type={tab === "notifications" ? "primary" : "contrast"}
          defaultCursor={true}
          onClick={() => {
            setTab("notifications");
          }}
        >
          Notifications
        </Button>
        <Button
          className="mb-2"
          locked
          type={tab === "subscriptions" ? "primary" : "contrast"}
          defaultCursor={true}
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
                setNotificationTextMessage(!notificationTextMessage);
              }}
            >
              <TextLabel>By text message</TextLabel>
              <Switch checked={notificationTextMessage} opacityWhenOff />
            </div>
            <div
              className="flex w-full items-center justify-between"
              onClick={() => {
                setNotificationMailbox(!notificationMailbox);
              }}
            >
              <TextLabel>In your mailbox</TextLabel>
              <Switch checked={notificationMailbox} opacityWhenOff />
            </div>
            <div
              className="flex w-full items-center justify-between"
              onClick={() => {
                setNotificationBrowser(!notificationBrowser);
              }}
            >
              <TextLabel>On your browser</TextLabel>
              <Switch checked={notificationBrowser} opacityWhenOff />
            </div>
            <div className="flex w-full items-center justify-center">
              <Button>Save notifications</Button>
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
