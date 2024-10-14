"use client";

import { useEffect, useState } from "react";
import TextNormal from "./components/TextNormal";
import Title from "./components/Title";
import Link from "next/link";
import Image from "next/image";
import ShoppingSvg from "../public/assets/svg/illustrations/shopping.svg";
import StockPricesSvg from "../public/assets/svg/illustrations/stock-prices.svg";
import ScrollArrowsDownSecondarySvg from "../public/assets/svg/icons/scroll-arrows-down-secondary.svg";
import ProductUrlSvg from "../public/assets/svg/illustrations/product-url.svg";
import ConfirmationSvg from "../public/assets/svg/illustrations/confirmation.svg";
import NotificationSvg from "../public/assets/svg/illustrations/notification.svg";
import ScrollArrowsDownTertiarySvg from "../public/assets/svg/icons/scroll-arrows-down-tertiary.svg";
import SubscriptionPage from "./components/SubscriptionPage";
import { fetchData } from "@/modules/Fetch";
import { formatNumberWithSpaces } from "@/modules/TextFormatter";

export default function Home() {
  const [productsTracked, setProductsTracked] = useState(0);
  const [checksPerformed, setChecksPerformed] = useState(0);

  const fetchTrackStats = async () => {
    const response = await fetchData("/track/stats");
    if (!response || response.status !== 200) {
      return;
    }

    const data = (await response.json()).data;
    setProductsTracked(data.totalTracksEnabled);
    setChecksPerformed(data.totalTrackChecks);
  };

  useEffect(() => {
    fetchTrackStats();
  }, []);

  return (
    <main>
      <section
        id="top"
        className="h-full bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:px-40"
      >
        <Title className="text-center text-2xl lg:text-4xl">
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
              {formatNumberWithSpaces(productsTracked)} products are being tracked
              <br /> right now.
            </TextNormal>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6 lg:w-1/3">
            <Image className="h-96" src={StockPricesSvg} alt="stock prices" />
            <TextNormal className="text-center text-2xl lg:text-3xl">
              {formatNumberWithSpaces(checksPerformed)} checks performed
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
        <Title className="text-center text-2xl lg:text-4xl">
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
              Wait a few seconds while the agent retrieves the product information and start the
              track 🕵.
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
        className="h-full bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 py-6 md:px-20 md:py-10 lg:px-40 lg:py-20"
      >
        <SubscriptionPage />
        <div className="flex items-center justify-end py-10">
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
