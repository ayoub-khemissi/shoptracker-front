"use client";

import { useEffect, useState } from "react";
import Button from "../components/Button";
import TextLabel from "../components/TextLabel";
import TextSeparator from "../components/TextSeparator";
import Switch from "../components/Switch";
import Subscription from "../components/Subscription";
import { fetchData, fetchLogout } from "@/modules/Fetch";
import { useToast } from "../contexts/ToastContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "../components/Modal";
import Title from "../components/Title";
import TextNormal from "../components/TextNormal";
import Input from "../components/Input";
import { validatePassword, validatePhone } from "@/modules/DataValidation";
import Constants from "@/utils/Constants";

const { SETTINGS_TAB_NOTIFICATIONS, SETTINGS_TAB_ACCOUNT, SETTINGS_TAB_SUBSCRIPTION } = Constants;

export default function Settings() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(searchParams.get("tab") || SETTINGS_TAB_NOTIFICATIONS);
  const { showToast } = useToast();
  const { user, localLogout, saveUser } = useAuthContext();
  const [notificationMailbox, setNotificationMailbox] = useState(!!user?.alert_email);
  const [notificationTextMessage, setNotificationTextMessage] = useState(!!user?.alert_text);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [cancelSubscriptionModalVisible, setCancelSubscriptionModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isErrorNewPassword, setIsErrorNewPassword] = useState(false);
  const [isErrorConfirmNewPassword, setIsErrorConfirmNewPassword] = useState(false);
  const [phone, setPhone] = useState(user?.phone);
  const [isErrorPhone, setIsErrorPhone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTab(searchParams.get("tab") || SETTINGS_TAB_NOTIFICATIONS);
  }, [searchParams]);

  const updatePhone = async (e) => {
    e.preventDefault();

    const response = await fetchData("/phone/update", "PATCH", {
      phone: phone,
    });

    if (!response || response.status !== 200) {
      showToast(
        "An error occurred while saving your phone number. Please try again later.",
        "error",
      );
      return;
    }

    user.phone = phone;
    saveUser(user);

    showToast("Phone number saved! 🥳", "success");
  };

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
        await fetchLogout();
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
          stripe_subscription_id: null,
          start_date: null,
          next_payment_date: null,
          payment_method: null,
          invoice_history: [],
        };

        saveUser(user);
        window.location.reload();
        break;

      default:
        showToast("Failed to cancel your subscription. Please try again later.", "error");
        break;
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      showToast("Passwords do not match.", "error");
      setIsErrorConfirmNewPassword(true);
      return;
    }

    const response = await fetchData("/password/reset", "PATCH", {
      newPassword: newPassword,
    });

    switch (response?.status) {
      case 200:
        showToast("Password changed successfully! 🎉", "success");

        setNewPassword("");
        setConfirmNewPassword("");
        setIsErrorNewPassword(false);
        setIsErrorConfirmNewPassword(false);
        break;

      case 400:
        showToast("Invalid new password, please try again.", "error");
        break;

      default:
        showToast("Failed to change password. Please try again later.", "error");
        break;
    }
  };

  return (
    <>
      <title>Settings</title>
      <meta
        name="description"
        content="Settings page for ShopTracker. This page allows users to edit their account settings."
      />
      <main className="h-full space-y-3 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:px-40">
        <div className="flex flex-wrap items-center justify-center sm:flex-nowrap sm:space-x-4">
          <Button
            locked
            className="m-1"
            type={tab === SETTINGS_TAB_NOTIFICATIONS ? "primary" : "contrast"}
            defaultCursor
            onClick={() => {
              router.push(`/settings?tab=${SETTINGS_TAB_NOTIFICATIONS}`);
            }}
          >
            Notifications
          </Button>
          <Button
            locked
            className="m-1"
            type={tab === SETTINGS_TAB_SUBSCRIPTION ? "primary" : "contrast"}
            defaultCursor
            onClick={() => {
              router.push(`/settings?tab=${SETTINGS_TAB_SUBSCRIPTION}`);
            }}
          >
            Subscription
          </Button>
          <Button
            locked
            className="m-1"
            type={tab === SETTINGS_TAB_ACCOUNT ? "primary" : "contrast"}
            defaultCursor
            onClick={() => {
              router.push(`/settings?tab=${SETTINGS_TAB_ACCOUNT}`);
            }}
          >
            Account
          </Button>
        </div>
        {tab === SETTINGS_TAB_NOTIFICATIONS && (
          <div className="flex w-full flex-col items-center justify-center space-y-4 py-4">
            <div className="flex w-96 flex-col items-center justify-evenly space-y-5">
              <TextSeparator className="w-full">Receive a notification</TextSeparator>
              <div
                className="flex w-full items-center justify-between"
                onClick={() => {
                  if (!user?.phone) {
                    showToast(
                      "You must add a phone number below to receive text notifications.",
                      "error",
                    );
                    return;
                  }

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
            <div className="flex w-96 flex-col items-center justify-evenly space-y-5">
              <TextSeparator className="w-full">Phone number</TextSeparator>
              <form className="w-full space-y-4" onSubmit={updatePhone}>
                <Input
                  id="phone"
                  className="w-full"
                  labelText="Phone Number"
                  type="text"
                  placeholder="+1234567890"
                  value={phone}
                  required
                  isError={isErrorPhone}
                  pattern="^\+\d{10,15}$"
                  errorText="The phone number must start with a plus sign (+) followed by 10 to 15 digits."
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setIsErrorPhone(!validatePhone(e.target.value));
                  }}
                />
                <div className="flex items-center justify-center">
                  <Button type="primary" buttonType="submit">
                    Update phone number
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
        {tab === SETTINGS_TAB_SUBSCRIPTION && (
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
                      canceled. You will receive a prorated refund based on the remaining time on
                      your subscription.
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
        {tab === SETTINGS_TAB_ACCOUNT && (
          <div className="flex w-full flex-col items-center justify-center space-y-4 py-4">
            <div className="flex w-96 flex-col items-center justify-center space-y-5">
              <TextSeparator className="w-full">Change password</TextSeparator>
              <form className="w-full space-y-4" onSubmit={changePassword}>
                <Input
                  id="newPassword"
                  className="w-full"
                  labelText="New Password"
                  type="password"
                  placeholder="••••••••••••"
                  value={newPassword}
                  required
                  isError={isErrorNewPassword}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                  errorText="The password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character."
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    setIsErrorNewPassword(!validatePassword(e.target.value));
                  }}
                />
                <Input
                  id="newConfirmPassword"
                  className="w-full"
                  labelText="Confirm New Password"
                  type="password"
                  placeholder="••••••••••••"
                  value={confirmNewPassword}
                  required
                  isError={isErrorConfirmNewPassword}
                  errorText="The passwords do not match."
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                    setIsErrorConfirmNewPassword(e.target.value !== newPassword);
                  }}
                />
                <div className="flex items-center justify-center">
                  <Button type="primary" buttonType="submit">
                    Change password
                  </Button>
                </div>
              </form>
            </div>
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
    </>
  );
}
