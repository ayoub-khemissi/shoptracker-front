"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import TextNormal from "../components/TextNormal";
import Title from "../components/Title";
import UnderlineLink from "../components/UnderlineLink";
import { NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL } from "@/utils/Config";

export default function Privacy() {
  return (
    <>
      <title>Privacy Policy</title>
      <meta
        name="description"
        content="Privacy policy page for ShopTracker. This page explains how we collect, use, and protect your personal data."
      />
      <div className="flex h-full flex-col space-x-0 space-y-4 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:space-x-20 lg:px-40">
        <Title className="pb-6 text-center text-4xl text-secondary">Privacy Policy</Title>
        <TextNormal>
          Your privacy is important to us. This policy explains how we collect, use, and protect
          your personal data.
        </TextNormal>

        <Accordion>
          <AccordionItem key="1" aria-label="Introduction" title="Introduction">
            At ShopTracker, we are committed to protecting your privacy and ensuring compliance with
            the General Data Protection Regulation (GDPR). This Privacy Policy explains how we
            collect, use, store, and protect your personal data.
          </AccordionItem>

          <AccordionItem key="2" aria-label="Data We Collect" title="1. Data We Collect">
            <TextNormal>1.1 Personal Data</TextNormal>
            <ul className="ml-4 list-disc">
              <li>
                <strong>Email Address</strong>: Mandatory for account creation and service
                notifications.
              </li>
              <li>
                <strong>Phone Number</strong>: Optional, used for WhatsApp or SMS notifications
                about restocks or price drops.
              </li>
            </ul>
            <TextNormal>1.2 Cookies</TextNormal>
            We use only essential cookies for:
            <ul className="ml-4 list-disc">
              <li>Authentication and login.</li>
              <li>User preferences and session management.</li>
            </ul>
            No third-party tracking cookies are employed.
          </AccordionItem>

          <AccordionItem
            key="3"
            aria-label="Purpose of Data Collection"
            title="2. Purpose of Data Collection"
          >
            Your data is collected to:
            <ul className="ml-4 list-disc">
              <li>Provide core functionalities of the ShopTracker service.</li>
              <li>Notify you about restocks, price drops, or service updates.</li>
              <li>Send promotional emails if you have explicitly consented.</li>
              <li>Ensure compliance with applicable laws and regulations.</li>
            </ul>
          </AccordionItem>

          <AccordionItem
            key="4"
            aria-label="Data Storage and Retention"
            title="3. Data Storage and Retention"
          >
            <TextNormal>3.1 Storage Location</TextNormal>
            Your data is securely stored on AWS servers located within the European Union.
            Notifications are sent via trusted third-party services:
            <ul className="ml-4 list-disc">
              <li>
                <strong>Twilio</strong> for WhatsApp or SMS notifications.
              </li>
              <li>
                <strong>Brevo</strong> for email communications.
              </li>
            </ul>
            <TextNormal>3.2 Retention Period</TextNormal>
            <ul className="ml-4 list-disc">
              <li>
                <strong>Active Accounts</strong>: Data is retained for as long as your account
                remains active.
              </li>
              <li>
                <strong>Inactive Accounts</strong>: Data is retained for up to 3 years after your
                last activity, unless you request deletion.
              </li>
              <li>
                <strong>Deleted Accounts</strong>: Data is erased within 30 days of account
                deletion.
              </li>
            </ul>
          </AccordionItem>

          <AccordionItem key="5" aria-label="Data Security" title="4. Data Security">
            We implement standard technical and organizational measures to protect your data against
            unauthorized access, disclosure, alteration, or destruction. These include:
            <ul className="ml-4 list-disc">
              <li>Restricted access to databases.</li>
              <li>Secure password hashing.</li>
              <li>Regular security audits.</li>
            </ul>
          </AccordionItem>

          <AccordionItem key="6" aria-label="Your Rights" title="5. Your Rights">
            As a user, you have the following rights under the GDPR:
            <ul className="ml-4 list-disc">
              <li>
                <strong>Access</strong>: Request a copy of your personal data.
              </li>
              <li>
                <strong>Rectification</strong>: Correct inaccuracies in your data.
              </li>
              <li>
                <strong>Deletion</strong>: Delete your data via your account settings or by
                contacting us.
              </li>
              <li>
                <strong>Data Portability</strong>: Request your data in a portable format.
              </li>
              <li>
                <strong>Objection and Restriction</strong>: Object to certain data uses or restrict
                data processing.
              </li>
            </ul>
            To exercise these rights, contact us at{" "}
            <UnderlineLink href={`mailto:${NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL}`}>
              {NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL}
            </UnderlineLink>
            .
          </AccordionItem>

          <AccordionItem key="7" aria-label="Minors" title="6. Minors">
            ShopTracker allows access to minors but requires parental consent for users under the
            age of 16. Parents or guardians may contact us to manage or delete the account of a
            minor.
          </AccordionItem>

          <AccordionItem
            key="8"
            aria-label="Data Transfers Outside the EU"
            title="7. Data Transfers Outside the EU"
          >
            We work with trusted partners, such as Twilio and Brevo, who may process data outside
            the European Union. These partners adhere to GDPR standards through mechanisms like{" "}
            <strong>Standard Contractual Clauses (SCC)</strong> to ensure your data is handled
            securely.
          </AccordionItem>

          <AccordionItem key="9" aria-label="Data Breach Response" title="8. Data Breach Response">
            In the event of a data breach, we will:
            <ul className="ml-4 list-disc">
              <li>Notify affected users within 72 hours.</li>
              <li>
                Provide details on the nature of the breach, the data affected, and steps to
                mitigate risks.
              </li>
              <li>Offer guidance on how to protect your account.</li>
            </ul>
          </AccordionItem>

          <AccordionItem key="10" aria-label="Contact Information" title="9. Contact Information">
            If you have any questions or concerns about this Privacy Policy or our data practices,
            contact us at:
            <ul className="ml-4 list-disc">
              <li>
                <strong>Email</strong>:{" "}
                <UnderlineLink href={`mailto:${NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL}`}>
                  {NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL}
                </UnderlineLink>
              </li>
              <li>
                <strong>Mailing Address</strong>: ShopTracker, Paris, France
              </li>
            </ul>
          </AccordionItem>

          <AccordionItem
            key="11"
            aria-label="Updates to This Policy"
            title="Updates to This Policy"
          >
            We reserve the right to update this Privacy Policy at any time. Significant changes will
            be communicated via email or through your user dashboard. Continued use of the service
            after updates constitutes acceptance of the revised policy.
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
