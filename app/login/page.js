"use client";

import { useState } from "react";
import Title from "../components/Title";
import ShopTrackerLogo from "../components/ShopTrackerLogo";
import TextNormal from "../components/TextNormal";
import CircleButton from "../components/CircleButton";
import TextSeparator from "../components/TextSeparator";
import Input from "../components/Input";
import Button from "../components/Button";
import UnderlineLink from "../components/UnderlineLink";
import Image from "next/image";
import GoogleLogoSvg from "../../public/assets/svg/icons/google-logo.svg";
import { fetchData } from "@/modules/Fetch";
import { useAuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const { localLogin } = useAuthContext();
  const { showToast } = useToast();

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const response = await fetchData("/login/classical", "POST", {
      email: email,
      password: password,
    });

    if (!response || !response.status) {
      setIsErrorEmail(false);
      setIsErrorPassword(false);
      showToast("An error occurred. Please try again later.", "error");
      return;
    }

    switch (response.status) {
      case 200:
        showToast("Logged in successfully!", "success");
        setIsErrorEmail(false);
        setIsErrorPassword(false);
        localLogin((await response.json()).data);
        break;

      case 400:
      case 404:
        setIsErrorEmail(true);
        setIsErrorPassword(true);
        showToast("Incorrect email or password.", "error");
        break;

      default:
        setIsErrorEmail(false);
        setIsErrorPassword(false);
        showToast("An error occurred. Please try again later.", "error");
        break;
    }
  };

  return (
    <div className="h-full space-x-0 space-y-4 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:flex lg:space-x-20 lg:space-y-0 lg:px-40">
      <section className="hidden justify-center space-y-4 text-center lg:flex lg:w-1/2 lg:flex-col lg:text-left">
        <ShopTrackerLogo className="text-5xl" />
        <TextNormal className="text-3xl">
          Get an alert on the availability and{" "}
          <span className="text-secondary transition duration-200 hover:text-tertiary">
            price drop of your favorite products
          </span>
          !
        </TextNormal>
      </section>
      <section className="flex flex-col items-center space-y-4 lg:w-1/2">
        <Title className="text-center text-2xl lg:text-4xl">Sign In</Title>
        <CircleButton>
          <Image className="h-6 w-6" src={GoogleLogoSvg} alt="google sign" />
        </CircleButton>
        <TextSeparator className="w-full">Or</TextSeparator>
        <form className="w-full space-y-4" onSubmit={handleSubmitLogin}>
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
          <Input
            id="password"
            className="w-full"
            labelText="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            required
            isError={isErrorPassword}
            onChange={(e) => {
              setPassword(e.target.value);
              setIsErrorPassword(false);
            }}
          />
          <div className="flex w-full items-start justify-between">
            <div className="flex w-full flex-col space-y-4">
              <TextNormal>
                Don't have an account yet? <UnderlineLink href="/register">Sign Up</UnderlineLink>
              </TextNormal>
              <div>
                <UnderlineLink href="/account-recovery">Forgot password?</UnderlineLink>
              </div>
            </div>
            <Button buttonType="submit" type="primary">
              Sign In
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
