"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import TextNormal from "../components/TextNormal";
import Title from "../components/Title";
import UnderlineLink from "../components/UnderlineLink";
import { NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL } from "@/utils/Config";
import { Section } from "../components/Section";

export default function PrivacyPolicy() {
  return (
    <>
      <title>Privacy Policy</title>
      <meta
        name="description"
        content="Privacy policy page for ShopTracker. This page explains how we collect, use, and protect your personal data."
      />
      <Section>
        <Title className="pb-6 text-center text-2xl lg:text-4xl">🔒 Privacy Policy</Title>
        <TextNormal>
          Your privacy is important to us. This policy explains how we collect, use, and protect
          your personal data, including how we handle information through tools such as Speed
          Insights and Vercel Analytics.
        </TextNormal>

        <Accordion>
          <AccordionItem key="1" aria-label="Introduction" title="Introduction">
            At ShopTracker, we are committed to safeguarding your privacy in accordance with the
            General Data Protection Regulation (GDPR). This Privacy Policy outlines how we gather,
            process, store, and protect your personal information, including data collected through
            our use of Speed Insights and Vercel Analytics.
          </AccordionItem>

          <AccordionItem key="2" aria-label="Data We Collect" title="1. Data We Collect">
            <TextNormal>1.1 Personal Data</TextNormal>
            <ul className="ml-4 list-disc">
              <li>
                <strong>Email Address</strong>: Required for account creation and service
                notifications.
              </li>
              <li>
                <strong>Phone Number</strong>: Optional, used for WhatsApp or SMS notifications
                regarding restocks or price changes.
              </li>
              <li>
                <strong>Tracks</strong>: Information about the products you track, including their
                name, price, and availability status.
              </li>
            </ul>
            <TextNormal>1.2 Cookies and Analytics</TextNormal>
            We use essential cookies as well as tools like Speed Insights and Vercel Analytics to
            gather information on how users interact with our website. This data helps us improve
            the performance and user experience of the platform:
            <ul className="ml-4 list-disc">
              <li>Authentication and login processes.</li>
              <li>User preferences and session management.</li>
              <li>Website performance monitoring and optimization via Vercel Analytics.</li>
            </ul>
            These tools may collect anonymized data, such as page views, traffic sources, and
            performance metrics, but they do not track personal information unless explicitly
            provided.
          </AccordionItem>

          <AccordionItem
            key="3"
            aria-label="Purpose of Data Collection"
            title="2. Purpose of Data Collection"
          >
            The data we collect is used to:
            <ul className="ml-4 list-disc">
              <li>Provide essential features and services of ShopTracker.</li>
              <li>Notify you of restocks, price drops, or other important updates.</li>
              <li>Send marketing emails if you have consented.</li>
              <li>
                Analyze website performance and user experience using tools like Speed Insights and
                Vercel Analytics.
              </li>
              <li>Ensure compliance with applicable data protection laws and regulations.</li>
            </ul>
          </AccordionItem>

          <AccordionItem
            key="4"
            aria-label="Data Storage and Retention"
            title="3. Data Storage and Retention"
          >
            <TextNormal>3.1 Storage Location</TextNormal>
            Your personal data is securely stored on Aiven Cloud servers located in Frankfurt,
            Germany. Aiven acts solely as an infrastructure provider for data storage and does not
            process your personal data. For all communications and notifications, we use trusted
            third-party services.
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
              <li>Strictly restricted access to databases.</li>
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
      </Section>
    </>
  );
}
