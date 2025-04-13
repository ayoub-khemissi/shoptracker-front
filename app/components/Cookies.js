"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import Title from "./Title";
import Button from "./Button";
import TextNormal from "./TextNormal";
import UnderlineLink from "./UnderlineLink";
import { usePathname } from "next/navigation";

const Cookies = () => {
  const [cookieModalVisible, setCookieModalVisible] = useState(false);
  const currentPathname = usePathname();

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    setCookieModalVisible(!consent);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", true);
    setCookieModalVisible(false);
  };

  if (currentPathname === "/privacy-policy") {
    return null;
  }

  return (
    <Modal
      isVisible={cookieModalVisible}
      onClose={() => {
        setCookieModalVisible(false);
      }}
      isClosable={false}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <Title className="text-center text-2xl">
          We Only Use
          <br />
          <span className="text-secondary">Essential Cookies</span>!
        </Title>
        <TextNormal className="py-4">
          At ShopTracker, your privacy is our priority. We only use cookies necessary for secure
          login, navigation, and maintaining your preferences.
          <br />
          <br />
          Rest assured, we don't use tracking or advertising cookies.
          <br />
          <br />
          By continuing to use ShopTracker, you consent to the use of these essential cookies and
          agree to our <br />
          <UnderlineLink href="/privacy-policy" className="text-secondary hover:text-tertiary">
            Privacy Policy
          </UnderlineLink>
          .
          <br />
          <br />
          Thank you for trusting ShopTracker!
        </TextNormal>
        <div className="flex items-center justify-center">
          <Button type="primary" onClick={handleAcceptCookies} className="self-end">
            Let's track!
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Cookies;
