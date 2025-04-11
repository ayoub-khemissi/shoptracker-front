"use client";

import Section from "../components/Section";
import PricingPage from "../components/PricingPage";

export default function Pricing() {
  return (
    <>
      <title>Pricing</title>
      <meta
        name="description"
        content="Pricing page for ShopTracker. This page provides information about the different plans and pricing options available for users."
      />
      <Section centered>
        <PricingPage />
      </Section>
    </>
  );
}
