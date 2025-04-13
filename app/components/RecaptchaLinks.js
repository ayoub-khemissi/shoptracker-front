"use client";

import TextNormal from "./TextNormal";
import UnderlineLink from "./UnderlineLink";

const RecaptchaLinks = () => {
  return (
    <TextNormal className="w-full text-center text-sm text-gray-300">
      This site is protected by reCAPTCHA and the Google{" "}
      <UnderlineLink href="https://policies.google.com/privacy" target="_blank">
        Privacy Policy
      </UnderlineLink>{" "}
      and{" "}
      <UnderlineLink href="https://policies.google.com/terms" target="_blank">
        Terms of Service
      </UnderlineLink>{" "}
      apply.
    </TextNormal>
  );
};

export default RecaptchaLinks;
