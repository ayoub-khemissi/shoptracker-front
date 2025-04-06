"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import TextNormal from "../components/TextNormal";
import Title from "../components/Title";
import UnderlineLink from "../components/UnderlineLink";
import { NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL } from "@/utils/Config";
import { Section } from "../components/Section";

export default function TermsOfSale() {
  return (
    <>
      <title>Terms of Sale</title>
      <meta
        name="description"
        content="Terms of Sale page for ShopTracker. This page provides information about the purchase of services from ShopTracker, including payment terms, refund policy, and other important details."
      />
      <Section>
        <Title className="pb-6 text-center text-2xl lg:text-4xl">🛍️ Terms of Sale</Title>
        <TextNormal>These terms govern your purchase of services from ShopTracker.</TextNormal>

        <Accordion>
          <AccordionItem
            key="1"
            aria-label="Overview of the Service"
            title="1. Overview of the Service"
          >
            ShopTracker is a SaaS platform designed to track restocks and price drops for products
            across various e-commerce platforms. These Terms of Sale govern the use of ShopTracker's
            services and apply to all users.
          </AccordionItem>

          <AccordionItem key="2" aria-label="Services Offered" title="2. Services Offered">
            <TextNormal className="text-tertiary">2.1 Nature of the Services</TextNormal>
            ShopTracker provides subscription-based services enabling users to:
            <ul className="ml-4 list-disc">
              <li>Monitor product availability and price changes.</li>
              <li>Customize tracking settings based on their subscription tier.</li>
            </ul>
            <TextNormal className="text-tertiary">2.2 Subscription Tiers</TextNormal>
            Subscription plans differ based on the following criteria:
            <ul className="ml-4 list-disc">
              <li>The number of products tracked simultaneously.</li>
              <li>The refresh frequency for product tracking.</li>
              <li>The maximum number of products allowed on a waiting list.</li>
              <li>The maximum number of daily search queries initiated by the user.</li>
            </ul>
          </AccordionItem>

          <AccordionItem key="3" aria-label="Payment Terms" title="3. Payment Terms">
            <TextNormal className="text-tertiary">3.1 Payment Methods</TextNormal>
            Users may pay via credit card, PayPal, or a secure payment link provided by ShopTracker.
            <TextNormal className="text-tertiary">3.2 Recurring Payments</TextNormal>
            Subscriptions are billed on a recurring basis, either monthly or annually, depending on
            the user's choice during registration.
            <TextNormal className="text-tertiary">3.3 Free Trial Period</TextNormal>
            ShopTracker may offer a free trial period to allow users to evaluate the service. Users
            will be clearly informed if a subscription fee will be charged at the end of the trial.
            Failure to cancel before the trial period ends will result in automatic billing. Users
            can cancel at any time during the trial without incurring charges.
            <TextNormal className="text-tertiary">3.4 Refund Policy</TextNormal>
            If a subscription is canceled before its term expires, the user will receive a pro-rated
            refund for the unused portion of the subscription.
          </AccordionItem>

          <AccordionItem
            key="4"
            aria-label="Subscription Duration and Termination"
            title="4. Subscription Duration and Termination"
          >
            <TextNormal className="text-tertiary">4.1 Subscription Terms</TextNormal>
            Subscriptions are offered without any long-term commitment. Users may choose between
            monthly or annual plans.
            <TextNormal className="text-tertiary">4.2 Termination by the User</TextNormal>
            Users can terminate their subscription at any time through their account settings.
            Terminated subscriptions will be refunded pro-rata based on the remaining unused
            subscription period.
          </AccordionItem>

          <AccordionItem
            key="5"
            aria-label="User Data and Privacy"
            title="5. User Data and Privacy"
          >
            <TextNormal className="text-tertiary">5.1 Data Collected</TextNormal>
            <ul className="ml-4 list-disc">
              <li>
                <strong>Email Address</strong>: Required for account creation and to receive service
                notifications. Users may opt-in to receive promotional emails from ShopTracker.
              </li>
              <li>
                <strong>Phone Number</strong>: Optional, for users wishing to receive SMS
                notifications about restocks or price drops.
              </li>
            </ul>
            <TextNormal className="text-tertiary">5.2 Data Storage</TextNormal>
            All user data is securely stored on AWS servers located within the European Union.
            <TextNormal className="text-tertiary">5.3 Cookies</TextNormal>
            ShopTracker only uses essential cookies required for login, user preferences, and
            session management. No tracking or third-party cookies are employed.
            <TextNormal className="text-tertiary">5.4 Privacy Policy</TextNormal>A detailed privacy
            policy is available on the ShopTracker website, outlining how user data is managed and
            how users can request its deletion at any time.
          </AccordionItem>

          <AccordionItem
            key="6"
            aria-label="Service Availability and Liability"
            title="6. Service Availability and Liability"
          >
            <TextNormal className="text-tertiary">6.1 Service Availability</TextNormal>
            ShopTracker will strive to ensure continuous service availability but does not provide a
            guaranteed Service Level Agreement (SLA). Service interruptions, whether planned or
            unplanned, do not qualify for compensation.
            <TextNormal className="text-tertiary">6.2 Limitations of Liability</TextNormal>
            ShopTracker disclaims any liability for:
            <ul className="ml-4 list-disc">
              <li>
                Financial or commercial losses incurred due to service downtime or interruptions.
              </li>
              <li>
                Data loss resulting from technical issues, unless such loss is directly attributable
                to gross negligence by ShopTracker.
              </li>
              <li>
                User misuse of the service or fraudulent activity conducted using data obtained via
                the platform.
              </li>
            </ul>
          </AccordionItem>

          <AccordionItem
            key="7"
            aria-label="Jurisdiction and International Users"
            title="7. Jurisdiction and International Users"
          >
            <TextNormal className="text-tertiary">7.1 Governing Law and Jurisdiction</TextNormal>
            These Terms of Sale are governed by the laws of France. Any disputes will be resolved in
            the competent courts of the jurisdiction where ShopTracker's headquarters are located,
            unless otherwise required by local laws.
            <TextNormal className="text-tertiary">7.2 International Users</TextNormal>
            Users outside the European Union are responsible for ensuring their use of ShopTracker
            complies with their local laws and regulations. ShopTracker does not guarantee
            compliance with non-EU jurisdictions and disclaims any liability for breaches of foreign
            laws. Additionally, non-EU users are responsible for any applicable taxes or fees in
            their region.
          </AccordionItem>

          <AccordionItem
            key="8"
            aria-label="Intellectual Property"
            title="8. Intellectual Property"
          >
            All elements of the ShopTracker service, including but not limited to code, design, and
            functionalities, are the exclusive property of ShopTracker. Users are granted no license
            to use or reproduce these elements beyond the functionality provided by the service.
          </AccordionItem>

          <AccordionItem
            key="9"
            aria-label="Amendments to the Terms"
            title="9. Amendments to the Terms"
          >
            ShopTracker reserves the right to modify these Terms of Sale at any time. Users will be
            notified of significant changes by email or through their user dashboard. Continued use
            of the service after such modifications constitutes acceptance of the revised terms.
          </AccordionItem>

          <AccordionItem key="10" aria-label="Contact Information" title="10. Contact Information">
            For questions regarding these Terms of Sale, users may contact ShopTracker at the
            following email address:{" "}
            <UnderlineLink href={`mailto:${NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL}`}>
              {NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL}
            </UnderlineLink>
            .
          </AccordionItem>
        </Accordion>
      </Section>
    </>
  );
}
