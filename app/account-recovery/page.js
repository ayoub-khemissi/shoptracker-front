"use client";

import { fetchData } from "@/modules/Fetch";
import Button from "../components/Button";
import Input from "../components/Input";
import TextNormal from "../components/TextNormal";
import Title from "../components/Title";
import { validatePassword } from "@/modules/DataValidation";
import { useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { useRouter } from "next/navigation";
import Section from "../components/Section";

const PHASE_INITIAL = 0,
  PHASE_CODE = 1,
  PHASE_PASSWORD = 2;

export default function AccountRecovery() {
  const router = useRouter();
  const { showToast } = useToast();
  const [phase, setPhase] = useState(PHASE_INITIAL);
  const [email, setEmail] = useState("");
  const [resetPasswordCode, setResetPasswordCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isErrorNewPassword, setIsErrorNewPassword] = useState(false);
  const [isErrorConfirmNewPassword, setIsErrorConfirmNewPassword] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);

  const handleFormSubmit = (e, phase) => {
    e.preventDefault();

    const selectedFunction = getPasswordFunctionByPhase(phase);

    if (selectedFunction) {
      selectedFunction();
    }
  };

  const passwordCodeGenerate = async () => {
    const response = await fetchData("/password/code/generate", "POST", {
      email: email,
    });

    switch (response?.status) {
      case 200:
        setPhase(PHASE_CODE);
        showToast("Code sent successfully! 🎉", "success");
        break;

      case 404:
        showToast("Email not found.", "error");
        break;

      default:
        showToast("An error occurred. Please try again later.", "error");
        break;
    }
  };

  const passwordCodeVerify = async () => {
    const response = await fetchData("/password/code/verify", "POST", {
      email: email,
      resetPasswordCode: resetPasswordCode,
    });

    switch (response?.status) {
      case 200:
        setPhase(PHASE_PASSWORD);
        showToast("Code verified successfully, one more step! 🎉", "success");
        break;

      case 400:
        showToast("Invalid code, please try again.", "error");
        break;

      default:
        showToast("An error occurred. Please try again later.", "error");
        break;
    }
  };

  const passwordReset = async () => {
    if (newPassword !== confirmNewPassword) {
      showToast("Passwords do not match.", "error");
      setIsErrorConfirmNewPassword(true);
      return;
    }

    const response = await fetchData("/password/code/reset", "PATCH", {
      email: email,
      resetPasswordCode: resetPasswordCode,
      newPassword: newPassword,
    });

    switch (response?.status) {
      case 200:
        showToast("Password reset successfully! 🎉", "success");

        setEmail("");
        setNewPassword("");
        setConfirmNewPassword("");
        setIsErrorEmail(false);
        setIsErrorNewPassword(false);
        setIsErrorConfirmNewPassword(false);

        router.push("/login");
        break;

      case 400:
        showToast("Invalid data, please try again.", "error");
        break;

      default:
        showToast("An error occurred. Please try again later.", "error");
        break;
    }
  };

  const getButtonTextByPhase = (phase) => {
    switch (phase) {
      case PHASE_INITIAL:
        return "Send code";
      case PHASE_CODE:
        return "Reset password";
      case PHASE_PASSWORD:
        return "Change password";
    }
  };

  const getPasswordFunctionByPhase = (phase) => {
    switch (phase) {
      case PHASE_INITIAL:
        return passwordCodeGenerate;

      case PHASE_CODE:
        return passwordCodeVerify;

      case PHASE_PASSWORD:
        return passwordReset;

      default:
        return null;
    }
  };

  return (
    <>
      <title>Account Recovery</title>
      <meta
        name="description"
        content="Account recovery page for ShopTracker. This page allows users to reset their password or recover their account."
      />
      <Section>
        <div className="flex items-center justify-center pb-3">
          <Title className="relative inline-block pb-2 text-3xl lg:text-4xl">
            🤔 Account Recovery
            <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-gradient-to-r from-secondary via-tertiary to-quaternary"></div>
          </Title>
        </div>
        <div className="flex w-full items-center justify-center">
          <div className="flex max-w-[512px] flex-col space-y-4 self-center">
            <TextNormal>
              To recover your account, please enter your email address below. We will send you a
              code to reset your password.
            </TextNormal>
            <form className="w-full space-y-4" onSubmit={(e) => handleFormSubmit(e, phase)}>
              <Input
                id="email"
                className="w-full"
                labelText="Email"
                type="email"
                placeholder="xyz@mail.com"
                value={email}
                required
                isError={isErrorEmail}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsErrorEmail(false);
                }}
              />
              {phase === PHASE_CODE && (
                <>
                  <TextNormal>
                    We have sent you a code to your email. Please enter the code below to reset your
                    password.
                  </TextNormal>
                  <Input
                    id="resetPasswordCode"
                    type="text"
                    placeholder="Enter the code"
                    labelText="Code"
                    value={resetPasswordCode}
                    onChange={(e) => setResetPasswordCode(e.target.value)}
                  />
                </>
              )}
              {phase === PHASE_PASSWORD && (
                <>
                  <TextNormal>Please enter a new password for your account.</TextNormal>
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
                </>
              )}
              <div className="flex items-center justify-end">
                <Button type="primary" buttonType="submit">
                  {getButtonTextByPhase(phase)}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
