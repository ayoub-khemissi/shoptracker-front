"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import TextNormal from "../components/TextNormal";
import Title from "../components/Title";
import UnderlineLink from "../components/UnderlineLink";
import Section from "../components/Section";

export default function TermsOfService() {
  return (
    <>
      <title>Terms of Service</title>
      <meta
        name="description"
        content="Terms of Service page for ShopTracker. This page provides information about the terms and conditions of using ShopTracker services."
      />
      <Section>
        <Title className="pb-6 text-center text-2xl lg:text-4xl">📜 Terms of Service</Title>
        <TextNormal>
          Welcome to ShopTracker! These terms govern your use of our services. By using ShopTracker,
          you agree to these terms.
        </TextNormal>

        <Accordion>
          <AccordionItem
            key="1"
            aria-label="Purpose and Acceptance of the Terms"
            title="1. Purpose and Acceptance of the Terms"
          >
            These Terms of Service (“ToS”) govern your access to and use of ShopTracker, a SaaS
            platform designed to track restocks and price drops across various e-commerce platforms.
            By creating an account and using the service, you agree to comply with these terms.
          </AccordionItem>

          <AccordionItem
            key="2"
            aria-label="Account Creation and Security"
            title="2. Account Creation and Security"
          >
            <TextNormal className="text-tertiary">2.1 Account Registration</TextNormal>
            To access ShopTracker, users must create an account by providing accurate and complete
            information, including a valid email address and a secure password.
            <TextNormal className="text-tertiary">2.2 Account Security</TextNormal>
            Users are responsible for safeguarding their login credentials. ShopTracker is not
            liable for unauthorized account access resulting from user negligence. Users must notify
            ShopTracker immediately of any suspected unauthorized use.
          </AccordionItem>

          <AccordionItem
            key="3"
            aria-label="Permitted Use of the Service"
            title="3. Permitted Use of the Service"
          >
            <TextNormal className="text-tertiary">3.1 Scope of Use</TextNormal>
            ShopTracker grants users a non-transferable, non-exclusive, and revocable right to
            access and use the platform in accordance with their subscription plan.
            <TextNormal className="text-tertiary">3.2 Prohibited Activities</TextNormal>
            Users are prohibited from:
            <ul className="ml-4 list-disc">
              <li>Misusing or reverse-engineering the platform's features.</li>
              <li>Attempting to bypass subscription limitations or access restrictions.</li>
              <li>
                Using the service to conduct fraudulent activities or infringe third-party rights.
              </li>
              <li>
                Overloading the platform with automated scripts, bots, or other unauthorized
                mechanisms.
              </li>
            </ul>
          </AccordionItem>

          <AccordionItem key="4" aria-label="Service Availability" title="4. Service Availability">
            <TextNormal className="text-tertiary">4.1 General Availability</TextNormal>
            While ShopTracker strives to ensure consistent service uptime, no guarantee is provided
            for uninterrupted service. Scheduled maintenance or unforeseen technical issues may
            result in temporary disruptions.
            <TextNormal className="text-tertiary">4.2 Limitations of Liability</TextNormal>
            ShopTracker is not responsible for:
            <ul className="ml-4 list-disc">
              <li>Losses incurred due to service unavailability.</li>
              <li>Technical errors caused by third-party providers or the user's own actions.</li>
            </ul>
          </AccordionItem>

          <AccordionItem
            key="5"
            aria-label="Data Usage and Privacy"
            title="5. Data Usage and Privacy"
          >
            <TextNormal className="text-tertiary">5.1 Data Collection</TextNormal>
            ShopTracker collects only essential data, such as email addresses for account creation
            and optional phone numbers for SMS notifications.
            <TextNormal className="text-tertiary">5.2 Data Storage and Security</TextNormal>
            User data is securely stored on AWS servers located within the European Union.
            ShopTracker employs industry-standard practices to safeguard user data.
            <TextNormal className="text-tertiary">5.3 Privacy Policy</TextNormal>A detailed Privacy
            Policy, available on the website, outlines how user data is managed, stored, and can be
            deleted upon request.
          </AccordionItem>

          <AccordionItem key="6" aria-label="Third-Party Services" title="6. Third-Party Services">
            <TextNormal className="text-tertiary">
              6.1 Dependencies on Third-Party Providers
            </TextNormal>
            ShopTracker's platform relies on third-party providers, such as hosting services and AI
            integrations. While these dependencies are essential for delivering the service, the
            details of such integrations remain confidential to minimize security risks.
            <TextNormal className="text-tertiary">
              6.2 No Liability for Third-Party Failures
            </TextNormal>
            ShopTracker is not liable for service interruptions or data breaches caused by
            third-party providers.
          </AccordionItem>

          <AccordionItem
            key="7"
            aria-label="Intellectual Property"
            title="7. Intellectual Property"
          >
            <TextNormal className="text-tertiary">7.1 Ownership of Content</TextNormal>
            All software, designs, and features of ShopTracker are the intellectual property of
            ShopTracker. Users are prohibited from reproducing, distributing, or modifying any
            elements of the platform without explicit permission.
            <TextNormal className="text-tertiary">7.2 User Contributions</TextNormal>
            Any feedback or suggestions submitted by users may be used by ShopTracker to improve the
            service without obligation or compensation.
          </AccordionItem>

          <AccordionItem
            key="8"
            aria-label="Account Suspension and Termination"
            title="8. Account Suspension and Termination"
          >
            <TextNormal className="text-tertiary">
              8.1 Grounds for Suspension or Termination
            </TextNormal>
            ShopTracker reserves the right to suspend or terminate accounts for:
            <ul className="ml-4 list-disc">
              <li>Violations of these ToS.</li>
              <li>Suspected fraudulent activity.</li>
              <li>Actions compromising the security or functionality of the platform.</li>
            </ul>
            <TextNormal className="text-tertiary">8.2 Process for Termination</TextNormal>
            In cases of suspected violations, ShopTracker may investigate and take appropriate
            action, including immediate account suspension. Users will be notified via email and
            provided an opportunity to address the issue.
          </AccordionItem>

          <AccordionItem
            key="9"
            aria-label="Subscription Plans and Limits"
            title="9. Subscription Plans and Limits"
          >
            Users must adhere to the limits specified in their subscription plan. Any unauthorized
            attempts to bypass these limits may result in account suspension or termination.
          </AccordionItem>

          <AccordionItem
            key="10"
            aria-label="Governing Law and International Use"
            title="10. Governing Law and International Use"
          >
            <TextNormal className="text-tertiary">10.1 Jurisdiction</TextNormal>
            These ToS are governed by the laws of France. Any disputes will be resolved in the
            competent courts where ShopTracker's headquarters are located.
            <TextNormal className="text-tertiary">10.2 International Use</TextNormal>
            Users outside the European Union must ensure compliance with local laws. ShopTracker
            disclaims liability for any violations arising from use in non-EU regions.
          </AccordionItem>

          <AccordionItem
            key="11"
            aria-label="Amendments to the Terms"
            title="11. Amendments to the Terms"
          >
            ShopTracker reserves the right to update these ToS at any time. Users will be notified
            of significant changes by email or via the platform. Continued use of the service
            constitutes acceptance of the revised terms.
          </AccordionItem>

          <AccordionItem key="12" aria-label="Contact Information" title="12. Contact Information">
            For questions or concerns regarding these Terms of Service, users may contact
            ShopTracker via the{" "}
            <UnderlineLink href="/contact?subject=terms-of-service">Contact page</UnderlineLink>.
          </AccordionItem>
        </Accordion>
      </Section>
    </>
  );
}
