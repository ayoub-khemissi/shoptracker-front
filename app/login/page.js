"use client";

import { useEffect, useState } from "react";
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
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Section } from "../components/Section";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isGoogleLoginProcessed, setIsGoogleLoginProcessed] = useState(false);

  const { localLogin, localLogout } = useAuthContext();
  const { showToast } = useToast();
  const router = useRouter();

  const { data: session } = useSession();

  const loginGoogle = async ({
    googleEmail,
    googleJwt,
    localLogout,
    localLogin,
    showToast,
    router,
  }) => {
    if (!googleEmail || !googleJwt) {
      localLogout();
      await signOut({ redirect: false });
      return;
    }

    const response = await fetchData("/login/google", "POST", {
      email: googleEmail,
      googleJwt: googleJwt,
    });

    switch (response?.status) {
      case 200:
        showToast("Logged in successfully! 🎉", "success");
        localLogin((await response.json()).data);

        await signOut({ redirect: false });
        router.push("/tracklist");
        break;

      case 404:
        showToast(`User ${googleEmail} not found.`, "error");

        localLogout();
        await signOut({ redirect: false });
        router.refresh();
        break;

      default:
        showToast("An error occurred. Please try again later.", "error");

        localLogout();
        await signOut({ redirect: false });
        router.refresh();
        break;
    }
  };

  useEffect(() => {
    if (session && session.user && session.googleJwt && !isGoogleLoginProcessed) {
      const { user, googleJwt } = session;

      setIsGoogleLoginProcessed(true);
      loginGoogle({
        googleEmail: user?.email,
        googleJwt,
        localLogout,
        localLogin,
        showToast,
        router,
      });
    }
  }, [session, isGoogleLoginProcessed, localLogout, showToast, localLogin, router]);

  const loginClassical = async (e) => {
    e.preventDefault();

    const response = await fetchData("/login/classical", "POST", {
      email: email,
      password: password,
    });

    switch (response?.status) {
      case 200:
        showToast("Logged in successfully! 🎉", "success");
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
    <>
      <title>Sign In</title>
      <meta
        name="description"
        content="Sign in page for ShopTracker. This page allows users to log in to their account."
      />
      <Section>
        <div className="flex items-center justify-center">
          <div className="hidden justify-center space-y-4 text-center lg:flex lg:w-1/2 lg:flex-col lg:text-left">
            <ShopTrackerLogo className="text-5xl" />
            <TextNormal className="text-3xl">
              Get an alert on the availability and{" "}
              <span className="text-secondary transition duration-200 hover:text-tertiary">
                price drop of your favorite products
              </span>
              !
            </TextNormal>
          </div>
          <div className="flex w-full flex-col items-center space-y-4 lg:w-1/2">
            <Title className="text-center text-2xl lg:text-4xl">Sign In</Title>
            <CircleButton
              onClick={() => {
                signIn("google", {
                  callbackUrl: "/login",
                });
              }}
            >
              <Image className="h-6 w-6" src={GoogleLogoSvg} alt="google sign" />
            </CircleButton>
            <TextSeparator className="w-full">Or</TextSeparator>
            <form className="w-full space-y-4" onSubmit={loginClassical}>
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
                    Don't have an account yet?{" "}
                    <UnderlineLink href="/register">Sign Up</UnderlineLink>
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
          </div>
        </div>
      </Section>
    </>
  );
}
