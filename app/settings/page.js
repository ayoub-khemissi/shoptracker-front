"use client";

import { useEffect, useState } from "react";
import Button from "../components/Button";
import TextLabel from "../components/TextLabel";
import TextSeparator from "../components/TextSeparator";
import Switch from "../components/Switch";
import Subscription from "../components/Subscription";
import Section from "../components/Section";
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
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isErrorNewPassword, setIsErrorNewPassword] = useState(false);
  const [isErrorConfirmNewPassword, setIsErrorConfirmNewPassword] = useState(false);
  const [phone, setPhone] = useState(user?.phone);
  const [isErrorPhone, setIsErrorPhone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    setTab(currentTab || SETTINGS_TAB_NOTIFICATIONS);
  }, [searchParams]);

  const updatePhone = async (e) => {
    e.preventDefault();

    const response = await fetchData("/phone/update", "PATCH", {
      phone: phone,
    });

    switch (response?.status) {
      case 200: {
        user.phone = phone;
        saveUser(user);
        setIsErrorPhone(false);
        showToast("Phone number saved! 🥳", "success");
        break;
      }

      case 400:
        setIsErrorPhone(true);
        showToast("Invalid phone number, please try again.", "error");
        return;

      case 409:
        setIsErrorPhone(true);
        showToast("This phone number is already taken.", "error");
        return;

      default:
        showToast(
          "An error occurred while saving your phone number. Please try again later.",
          "error",
        );
    }
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
      case 200: {
        if (await fetchLogout()) {
          showToast("Your account has been deleted. 👋😔", "info");
          localLogout();
          router.push("/");
        } else {
          showToast("Failed to delete your account. Please try again later.", "error");
        }
        break;
      }

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
      <Section>
        <div className="flex items-center justify-center pb-3">
          <Title className="relative inline-block pb-2 text-3xl lg:text-4xl">
            ⚙️ Settings
            <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-gradient-to-r from-secondary via-tertiary to-quaternary"></div>
          </Title>
        </div>
        <div className="flex flex-wrap items-center justify-center pb-3 sm:flex-nowrap sm:space-x-4">
          <Button
            locked
            className={`m-1 transition-all duration-300 ${tab === SETTINGS_TAB_NOTIFICATIONS ? "shadow-lg shadow-secondary/10" : ""}`}
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
            className={`m-1 transition-all duration-300 ${tab === SETTINGS_TAB_SUBSCRIPTION ? "shadow-lg shadow-secondary/10" : ""}`}
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
            className={`m-1 transition-all duration-300 ${tab === SETTINGS_TAB_ACCOUNT ? "shadow-lg shadow-secondary/10" : ""}`}
            type={tab === SETTINGS_TAB_ACCOUNT ? "primary" : "contrast"}
            defaultCursor
            onClick={() => {
              router.push(`/settings?tab=${SETTINGS_TAB_ACCOUNT}`);
            }}
          >
            Account
          </Button>
        </div>
        <div className="relative overflow-hidden rounded-2xl lg:p-8">
          <div className="relative z-10">
            {tab === SETTINGS_TAB_NOTIFICATIONS && (
              <div className="flex flex-wrap items-start justify-evenly gap-y-4">
                <div className="w-full max-w-md space-y-6 rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm">
                  <TextSeparator className="text-lg font-medium">
                    Notification Methods
                  </TextSeparator>
                  <div className="space-y-4">
                    <div
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
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
                      <TextLabel className="transition-colors duration-300 group-hover:text-secondary">
                        By text message
                      </TextLabel>
                      <Switch checked={notificationTextMessage} opacityWhenOff />
                    </div>

                    <div
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                      onClick={() => {
                        if (notificationMailbox && !notificationTextMessage) {
                          showToast("You must choose at least one notification method.", "error");
                          return;
                        }

                        setNotificationMailbox(!notificationMailbox);
                      }}
                    >
                      <TextLabel className="transition-colors duration-300 group-hover:text-secondary">
                        In your mailbox
                      </TextLabel>
                      <Switch checked={notificationMailbox} opacityWhenOff />
                    </div>
                    <div className="flex w-full flex-wrap items-center justify-center gap-4">
                      <Button
                        type="quaternary"
                        onClick={updateNotifications}
                        className="transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20"
                      >
                        Save notifications
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-md space-y-6 rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm">
                  <TextSeparator className="text-lg font-medium">
                    Whatsapp Phone Number
                  </TextSeparator>
                  <form className="space-y-4" onSubmit={updatePhone}>
                    <Input
                      id="phone"
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 transition-all duration-300 hover:border-white/30 focus:border-secondary/50 focus:bg-white/10"
                      labelText="Whatsapp Phone Number"
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
                    <div className="flex w-full flex-wrap items-center justify-center gap-4">
                      <Button
                        type="quaternary"
                        buttonType="submit"
                        className="transition-all duration-300 hover:shadow-lg hover:shadow-quaternary/20"
                      >
                        Update phone number
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {tab === SETTINGS_TAB_SUBSCRIPTION && (
              <div className="flex flex-wrap items-start justify-center">
                <Subscription />
              </div>
            )}

            {tab === SETTINGS_TAB_ACCOUNT && (
              <div className="flex flex-wrap items-start justify-evenly gap-y-4">
                <div className="w-full max-w-md space-y-6 rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm">
                  <TextSeparator className="text-lg font-medium">Change Password</TextSeparator>
                  <form className="space-y-4" onSubmit={changePassword}>
                    <Input
                      id="email"
                      className="w-full cursor-not-allowed rounded-xl border border-white/20 bg-white/5 px-4 py-3"
                      labelText="Email"
                      type="email"
                      value={user?.email}
                      disabled
                    />
                    <Input
                      id="newPassword"
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 transition-all duration-300 hover:border-white/30 focus:border-secondary/50 focus:bg-white/10"
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
                      className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 transition-all duration-300 hover:border-white/30 focus:border-secondary/50 focus:bg-white/10"
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
                      <Button
                        type="quaternary"
                        buttonType="submit"
                        className="transition-all duration-300 hover:shadow-lg hover:shadow-quaternary/20"
                      >
                        Change password
                      </Button>
                    </div>
                  </form>
                </div>
                <div className="w-full max-w-md space-y-6 rounded-xl border border-error/30 bg-error/5 p-4 shadow-lg backdrop-blur-sm">
                  <TextSeparator className="text-lg font-medium text-error">
                    Danger Zone
                  </TextSeparator>
                  <div className="flex items-center justify-center p-4">
                    <Button type="secondary" onClick={() => setDeleteAccountModalVisible(true)}>
                      Delete account
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Modal
          isVisible={deleteAccountModalVisible}
          onClose={() => {
            setDeleteAccountModalVisible(false);
          }}
          className="rounded-2xl border border-white/10 bg-contrast/95 shadow-2xl backdrop-blur-lg"
        >
          <div className="space-y-6 p-4">
            <Title className="text-center text-xl text-error">
              Are you sure you want to delete your account?
            </Title>
            <TextNormal className="text-center">
              This action cannot be undone. All of your data will be permanently deleted within 30
              days.
            </TextNormal>
            <div className="flex w-full flex-wrap items-center justify-center gap-4 md:justify-between">
              <Button
                type="quaternary"
                onClick={() => {
                  setDeleteAccountModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button type="secondary" onClick={deleteAccount}>
                Delete Permanently
              </Button>
            </div>
          </div>
        </Modal>
      </Section>
    </>
  );
}
