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
  const { user, localLogout, saveUser } = useAuthContext();
  const [notificationMailbox, setNotificationMailbox] = useState(!!user?.alert_email);
  const [notificationTextMessage, setNotificationTextMessage] = useState(!!user?.alert_text);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [cancelSubscriptionModalVisible, setCancelSubscriptionModalVisible] = useState(false);
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
        localLogout();
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

  const cancelSubscription = async () => {
    const response = await fetchData(`/subscription/cancel`, "DELETE");

    switch (response?.status) {
      case 200:
        user.subscription = {
          stripe_price_id: null,
          start_date: null,
          next_payment_date: null,
          payment_method: null,
          payment_history: [],
        };
        saveUser(user);
        window.location.reload();
        break;

      default:
        showToast("Failed to cancel your subscription. Please try again later.", "error");
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
        <div className="flex w-full flex-wrap items-start justify-center space-y-4 py-4">
          <Subscription />
          {user?.subscription?.stripe_price_id && (
            <>
              <div className="flex w-96 flex-col items-center justify-evenly space-y-5">
                <TextSeparator className="w-full">Subscription management</TextSeparator>
                <Button type="secondary" onClick={() => setCancelSubscriptionModalVisible(true)}>
                  Cancel subscription
                </Button>
              </div>
              <Modal
                isVisible={cancelSubscriptionModalVisible}
                onClose={() => {
                  setCancelSubscriptionModalVisible(false);
                }}
              >
                <div className="space-y-4">
                  <Title className="text-center text-xl">
                    Are you sure you want to cancel your subscription?
                  </Title>
                  <TextNormal>
                    This action cannot be undone. If you proceed, your subscription will be
                    canceled. You will receive a prorated refund based on the remaining time on your
                    subscription.
                  </TextNormal>
                  <div className="flex w-full items-center justify-between">
                    <Button
                      type="primary"
                      onClick={() => {
                        setCancelSubscriptionModalVisible(false);
                      }}
                    >
                      No
                    </Button>
                    <Button type="secondary" onClick={cancelSubscription}>
                      Yes
                    </Button>
                  </div>
                </div>
              </Modal>
            </>
          )}
        </div>
      )}
      {tab === "account" && (
        <div className="flex w-full items-center justify-center py-4">
          <div className="flex w-96 flex-col items-center justify-evenly space-y-5">
            <TextSeparator className="w-full">Danger zone</TextSeparator>
            <Button type="secondary" onClick={() => setDeleteAccountModalVisible(true)}>
              Delete account
            </Button>
          </div>
          <Modal
            isVisible={deleteAccountModalVisible}
            onClose={() => {
              setDeleteAccountModalVisible(false);
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
                    setDeleteAccountModalVisible(false);
                  }}
                >
                  No
                </Button>
                <Button type="secondary" onClick={deleteAccount}>
                  Yes
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </main>
  );
}
