"use client";

import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import TextLabel from "../components/TextLabel";
import Image from "next/image";
import TextSeparator from "../components/TextSeparator";
import Switch from "../components/Switch";
import SubscriptionInfo from "../components/SubscriptionInfo";
import Constants from "@/utils/Constants";

export default function Settings() {
  const [tab, setTab] = useState("profile");
  const [notificationMailbox, setNotificationMailbox] = useState(true);
  const [notificationTextMessage, setNotificationTextMessage] = useState(true);
  const [notificationBrowser, setNotificationBrowser] = useState(true);
  const [activeSubscription, setActiveSubscription] = useState({
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
  const [canceledOrExpiredSubscriptions, setCanceledOrExpiredSubscriptions] = useState([]);

  return (
    <main className="h-full space-y-3 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-10 md:px-20 lg:px-40">
      <div className="flex flex-wrap items-center justify-center space-x-4">
        <Button
          className="mb-2"
          locked
          type={tab === "profile" ? "primary" : "contrast"}
          defaultCursor={true}
          onClick={() => {
            setTab("profile");
          }}
        >
          Profile
        </Button>
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
      {tab === "profile" && (
        <div className="flex flex-col items-center justify-center space-y-5">
          <div className="flex items-center justify-center">
            <Image
              className="rounded-full"
              src="https://lh3.googleusercontent.com/a/ACg8ocLYaqsM5UXK9HxKhvBQL_koiF-ceLh9FBRL513Y0zNHXo776OZI=s288-c-no"
              width={70}
              height={70}
              alt="profile picture"
            />
          </div>
          <div className="flex w-full flex-wrap items-center justify-evenly">
            <div className="flex w-60 flex-col items-center justify-center space-y-4 py-4 md:w-96">
              <TextSeparator className="w-full">Personnal Information</TextSeparator>
              <Input
                labelText="Email"
                className="w-full"
                placeholder="xyz@mail.com"
                disabled
                type="email"
              />
              <Input labelText="Firstname" className="w-full" placeholder="Jane" type="text" />
              <Input labelText="Lastname" className="w-full" placeholder="Doe" type="text" />
              <Input
                labelText="Phone number"
                className="w-full"
                placeholder="+000123456789"
                type="text"
              />
            </div>
            <div className="flex w-60 flex-col items-center justify-center space-y-4 py-4 md:w-96">
              <TextSeparator className="w-full">Address Information</TextSeparator>
              <Input labelText="Country" className="w-full" placeholder="Country" type="text" />
              <Input labelText="City" className="w-full" placeholder="City" type="text" />
              <Input labelText="Address" className="w-full" placeholder="Address" type="text" />
              <Input labelText="Zipcode" className="w-full" placeholder="Zipcode" type="text" />
            </div>
          </div>
          <div className="flex w-full items-center justify-center">
            <Button onClick={() => {}}>Save profile</Button>
          </div>
        </div>
      )}
      {tab === "notifications" && (
        <div className="flex w-full items-center justify-center py-4">
          <div className="flex w-60 flex-col items-center justify-evenly space-y-5 md:w-96">
            <TextSeparator className="w-full">Receive a notification</TextSeparator>
            <div
              className="flex w-full items-center justify-between"
              onClick={() => {
                setNotificationTextMessage(!notificationTextMessage);
              }}
            >
              <TextLabel>By text message</TextLabel>
              <Switch checked={notificationTextMessage} />
            </div>
            <div
              className="flex w-full items-center justify-between"
              onClick={() => {
                setNotificationMailbox(!notificationMailbox);
              }}
            >
              <TextLabel>In your mailbox</TextLabel>
              <Switch checked={notificationMailbox} />
            </div>
            <div
              className="flex w-full items-center justify-between"
              onClick={() => {
                setNotificationBrowser(!notificationBrowser);
              }}
            >
              <TextLabel>On your browser</TextLabel>
              <Switch checked={notificationBrowser} />
            </div>
            <div className="flex w-full items-center justify-center">
              <Button onClick={() => {}}>Save notifications</Button>
            </div>
          </div>
        </div>
      )}
      {tab === "subscriptions" && (
        <div className="flex w-full items-center justify-center py-4">
          <div className="flex w-60 flex-col items-center justify-center space-y-5 md:w-96">
            <TextSeparator className="w-full">Active</TextSeparator>
            <SubscriptionInfo
              subscriptionInfo={activeSubscription.subscriptionInfo}
              planInfo={activeSubscription.planInfo}
            />
            <TextSeparator className="w-full">Canceled or expired</TextSeparator>
            {canceledOrExpiredSubscriptions.slice(0, 3).map((subscription) => {
              return (
                <SubscriptionInfo
                  key={`subscription-${subscription.id}`}
                  subscriptionInfo={subscription.subscriptionInfo}
                  planInfo={subscription.planInfo}
                />
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
