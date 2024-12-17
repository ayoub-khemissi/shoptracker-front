"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import TextNormal from "../components/TextNormal";
import Title from "../components/Title";
import UnderlineLink from "../components/UnderlineLink";
import { NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL } from "@/utils/Config";
import Constants from "@/utils/Constants";

const { SETTINGS_TAB_ACCOUNT } = Constants;

export default function TermsOfService() {
  return (
    <>
      <title>Terms of Service</title>
      <meta
        name="description"
        content="Terms of Service page for ShopTracker. This page provides information about the terms and conditions of using ShopTracker services."
      />
      <div className="flex h-full flex-col space-x-0 space-y-4 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:space-x-20 lg:px-40">
        <Title className="pb-6 text-center text-4xl text-secondary">Terms of Service</Title>
        <TextNormal>
          Welcome to ShopTracker! These terms govern your use of our services. By using ShopTracker,
          you agree to these terms.
        </TextNormal>

        <Accordion>
          <AccordionItem key="1" aria-label="Service Overview" title="1. Service Overview">
            ShopTracker allows users to track products by entering the URL of the product page from
            e-commerce websites. The information will be retrieved every X hours or minutes based on
            the chosen subscription plan.
          </AccordionItem>

          <AccordionItem key="2" aria-label="Subscription Plans" title="2. Subscription Plans">
            We offer a Free Plan and several paid plans available <UnderlineLink href="/pricing">here</UnderlineLink>. Each plan includes the following features:
            <ol>
              <li>• Number of products trackable at the same time</li>
              <li>• Time interval between each tracking</li>
              <li>• Number of products in the wishlist</li>
              <li>• Number of user searches per day</li>
            </ol>
          </AccordionItem>

          <AccordionItem
            key="3"
            aria-label="Subscription Cancellation"
            title="3. Subscription Cancellation"
          >
            If you cancel your subscription, you will receive a prorated refund based on the
            remaining time of your subscription.
          </AccordionItem>

          <AccordionItem key="4" aria-label="Subscription Changes" title="4. Subscription Changes">
            If you change your subscription plan, the previous subscription will be stopped, and a
            prorated refund will be issued. The new subscription will then start and be billed at
            the new price.
          </AccordionItem>

          <AccordionItem key="5" aria-label="Account Deletion" title="5. Account Deletion">
            Users can delete their data (account) in the{" "}
            <UnderlineLink href={`/settings?tab=${SETTINGS_TAB_ACCOUNT}`}>Settings</UnderlineLink> page under the Account tab.
          </AccordionItem>

          <AccordionItem key="6" aria-label="Support" title="6. Support">
            If you need assistance, you can contact support at{" "}
            <UnderlineLink href={`mailto:${NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL}`}>
              {NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL}
            </UnderlineLink>
            .
          </AccordionItem>

          <AccordionItem key="7" aria-label="FAQ" title="7. FAQ">
            A FAQ is available on the <UnderlineLink href="/faq">Q&A page</UnderlineLink> to address
            various user questions.
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
