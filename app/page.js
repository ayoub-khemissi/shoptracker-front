"use client"

import { useState } from "react";
import TextNormal from "./components/TextNormal";
import Title from "./components/Title";
import Link from "next/link";
import TextImportant from "./components/TextImportant";
import Switch from "./components/Switch";
import Subscription from "./components/Subscription";
import Button from "./components/Button";
import OrSeparator from "./components/OrSeparator";

export default function Home() {
  const [productsTracked, setProductsTracked] = useState(0);
  const [checksPerformed, setChecksPerformed] = useState(0);
  const [monthlyAnnually, setMonthlyAnnually] = useState(false);

  return (
    <main>
      <section id="top" className="h-full bg-gradient-to-b from-contrast from-90% to-contrast-alt lg:px-40 md:px-20 px-10">
        <Title className="text-center">Get an alert on the availability and price drop<br /> <span className="text-secondary hover:text-tertiary transition duration-200">of your favorite products</span>!</Title>
        <div className="flex flex-wrap justify-evenly items-center space-y-4 py-6">
          <div className="lg:w-1/3 flex flex-col justify-center items-center space-y-6">
            <img className="h-96" src="assets/svg/illustrations/shopping.svg" />
            <TextNormal className="text-center lg:text-3xl text-2xl">{productsTracked} products are being tracked<br /> right now.</TextNormal>
          </div>
          <div className="lg:w-1/3 flex flex-col justify-center items-center space-y-6">
            <img className="h-96" src="assets/svg/illustrations/stock-prices.svg" />
            <TextNormal className="text-center lg:text-3xl text-2xl">{checksPerformed} checks performed<br /> since the launch.</TextNormal>
          </div>
        </div>
        <div className="lg:flex hidden justify-center items-center py-10">
          <Link href="#how-to" className="animate-bounce"><img src="assets/svg/icons/scroll-arrows-down-secondary.svg" /></Link>
        </div>
      </section>
      <section id="how-to" className="h-full bg-gradient-to-b from-contrast-alt from-90% to-contrast lg:px-40 lg:py-20 md:px-20 md:py-10 px-10 py-6">
        <Title className="text-center">Track prices or availability of products from almost<br /> <span className="hover:text-secondary text-tertiary transition duration-200">any e-commerce platform ✨</span>!</Title>
        <div className="flex lg:flex-nowrap flex-wrap justify-between items-center py-20 lg:space-x-24 space-y-4">
          <div className="lg:w-1/3 flex flex-col justify-between items-center space-y-10">
            <img className="h-72" src="assets/svg/illustrations/product-url.svg" />
            <TextNormal className="text-center lg:text-3xl text-2xl">Copy and paste the product page URL from the e-commerce site to the tracking page 🔎.</TextNormal>
          </div>
          <div className="lg:w-1/3 flex flex-col justify-between items-center space-y-10">
            <img className="h-72" src="assets/svg/illustrations/confirmation.svg" />
            <TextNormal className="text-center lg:text-3xl text-2xl">Validate the product information and follow the instructions to start tracking 🕵.</TextNormal>
          </div>
          <div className="lg:w-1/3 flex flex-col justify-center items-center space-y-10">
            <img className="h-72" src="assets/svg/illustrations/notification.svg" />
            <TextNormal className="text-center lg:text-3xl text-2xl">Receive a notification when your product is back in stock or when its price has dropped 🎉!</TextNormal>
          </div>
        </div>
        <div className="lg:flex hidden justify-center items-center py-10">
          <Link href="#subscribe" className="animate-bounce"><img src="assets/svg/icons/scroll-arrows-down-tertiary.svg" /></Link>
        </div>
      </section>
      <section id="subscribe" className="h-full bg-gradient-to-b from-contrast from-90% to-contrast-alt lg:px-40 lg:py-20 md:px-20 md:py-10 px-10 py-6">
        <Title className="text-center">Choose your subscription plan and enjoy<br /> <span className="text-secondary hover:text-tertiary transition duration-200">our services now 💫</span>!</Title>
        <div className="flex justify-center items-center py-6 space-x-2">
          <TextImportant className={`leading-4 transition duration-200 ${monthlyAnnually ? "opacity-50" : "opacity-100"} text-right`}>Monthly billing</TextImportant>
          <Switch checked={monthlyAnnually} onChange={() => { setMonthlyAnnually(!monthlyAnnually) }} />
          <TextImportant className={`leading-4 transition duration-200 ${monthlyAnnually ? "opacity-100" : "opacity-50"} text-left`}>Annual billing<br /><span className="text-xs">(save ~25% annually)</span></TextImportant>
        </div>
        <div className="flex flex-wrap justify-evenly">
          <Subscription className="2xl:mb-0 mb-4" type="contrast" planInfo={
            {
              monthlyAnnually: null,
              title: "Free Plan",
              price: 0,
              description: <>Our free plan to test our <br /><span className="text-secondary">application with</span> <br />confidence!</>,
              trackCheckInterval: 172800000,
              trackEnabledMaxProducts: 1,
              trackDisabledMaxProducts: 3,
              trackMaxUserSearchesPerDay: 5
            }
          } />
          <Subscription className="2xl:mb-0 mb-4" type="contrast" planInfo={
            {
              monthlyAnnually: monthlyAnnually,
              title: "Basic Plan",
              price: 4.99,
              description: <>
                Perfect for regular and reliable tracking <br /><span className="text-secondary">of your products.</span> <br />Don't wait any longer!</>,
              trackCheckInterval: 21600000,
              trackEnabledMaxProducts: 1,
              trackDisabledMaxProducts: 10,
              trackMaxUserSearchesPerDay: 12
            }
          } />
          <Subscription className="2xl:mb-0 mb-4" type="primary" planInfo={
            {
              monthlyAnnually: monthlyAnnually,
              title: "Pro Plan",
              price: 25.99,
              description: <>Interested in multiple products at once?<br /><span className="text-secondary"> Then this plan </span> <br />is made for you!</>,
              trackCheckInterval: 3600000,
              trackEnabledMaxProducts: 3,
              trackDisabledMaxProducts: 15,
              trackMaxUserSearchesPerDay: 20
            }
          } />
          <Subscription type="contrast" planInfo={
            {
              monthlyAnnually: monthlyAnnually,
              title: "Premium Plan",
              price: 59.99,
              description: <>Find your favorite products <br /><span className="text-secondary">quickly by choosing</span> <br />this option!</>,
              trackCheckInterval: 1800000,
              trackEnabledMaxProducts: 5,
              trackDisabledMaxProducts: 20,
              trackMaxUserSearchesPerDay: 30
            }
          } />
        </div>
        <OrSeparator className="py-3" />
        <div className="flex justify-center items-center">
          <Button onClick={() => { }}>I customize my subscription 💎</Button>
        </div>
        <div className="flex justify-end items-center md:py-2 py-6">
          <Link href="#top" className="animate-bounce"><img className="rotate-180" src="assets/svg/icons/scroll-arrows-down-secondary.svg" /></Link>
        </div>
      </section>
    </main>
  );
}
