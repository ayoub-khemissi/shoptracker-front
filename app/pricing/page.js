"use client";

import PricingPage from "../components/PricingPage";

export default function Pricing() {
  return (
    <>
      <title>Pricing</title>
      <meta
        name="description"
        content="Pricing page for ShopTracker. This page provides information about the different plans and pricing options available for users."
      />
      <main className="flex h-full flex-col justify-center bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:px-40">
        <PricingPage />
      </main>
    </>
  );
}
