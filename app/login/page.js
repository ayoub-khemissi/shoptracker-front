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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <Title className="text-center text-4xl">Sign In</Title>
        <CircleButton onClick={() => {}}>
          <Image src={GoogleLogoSvg} alt="google sign" />
        </CircleButton>
        <TextSeparator className="w-full">Or</TextSeparator>
        <Input
          className="w-full"
          labelText="Email"
          type="email"
          placeholder="xyz@mail.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          className="w-full"
          labelText="Password"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="flex w-full items-start justify-between">
          <div className="flex w-full flex-col space-y-4">
            <TextNormal>
              Don't have an account yet? <UnderlineLink href="/register">Sign Up</UnderlineLink>
            </TextNormal>
            <div>
              <UnderlineLink href="/password-recovery">Forgot password?</UnderlineLink>
            </div>
          </div>
          <Button type="primary" onClick={() => {}}>
            Sign In
          </Button>
        </div>
      </section>
    </div>
  );
}
