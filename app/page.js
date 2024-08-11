"use client";

import { useState } from "react";
import TextNormal from "./components/TextNormal";
import Title from "./components/Title";
import Link from "next/link";
import TextImportant from "./components/TextImportant";
import Switch from "./components/Switch";
import Subscription from "./components/Subscription";
import Button from "./components/Button";
import TextSeparator from "./components/TextSeparator";
import Image from "next/image";
import ShoppingSvg from "../public/assets/svg/illustrations/shopping.svg";
import StockPricesSvg from "../public/assets/svg/illustrations/stock-prices.svg";
import ScrollArrowsDownSecondarySvg from "../public/assets/svg/icons/scroll-arrows-down-secondary.svg";
import ProductUrlSvg from "../public/assets/svg/illustrations/product-url.svg";
import ConfirmationSvg from "../public/assets/svg/illustrations/confirmation.svg";
import NotificationSvg from "../public/assets/svg/illustrations/notification.svg";
import ScrollArrowsDownTertiarySvg from "../public/assets/svg/icons/scroll-arrows-down-tertiary.svg";

export default function Home() {
  const [productsTracked, setProductsTracked] = useState(0);
  const [checksPerformed, setChecksPerformed] = useState(0);
  const [monthlyAnnually, setMonthlyAnnually] = useState(false);

  return (
    <main>
      <section
        id="top"
        className="h-full bg-gradient-to-b from-contrast from-90% to-contrast-alt px-10 md:px-20 lg:px-40"
      >
        <Title className="text-center">
          Get an alert on the availability and price drop
          <br />{" "}
          <span className="text-secondary transition duration-200 hover:text-tertiary">
            of your favorite products
          </span>
          !
        </Title>
        <div className="flex flex-wrap items-center justify-evenly space-y-4 py-6">
          <div className="flex flex-col items-center justify-center space-y-6 lg:w-1/3">
            <Image className="h-96" src={ShoppingSvg} alt="shopping" />
            <TextNormal className="text-center text-2xl lg:text-3xl">
              {productsTracked} products are being tracked
              <br /> right now.
            </TextNormal>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6 lg:w-1/3">
            <Image className="h-96" src={StockPricesSvg} alt="stock prices" />
            <TextNormal className="text-center text-2xl lg:text-3xl">
              {checksPerformed} checks performed
              <br /> since the launch.
            </TextNormal>
          </div>
        </div>
        <div className="hidden items-center justify-center py-10 lg:flex">
          <Link href="#how-to" className="animate-bounce">
            <Image src={ScrollArrowsDownSecondarySvg} alt="scroll down arrow" />
          </Link>
        </div>
      </section>
      <section
        id="how-to"
        className="h-full bg-gradient-to-b from-contrast-alt from-90% to-contrast px-10 py-6 md:px-20 md:py-10 lg:px-40 lg:py-20"
      >
        <Title className="text-center">
          Track prices or availability of products from almost
          <br />{" "}
          <span className="text-tertiary transition duration-200 hover:text-secondary">
            any e-commerce platform ✨
          </span>
          !
        </Title>
        <div className="flex flex-wrap items-center justify-between space-y-4 py-20 lg:flex-nowrap lg:space-x-24">
          <div className="flex flex-col items-center justify-between space-y-10 lg:w-1/3">
            <Image className="h-72" src={ProductUrlSvg} alt="product url" />
            <TextNormal className="text-center text-2xl lg:text-3xl">
              Copy and paste the product page URL from the e-commerce site to the tracking page 🔎.
            </TextNormal>
          </div>
          <div className="flex flex-col items-center justify-between space-y-10 lg:w-1/3">
            <Image className="h-72" src={ConfirmationSvg} alt="product confirmation" />
            <TextNormal className="text-center text-2xl lg:text-3xl">
              Validate the product information and follow the instructions to start tracking 🕵.
            </TextNormal>
          </div>
          <div className="flex flex-col items-center justify-center space-y-10 lg:w-1/3">
            <Image className="h-72" src={NotificationSvg} alt="receive notification" />
            <TextNormal className="text-center text-2xl lg:text-3xl">
              Receive a notification when your product is back in stock or when its price has
              dropped 🎉!
            </TextNormal>
          </div>
        </div>
        <div className="hidden items-center justify-center py-10 lg:flex">
          <Link href="#subscribe" className="animate-bounce">
            <Image src={ScrollArrowsDownTertiarySvg} alt="scroll down arrow" />
          </Link>
        </div>
      </section>
      <section
        id="subscribe"
        className="h-full bg-gradient-to-b from-contrast from-90% to-contrast-alt px-10 py-6 md:px-20 md:py-10 lg:px-40 lg:py-20"
      >
        <Title className="text-center">
          Choose your subscription plan and enjoy
          <br />{" "}
          <span className="text-secondary transition duration-200 hover:text-tertiary">
            our services now 💫
          </span>
          !
        </Title>
        <div className="flex items-center justify-center space-x-2 py-6">
          <TextImportant
            className={`leading-4 transition duration-200 ${monthlyAnnually ? "opacity-50" : "opacity-100"} text-right`}
          >
            Monthly billing
          </TextImportant>
          <Switch
            checked={monthlyAnnually}
            onClick={() => {
              setMonthlyAnnually(!monthlyAnnually);
            }}
          />
          <TextImportant
            className={`leading-4 transition duration-200 ${monthlyAnnually ? "opacity-100" : "opacity-50"} text-left`}
          >
            Annual billing
            <br />
            <span className="text-xs">(save ~25% annually)</span>
          </TextImportant>
        </div>
        <div className="flex flex-wrap justify-evenly">
          <Subscription
            className="mb-4 2xl:mb-0"
            type="contrast"
            planInfo={{
              monthlyAnnually: null,
              title: "Free Plan",
              price: 0,
              description: (
                <>
                  Our free plan to test our <br />
                  <span className="text-secondary">application with</span> <br />
                  confidence!
                </>
              ),
              trackCheckInterval: 172800000,
              trackEnabledMaxProducts: 1,
              trackDisabledMaxProducts: 3,
              trackMaxUserSearchesPerDay: 5,
            }}
          />
          <Subscription
            className="mb-4 2xl:mb-0"
            type="contrast"
            planInfo={{
              monthlyAnnually: monthlyAnnually,
              title: "Basic Plan",
              price: 4.99,
              description: (
                <>
                  Perfect for regular and reliable tracking <br />
                  <span className="text-secondary">of your products.</span> <br />
                  Don't wait any longer!
                </>
              ),
              trackCheckInterval: 21600000,
              trackEnabledMaxProducts: 1,
              trackDisabledMaxProducts: 10,
              trackMaxUserSearchesPerDay: 12,
            }}
          />
          <Subscription
            className="mb-4 2xl:mb-0"
            type="primary"
            planInfo={{
              monthlyAnnually: monthlyAnnually,
              title: "Pro Plan",
              price: 25.99,
              description: (
                <>
                  Interested in multiple products at once?
                  <br />
                  <span className="text-secondary"> Then this plan </span> <br />
                  is made for you!
                </>
              ),
              trackCheckInterval: 3600000,
              trackEnabledMaxProducts: 3,
              trackDisabledMaxProducts: 15,
              trackMaxUserSearchesPerDay: 20,
            }}
          />
          <Subscription
            type="contrast"
            planInfo={{
              monthlyAnnually: monthlyAnnually,
              title: "Premium Plan",
              price: 59.99,
              description: (
                <>
                  Find your favorite products <br />
                  <span className="text-secondary">quickly by choosing</span> <br />
                  this option!
                </>
              ),
              trackCheckInterval: 1800000,
              trackEnabledMaxProducts: 5,
              trackDisabledMaxProducts: 20,
              trackMaxUserSearchesPerDay: 30,
            }}
          />
        </div>
        <TextSeparator className="py-3">Or</TextSeparator>
        <div className="flex items-center justify-center">
          <Button onClick={() => {}}>I customize my subscription 💎</Button>
        </div>
        <div className="flex items-center justify-end py-6 md:py-2">
          <Link href="#top" className="animate-bounce">
            <Image
              className="rotate-180"
              src={ScrollArrowsDownSecondarySvg}
              alt="scroll up arrow"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
