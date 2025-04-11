"use client";

import { useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { fetchData } from "@/modules/Fetch";
import Input from "../components/Input";
import Button from "../components/Button";
import UnderlineLink from "../components/UnderlineLink";
import TextNormal from "../components/TextNormal";
import Title from "../components/Title";
import Section from "../components/Section";
import Textarea from "../components/Textarea";
import Spinner from "../components/Spinner";
import { useAuthContext } from "../contexts/AuthContext";
import { NEXT_PUBLIC_RECAPTCHA_SITE_KEY } from "@/utils/Config";
import { useSearchParams } from "next/navigation";
import Script from "next/script";

export default function Contact() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject");

  const mailInfo = () => {
    switch (subjectParam) {
      case "custom-offer":
        return { subject: "I'm interested in a custom offer 💎", content: "" };
      case "support":
        return { subject: "I need some help 🛠️", content: "" };
      case "feedback":
        return { subject: "I have some feedback 📝", content: "" };
      case "bug":
        return { subject: "I ran into a bug ⚠️", content: "" };
      case "other":
        return { subject: "I have a question 🤔", content: "" };
      case "privacy-policy":
        return { subject: "I have a question about privacy policy 🤔", content: "" };
      case "terms-of-sale":
        return { subject: "I have a question about terms of sale 🤔", content: "" };
      case "terms-of-service":
        return { subject: "I have a question about terms of service 🤔", content: "" };
      default:
        return { subject: "", content: "" };
    }
  };

  const { user } = useAuthContext();
  const [email, setEmail] = useState(user?.email || "");
  const [subject, setSubject] = useState(mailInfo().subject);
  const [content, setContent] = useState(mailInfo().content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [isRecaptchaReady, setIsRecaptchaReady] = useState(false);

  const handleRecaptchaLoad = () => {
    setIsRecaptchaReady(true);
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: "contact" })
        .then((token) => setRecaptchaToken(token));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!isRecaptchaReady || !recaptchaToken) {
      showToast("Please wait for reCAPTCHA verification.", "error");
      return;
    }

    try {
      const response = await fetchData("/contact", "POST", {
        email,
        subject,
        content,
        recaptchaToken,
      });

      if (response?.status === 200) {
        showToast("Message sent successfully!", "success");
        setSubject("");
        setContent("");
      } else {
        showToast("An error occurred. Please try again.", "error");
      }
    } catch (error) {
      showToast("Network error. Please check your connection.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section>
      <div className="flex items-center justify-center pb-3">
        <Title className="relative inline-block pb-2 text-3xl lg:text-4xl">
          📩 Contact Us
          <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-gradient-to-r from-secondary via-tertiary to-quaternary"></div>
        </Title>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-md flex-col items-center space-y-6">
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <Input
              id="email"
              labelText="Email"
              type="email"
              placeholder="xyz@mail.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              id="subject"
              labelText="Subject"
              type="text"
              placeholder="Message subject"
              value={subject}
              required
              onChange={(e) => setSubject(e.target.value)}
            />

            <Textarea
              id="content"
              labelText="Message"
              placeholder="Describe your request in detail..."
              value={content}
              required
              rows={6}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex w-full items-center justify-between">
              <TextNormal>
                Return to <UnderlineLink href="/">homepage</UnderlineLink>
              </TextNormal>

              <Button type="primary" buttonType="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : "Send"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        onLoad={handleRecaptchaLoad}
      />
    </Section>
  );
}
