"use client";

import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import TextLabel from "../components/TextLabel";
import Image from "next/image";
import TextSeparator from "../components/TextSeparator";

export default function Settings() {
  const [tab, setTab] = useState("profile");

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
          type={tab === "subscription-history" ? "primary" : "contrast"}
          defaultCursor={true}
          onClick={() => {
            setTab("subscription-history");
          }}
        >
          Subscription history
        </Button>
      </div>
      {tab === "profile" && (
        <div className="space-y-5">
          <div className="flex items-center justify-center space-x-4">
            <Image
              className="rounded-full"
              src="https://lh3.googleusercontent.com/a/ACg8ocLYaqsM5UXK9HxKhvBQL_koiF-ceLh9FBRL513Y0zNHXo776OZI=s288-c-no"
              width={70}
              height={70}
              alt="profile picture"
            />
          </div>
          <TextSeparator>Personnal Information</TextSeparator>
          <div className="flex items-center justify-between">
            <TextLabel>Email</TextLabel>
            <Input className="w-60 md:w-96" placeholder="xyz@mail.com" disabled type="email" />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <TextLabel>Firstname</TextLabel>
            <Input className="w-60 md:w-96" placeholder="Jane" type="text" />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <TextLabel>Lastname</TextLabel>
            <Input className="w-60 md:w-96" placeholder="Doe" type="text" />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <TextLabel>Phone number</TextLabel>
            <Input className="w-60 md:w-96" placeholder="+000123456789" type="text" />
          </div>
          <TextSeparator>Address Information</TextSeparator>
          <div className="flex items-center justify-between space-x-4">
            <TextLabel>Country</TextLabel>
            <Input className="w-60 md:w-96" placeholder="Country" type="text" />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <TextLabel>City</TextLabel>
            <Input className="w-60 md:w-96" placeholder="City" type="text" />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <TextLabel>Address</TextLabel>
            <Input className="w-60 md:w-96" placeholder="Address" type="text" />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <TextLabel>Zipcode</TextLabel>
            <Input className="w-60 md:w-96" placeholder="Zipcode" type="text" />
          </div>
          <div className="flex items-center justify-end">
            <Button onClick={() => {}}>Update</Button>
          </div>
        </div>
      )}
    </main>
  );
}
