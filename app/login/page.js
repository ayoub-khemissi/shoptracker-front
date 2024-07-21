"use client"

import { useState } from "react";
import Title from "../components/Title";
import ShopTrackerLogo from "../components/ShopTrackerLogo";
import TextNormal from "../components/TextNormal";
import CircleButton from "../components/CircleButton";
import OrSeparator from "../components/OrSeparator";
import Input from "../components/Input";
import Button from "../components/Button";
import UnderlineLink from "../components/UnderlineLink";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="lg:flex h-full bg-gradient-to-b from-contrast from-90% to-contrast-alt lg:space-x-20 space-x-0 space-y-4 lg:space-y-0 lg:px-40 lg:py-10 md:px-20 py-8 px-10">
      <section className="lg:flex lg:flex-col justify-center lg:w-1/2 hidden space-y-4 text-center lg:text-left">
        <ShopTrackerLogo className="text-5xl" />
        <TextNormal className="text-3xl">Get an alert on the availability and <span className="text-secondary hover:text-tertiary transition duration-200">price drop of your favorite products</span>!</TextNormal>
      </section>
      <section className="lg:w-1/2 flex flex-col items-center space-y-4">
        <Title className="text-center text-4xl">Sign In</Title>
        <CircleButton onClick={() => { }}><img src="assets/svg/icons/google-logo.svg" /></CircleButton>
        <OrSeparator className="w-full" />
        <Input labelText="Email" type="email" placeholder="xyz@mail.com" value={email} onChange={(e) => { setEmail(e.target.value); }} />
        <Input labelText="Password" type="password" placeholder="••••••••••••" value={password} onChange={e => { setPassword(e.target.value); }} />
        <div className="flex justify-between items-start w-full">
          <div className="flex flex-col w-full space-y-4">
            <TextNormal>Don't have an account yet? <UnderlineLink href="/register">Sign Up</UnderlineLink></TextNormal>
            <div>
              <UnderlineLink href="/password-recovery">Forgot password?</UnderlineLink>
            </div>
          </div>
          <Button type="primary" onClick={() => { }}>Sign In</Button>
        </div>
      </section>
    </div>
  );
}
