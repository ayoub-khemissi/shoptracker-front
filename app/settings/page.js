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
import { useRouter } from "next/navigation";
import Modal from "../components/Modal";
import Title from "../components/Title";
import TextNormal from "../components/TextNormal";

export default function Settings() {
  const [tab, setTab] = useState("notifications");
  const { showToast } = useToast();
  const { user, saveUser } = useAuthContext();
  const [notificationMailbox, setNotificationMailbox] = useState(!!user?.alert_email);
  const [notificationTextMessage, setNotificationTextMessage] = useState(!!user?.alert_text);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const updateNotifications = async () => {
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

  const deleteAccount = async () => {
    const response = await fetchData(`/account/delete`, "DELETE");

    switch (response?.status) {
      case 200:
        showToast("Your account has been deleted. 👋😔", "info");
        router.push("/");
        break;

      case 400:
        showToast(
          "A subscription is still active. Please cancel it before deleting your account.",
          "error",
        );
        break;

      default:
        showToast("Failed to delete your account. Please try again later.", "error");
        break;
    }
  };

  return (
    <main className="h-full space-y-3 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:px-40">
      <div className="flex flex-wrap items-center justify-center sm:flex-nowrap sm:space-x-4">
        <Button
          locked
          className="m-1"
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
          className="m-1"
          type={tab === "subscription" ? "primary" : "contrast"}
          defaultCursor
          onClick={() => {
            setTab("subscription");
          }}
        >
          Subscription
        </Button>
        <Button
          locked
          className="m-1"
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
              <Button onClick={updateNotifications}>Save notifications</Button>
            </div>
          </div>
        </div>
      )}
      {tab === "subscription" && (
        <div className="flex w-full items-center justify-center py-4">
          <Subscription />
        </div>
      )}
      {tab === "account" && (
        <div className="flex w-full items-center justify-center py-4">
          <div className="flex w-96 flex-col items-center justify-evenly space-y-5">
            <TextSeparator className="w-full">Danger zone</TextSeparator>
            <Button type="secondary" onClick={() => setModalVisible(true)}>
              Delete account
            </Button>
          </div>
        </div>
      )}
      <Modal
        isVisible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      >
        <div className="space-y-4">
          <Title className="text-center text-xl">
            Are you sure you want to delete your account?
          </Title>
          <TextNormal>
            This action cannot be undone. All of your data will be permanently deleted.
          </TextNormal>
          <div className="flex w-full items-center justify-between">
            <Button
              type="primary"
              onClick={() => {
                setModalVisible(false);
              }}
            >
              No
            </Button>
            <Button
              type="secondary"
              onClick={() => {
                deleteAccount();
              }}
            >
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  );
}
