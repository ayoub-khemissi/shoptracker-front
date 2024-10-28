"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import TextNormal from "../components/TextNormal";
import Title from "../components/Title";

export default function Privacy() {
  return (
    <div className="flex h-full flex-col space-x-0 space-y-4 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:space-x-20 lg:px-40">
      <Title className="pb-6 text-center text-4xl text-secondary">Privacy Policy</Title>
      <TextNormal>
        Your privacy is important to us. This policy explains how we collect, use, and protect your
        personal data.
      </TextNormal>

      <Accordion>
        <AccordionItem key="1" aria-label="Data Collection" title="1. Data Collection">
          When you sign up using Google, we only collect your email address. We do not collect any
          other personal information.
        </AccordionItem>

        <AccordionItem key="2" aria-label="Data Usage" title="2. Data Usage">
          Your email address is used solely for account creation and communication regarding your
          subscription and service updates.
        </AccordionItem>

        <AccordionItem key="3" aria-label="Data Retention" title="3. Data Retention">
          We retain your personal data as long as your account is active or as needed to provide you
          with our services.
        </AccordionItem>

        <AccordionItem key="4" aria-label="User Rights" title="4. User Rights">
          You have the right to access, correct, or delete your personal data at any time.
        </AccordionItem>

        <AccordionItem key="5" aria-label="Security" title="5. Security">
          We implement appropriate technical and organizational measures to protect your personal
          data from unauthorized access, loss, or misuse.
        </AccordionItem>

        <AccordionItem key="6" aria-label="Cookie Policy" title="6. Cookie Policy">
          Our cookie policy is to use only essential cookies for functionality purposes. We do not
          use any tracking or advertising cookies.
        </AccordionItem>
      </Accordion>
    </div>
  );
}
