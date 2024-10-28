"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";
import TextNormal from "../components/TextNormal";
import Title from "../components/Title";

export default function TermsOfSale() {
  return (
    <div className="flex h-full flex-col space-x-0 space-y-4 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:space-x-20 lg:px-40">
      <Title className="pb-6 text-center text-4xl text-secondary">Terms of Sale</Title>
      <TextNormal>These terms govern your purchase of services from ShopTracker.</TextNormal>

      <Accordion>
        <AccordionItem key="1" aria-label="Payment Terms" title="1. Payment Terms">
          All payments must be made in advance of the service being provided. Payment methods will
          be specified at the time of purchase.
        </AccordionItem>

        <AccordionItem key="2" aria-label="Refund Policy" title="2. Refund Policy">
          Refunds will be issued on a prorated basis for any cancellations made before the end of
          the billing cycle.
        </AccordionItem>

        <AccordionItem
          key="3"
          aria-label="Subscription Management"
          title="3. Subscription Management"
        >
          Users can manage their subscriptions directly within their account settings, including
          upgrades, downgrades, and cancellations.
        </AccordionItem>

        <AccordionItem
          key="4"
          aria-label="Limitation of Liability"
          title="4. Limitation of Liability"
        >
          ShopTracker shall not be liable for any indirect, incidental, or consequential damages
          arising from your use of our services.
        </AccordionItem>
      </Accordion>
    </div>
  );
}
