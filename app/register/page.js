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
import Section from "../components/Section";
import Image from "next/image";
import GoogleLogoSvg from "../../public/assets/svg/icons/google-logo.svg";
import { fetchData } from "@/modules/Fetch";
import { useAuthContext } from "../contexts/AuthContext";
import { useToast } from "../contexts/ToastContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { validatePassword } from "@/modules/DataValidation";
import { Checkbox } from "@nextui-org/react";
import { useReCaptcha } from "next-recaptcha-v3";
import RecaptchaLinks from "../components/RecaptchaLinks";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const [isGoogleLoginProcessed, setIsGoogleLoginProcessed] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const { localLogin, localLogout } = useAuthContext();
  const { showToast } = useToast();
  const router = useRouter();
  const { executeRecaptcha } = useReCaptcha();

  const { data: session } = useSession();

  const registerGoogle = async ({
    googleEmail,
    googleJwt,
    localLogout,
    localLogin,
    showToast,
    router,
    referrerCode,
  }) => {
    if (!googleEmail || !googleJwt) {
      localLogout();
      await signOut({ redirect: false });
      return;
    }

    const response = await fetchData("/register/google", "POST", {
      email: googleEmail,
      googleJwt: googleJwt,
      referrerCode: referrerCode,
    });

    switch (response?.status) {
      case 200:
      case 201:
        showToast("Registered successfully! 🎉", "success");
        localLogin((await response.json()).data);

        await signOut({ redirect: false });
        router.push("/pricing");
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
      const referrerCode = localStorage.getItem("referrerCode");

      setIsGoogleLoginProcessed(true);
      registerGoogle({
        googleEmail: user?.email,
        googleJwt,
        localLogout,
        localLogin,
        showToast,
        router,
        referrerCode,
      });
    }
  }, [session, isGoogleLoginProcessed, localLogout, showToast, localLogin, router]);

  const registerClassical = async (e) => {
    e.preventDefault();

    const recaptchaToken = await executeRecaptcha("register");

    if (!recaptchaToken) {
      showToast("Please wait for reCAPTCHA verification.", "info");
      return;
    }

    if (!validatePassword(password)) {
      setIsErrorPassword(true);
      return;
    }

    if (!isTermsAccepted) {
      showToast("Please accept the terms and conditions.", "error");
      return;
    }

    const referrerCode = localStorage.getItem("referrerCode");

    const response = await fetchData("/register/classical", "POST", {
      email: email,
      password: password,
      recaptchaToken: recaptchaToken,
      referrerCode: referrerCode,
    });

    switch (response?.status) {
      case 201:
        showToast("Registered successfully! 🎉", "success");
        setIsErrorEmail(false);
        setIsErrorPassword(false);
        localLogin((await response.json()).data);
        router.push("/pricing");
        break;

      case 400:
      case 404:
        setIsErrorEmail(true);
        showToast("Incorrect email or password.", "error");
        break;

      case 409:
        setIsErrorEmail(true);
        showToast("This email is already taken.", "error");
        break;

      default:
        setIsErrorEmail(false);
        showToast("An error occurred. Please try again later.", "error");
        break;
    }
  };

  return (
    <>
      <title>Sign Up | ShopTracker</title>
      <meta
        name="description"
        content="Sign up page for ShopTracker. This page allows users to create an account and sign up for the service."
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
            <Title className="text-center text-2xl lg:text-4xl">Sign Up</Title>
            <CircleButton
              onClick={() => {
                if (!isTermsAccepted) {
                  showToast("Please accept the terms and conditions.", "error");
                  return;
                }

                signIn("google", {
                  callbackUrl: "/register",
                });
              }}
            >
              <Image className="h-6 w-6" src={GoogleLogoSvg} alt="google sign" />
            </CircleButton>
            <TextSeparator className="w-full">Or</TextSeparator>
            <form className="w-full space-y-4" onSubmit={registerClassical}>
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
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$"
                errorText="The password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character."
                onChange={(e) => {
                  setPassword(e.target.value);
                  setIsErrorPassword(!validatePassword(e.target.value));
                }}
              />
              <div className="flex w-full items-start justify-between">
                <div className="flex w-2/3 flex-col space-y-4">
                  <Checkbox
                    defaultSelected
                    color="warning"
                    isRequired
                    required
                    aria-required
                    isSelected={isTermsAccepted}
                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                  >
                    By signing up, you agree to our{" "}
                    <UnderlineLink href="/terms-of-service">Terms of Service</UnderlineLink> and{" "}
                    <UnderlineLink href="/privacy-policy">GDPR Privacy Policy</UnderlineLink>.
                  </Checkbox>
                </div>
                <div className="flex w-1/3 items-center justify-end">
                  <Button buttonType="submit" type="quaternary">
                    Sign Up
                  </Button>
                </div>
              </div>
            </form>
            <TextNormal className="text-center">
              Already have an account?{" "}
              <UnderlineLink href="/login" className="text-secondary hover:text-tertiary">
                Sign In
              </UnderlineLink>
            </TextNormal>
            <RecaptchaLinks />
          </div>
        </div>
      </Section>
    </>
  );
}
