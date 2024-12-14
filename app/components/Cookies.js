"use client";

import { useState, useEffect } from "react";
import Modal from "./Modal";
import Title from "./Title";
import Button from "./Button";
import TextNormal from "./TextNormal";

const Cookies = () => {
  const [cookieModalVisible, setCookieModalVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    setCookieModalVisible(!consent);
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookieConsent", true);
    setCookieModalVisible(false);
  };

  return (
    <Modal
      isVisible={cookieModalVisible}
      onClose={() => {
        setCookieModalVisible(false);
      }}
      isClosable={false}
    >
      <Title className="pb-4 text-center text-2xl">
        We Only Use
        <br />
        <span className="text-secondary">Essential Cookies</span>!
      </Title>
      <TextNormal className="pb-4">
        At ShopTracker, your privacy is our priority. We only use cookies necessary for secure
        login, navigation, and maintaining your preferences.
        <br />
        <br />
        Rest assured, we don't use tracking or advertising cookies.
        <br />
        <br />
        Thank you for trusting ShopTracker!
      </TextNormal>
      <div className="flex items-center justify-center">
        <Button type="primary" onClick={handleAcceptCookies} className="self-end">
          Let's track!
        </Button>
      </div>
    </Modal>
  );
};

export default Cookies;
