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
import {
  subscribeToBrowserNotification,
  unsubscribeFromBrowserNotification,
} from "@/modules/BrowserNotification";

const { SETTINGS_TAB_NOTIFICATIONS, SETTINGS_TAB_ACCOUNT, SETTINGS_TAB_SUBSCRIPTION } = Constants;

export default function Settings() {
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(searchParams.get("tab") || SETTINGS_TAB_NOTIFICATIONS);
  const { showToast } = useToast();
  const { user, localLogout, saveUser } = useAuthContext();
  const [alertEmail, setAlertEmail] = useState(!!user?.alert_email);
  const [alertSms, setAlertSms] = useState(!!user?.alert_sms);
  const [alertBrowser, setAlertBrowser] = useState(!!user?.alert_browser);
  const [alertPush, setAlertPush] = useState(!!user?.alert_push);
  const [marketingEmail, setMarketingEmail] = useState(!!user?.marketing_email);
  const [alertBrowserSubscription, setAlertBrowserSubscription] = useState(
    user?.alert_browser_subscription || null,
  );
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isErrorNewPassword, setIsErrorNewPassword] = useState(false);
  const [isErrorConfirmNewPassword, setIsErrorConfirmNewPassword] = useState(false);
  const [phone, setPhone] = useState(user?.phone);
  const [isErrorPhone, setIsErrorPhone] = useState(false);
  const [isErrorVerifyPhone, setIsErrorVerifyPhone] = useState(false);
  const [phoneStep, setPhoneStep] = useState("enter");
  const [verifyPhoneCode, setVerifyPhoneCode] = useState("");
  const [isSendingCode, setIsSendingCode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentTab = searchParams.get("tab");
    setTab(currentTab || SETTINGS_TAB_NOTIFICATIONS);
  }, [searchParams]);

  const sendPhoneVerificationCode = async () => {
    if (!validatePhone(phone)) {
      showToast("Invalid phone number, please try again.", "error");
      setIsErrorPhone(true);
      return;
    }

    setIsSendingCode(true);
    const response = await fetchData("/phone/code/generate", "POST", { phone });
    setIsSendingCode(false);

    switch (response?.status) {
      case 200: {
        setPhoneStep("verify");
        showToast("Verification code sent on WhatsApp!", "success");
        break;
      }

      case 400:
        setIsErrorPhone(true);
        showToast("Invalid phone number, please try again.", "error");
        break;

      case 409:
        setIsErrorPhone(true);
        showToast("This phone number is already taken.", "error");
        break;

      case 429: {
        const msg = (await response.json()).msg;
        showToast(msg, "info");
        setPhoneStep("verify");
        break;
      }

      default:
        showToast(
          "An error occurred while sending verification code. Please try again later.",
          "error",
        );
        break;
    }
  };

  const verifyPhoneCodeHandler = async (e) => {
    e.preventDefault();

    if (verifyPhoneCode.length < 6) {
      showToast("Invalid verification code, please try again.", "error");
      setIsErrorVerifyPhone(true);
      return;
    }
    const response = await fetchData("/phone/code/verify", "POST", {
      verifyPhoneCode,
    });

    switch (response?.status) {
      case 200: {
        setPhoneStep("enter");
        setVerifyPhoneCode("");

        setAlertSms(true);
        user.alert_sms = true;
        user.phone = phone;
        saveUser(user);

        showToast("Phone number verified successfully 🎉", "success");
        break;
      }

      case 400:
        setIsErrorVerifyPhone(true);
        showToast("Invalid verification code, please try again.", "error");
        break;

      case 409:
        setPhoneStep("enter");
        setIsErrorPhone(true);
        showToast("This phone number is already taken.", "error");
        break;

      default:
        showToast(
          "An error occurred while verifying phone number. Please try again later.",
          "error",
        );
        break;
    }
  };

  const updateNotifications = async () => {
    const response = await fetchData("/notifications/update", "PATCH", {
      alertEmail: alertEmail,
      alertSms: alertSms,
      alertBrowser: alertBrowser,
      alertPush: alertPush,
      alertBrowserSubscription: alertBrowserSubscription,
      alertPushSubscription: user?.alert_push_subscription || null,
    });

    if (!response || response.status !== 200) {
      showToast(
        "An error occurred while saving your notifications settings. Please try again later.",
        "error",
      );
      return;
    }

    user.alert_email = alertEmail;
    user.alert_sms = alertSms;
    user.alert_browser = alertBrowser;
    user.alert_push = alertPush;
    user.alert_browser_subscription = alertBrowserSubscription;
    user.alert_push_subscription = user?.alert_push_subscription || null;
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

  const handleUpdateMarketingEmail = async (e) => {
    e.preventDefault();

    const response = await fetchData("/update/marketing/email", "PATCH", {
      enabled: marketingEmail,
    });

    switch (response?.status) {
      case 200:
        user.marketing_email = marketingEmail;
        saveUser(user);
        showToast("Marketing preferences updated successfully 🎉", "success");
        break;

      case 400:
      case 401:
        showToast("Invalid token, please try again.", "error");
        break;

      case 404:
      default:
        showToast("Failed to update marketing preferences. Please try again later.", "error");
        break;
    }
  };

  return (
    <>
      <title>Settings | ShopTracker</title>
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
        <div className="relative rounded-2xl">
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
                        if (alertEmail && !alertSms && !alertBrowser && !alertPush) {
                          showToast("You must choose at least one notification method.", "error");
                          return;
                        }

                        setAlertEmail(!alertEmail);
                      }}
                    >
                      <TextLabel className="transition-colors duration-300 group-hover:text-secondary">
                        In your mailbox
                      </TextLabel>
                      <Switch checked={alertEmail} opacityWhenOff />
                    </div>

                    <div
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                      onClick={() => {
                        if (!user?.phone) {
                          showToast(
                            "You must add a phone number to receive text notifications.",
                            "error",
                          );
                          return;
                        }

                        if (alertSms && !alertEmail && !alertBrowser && !alertPush) {
                          showToast("You must choose at least one notification method.", "error");
                          return;
                        }

                        setAlertSms(!alertSms);
                      }}
                    >
                      <TextLabel className="transition-colors duration-300 group-hover:text-secondary">
                        By WhatsApp
                      </TextLabel>
                      <Switch checked={alertSms} opacityWhenOff />
                    </div>

                    <div
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                      onClick={async () => {
                        if (alertBrowser && !alertSms && !alertEmail && !alertPush) {
                          showToast("You must choose at least one notification method.", "error");
                          return;
                        }

                        const subscription = alertBrowser
                          ? await unsubscribeFromBrowserNotification(navigator, window)
                          : await subscribeToBrowserNotification(navigator, window);

                        if (subscription) {
                          setAlertBrowserSubscription(alertBrowser ? null : subscription);
                          setAlertBrowser(!alertBrowser);
                        } else {
                          showToast("Failed to toggle browser notifications", "error");
                        }
                      }}
                    >
                      <TextLabel className="transition-colors duration-300 group-hover:text-secondary">
                        In your browser <span className="text-xs">(mobile & desktop)</span>
                      </TextLabel>
                      <Switch checked={alertBrowser} opacityWhenOff />
                    </div>

                    <div
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 opacity-50 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                      onClick={() => {
                        if (alertPush && !alertSms && !alertEmail && !alertBrowser) {
                          showToast("You must choose at least one notification method.", "error");
                          return;
                        }

                        setAlertPush(false);
                      }}
                    >
                      <TextLabel className="transition-colors duration-300 group-hover:text-secondary">
                        By push notifications{" "}
                        <span className="text-xs text-secondary">(not available)</span>
                      </TextLabel>
                      <Switch checked={alertPush} opacityWhenOff />
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
                <form
                  onSubmit={verifyPhoneCodeHandler}
                  className="w-full max-w-md space-y-6 rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm"
                >
                  <TextSeparator className="text-lg font-medium">
                    Whatsapp Phone Number
                  </TextSeparator>
                  <div className="space-y-4">
                    <Input
                      id="phone"
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
                      disabled={phoneStep === "verify"}
                    />

                    <Input
                      id="verifyPhoneCode"
                      labelText="Verification Code"
                      type="number"
                      min={0}
                      max={999999}
                      pattern="[0-9]{6}"
                      placeholder="Enter 6-digit code"
                      value={verifyPhoneCode}
                      required={phoneStep === "verify"}
                      onChange={(e) => {
                        setVerifyPhoneCode(e.target.value);
                        setIsErrorVerifyPhone(false);
                      }}
                      disabled={phoneStep === "enter"}
                      className={phoneStep === "enter" ? "hidden" : ""}
                      isError={isErrorVerifyPhone}
                      errorText="Please enter the 6-digit code sent on WhatsApp."
                    />

                    <div className="flex items-center justify-center gap-4">
                      {phoneStep === "enter" ? (
                        <Button
                          type="quaternary"
                          onClick={sendPhoneVerificationCode}
                          disabled={isSendingCode || !validatePhone(phone)}
                        >
                          {isSendingCode ? "Sending..." : "Send Code"}
                        </Button>
                      ) : (
                        <>
                          <Button type="secondary" onClick={() => setPhoneStep("enter")}>
                            Change Number
                          </Button>
                          <Button buttonType="submit" type="quaternary">
                            Verify
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </form>
                <form
                  onSubmit={handleUpdateMarketingEmail}
                  className="w-full max-w-md space-y-6 rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm"
                >
                  <TextSeparator className="text-lg font-medium">
                    Marketing preferences
                  </TextSeparator>
                  <div className="space-y-4">
                    <div
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                      onClick={() => setMarketingEmail(!marketingEmail)}
                    >
                      <TextLabel className="transition-colors duration-300 group-hover:text-secondary">
                        In your mailbox
                      </TextLabel>
                      <Switch checked={marketingEmail} opacityWhenOff />
                    </div>
                    <div className="flex w-full flex-wrap items-center justify-center gap-4">
                      <Button
                        type="quaternary"
                        buttonType="submit"
                        className="transition-all duration-300 hover:shadow-lg hover:shadow-secondary/20"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </form>
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
                    <Input id="email" labelText="Email" type="email" value={user?.email} disabled />
                    <Input
                      id="newPassword"
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
                  <div className="flex items-center justify-center">
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
          <div className="space-y-4">
            <Title className="text-center text-xl text-error">
              Are you sure you want to delete your account?
            </Title>
            <TextNormal className="text-center">
              All of your data will be permanently deleted. If you change your mind, you can cancel
              the deletion process by logging in again within 30 days.
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
