"use client";

import { useState, useEffect } from "react";
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
import PricingPage from "./components/PricingPage";
import { fetchData } from "@/modules/Fetch";
import { formatNumberWithSpaces } from "@/modules/TextFormatter";
import Section from "./components/Section";
import ButtonLink from "./components/ButtonLink";
import { useAuthContext } from "./contexts/AuthContext";
import { LoadingScreen } from "./components/LoadingScreen";

export default function Home() {
  const [stats, setStats] = useState({ total_tracks_enabled: 0, total_track_checks: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();

  const { total_tracks_enabled, total_track_checks } = stats;

  useEffect(() => {
    const fetchStats = async () => {
      const response = await fetchData("/track/stats");

      if (response?.status === 200) {
        const data = (await response?.json())?.data;
        if (data) {
          setStats({
            total_tracks_enabled: data.total_tracks_enabled || 0,
            total_track_checks: data.total_track_checks || 0,
          });
        }
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <title>ShopTracker | Track Restocks & Price Drops Online</title>
      <meta
        name="description"
        content="Easily track restocks and price drops of products from almost any e-commerce platform. Get instant alerts and never miss a deal again!"
      />
      <Section id="top" centerY>
        <Title className="pb-4 text-center text-2xl lg:text-4xl">
          Get an alert on the availability and price drop
          <br />{" "}
          <span className="text-secondary transition duration-200 hover:text-tertiary">
            of your favorite products
          </span>
          !
        </Title>
        <div className="grid grid-cols-1 gap-8 py-4 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center space-y-6 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm">
            <Image className="h-80" src={ShoppingSvg} alt="shopping" />
            <TextNormal className="text-center text-2xl lg:text-3xl">
              {formatNumberWithSpaces(total_tracks_enabled)} products are being tracked
              <br /> right now.
            </TextNormal>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute right-0 top-0 h-1/2 w-1/2 -translate-y-1/4 translate-x-1/4 transform rounded-full bg-tertiary blur-3xl"></div>
              <div className="absolute bottom-0 left-0 h-1/2 w-1/2 -translate-x-1/4 translate-y-1/4 transform rounded-full bg-tertiary blur-3xl"></div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-6 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm">
            <Image className="h-80" src={StockPricesSvg} alt="stock prices" />
            <TextNormal className="text-center text-2xl lg:text-3xl">
              {formatNumberWithSpaces(total_track_checks)} checks performed
              <br /> since the launch.
            </TextNormal>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute left-0 top-0 h-1/2 w-1/2 -translate-x-1/4 -translate-y-1/4 transform rounded-full bg-tertiary blur-3xl"></div>
              <div className="absolute bottom-0 right-0 h-1/2 w-1/2 translate-x-1/4 translate-y-1/4 transform rounded-full bg-tertiary blur-3xl"></div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-4">
          <ButtonLink type="quaternary" href={user ? "/tracker" : "/register"}>
            Try It Free Now! ✨
          </ButtonLink>
        </div>
        <div className="hidden items-center justify-center py-4 lg:flex">
          <Link href="#how-to" className="animate-bounce">
            <Image src={ScrollArrowsDownSecondarySvg} alt="scroll down arrow" />
          </Link>
        </div>
      </Section>
      <Section alt id="how-to" centerY>
        <Title className="text-center text-2xl lg:text-4xl">
          Track prices or availability of products from almost
          <br />{" "}
          <span className="text-tertiary transition duration-200 hover:text-secondary">
            any e-commerce platform ✨
          </span>
          !
        </Title>
        <div className="grid grid-cols-1 gap-8 py-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-between space-y-10 rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm transition duration-300 hover:scale-105 hover:transform">
            <Image className="h-60" src={ProductUrlSvg} alt="product url" />
            <TextNormal className="text-center text-xl lg:text-2xl">
              Copy and paste the product page URL from the e-commerce site to the tracking page 🔎.
            </TextNormal>
          </div>
          <div className="flex flex-col items-center justify-between space-y-10 rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm transition duration-300 hover:scale-105 hover:transform">
            <Image className="h-60" src={ConfirmationSvg} alt="product confirmation" />
            <TextNormal className="text-center text-xl lg:text-2xl">
              Wait a few seconds while the agent retrieves the product information and start the
              tracking 🕵.
            </TextNormal>
          </div>
          <div className="flex flex-col items-center justify-center space-y-10 rounded-xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-sm transition duration-300 hover:scale-105 hover:transform">
            <Image className="h-60" src={NotificationSvg} alt="receive notification" />
            <TextNormal className="text-center text-xl lg:text-2xl">
              Receive a notification when your product is back in stock or when its price has
              dropped 🎉!
            </TextNormal>
          </div>
        </div>
        <div className="flex items-center justify-center py-4">
          <ButtonLink type="tertiary" href={user ? "/tracker" : "/register"}>
            Try the Demo Now! 🚀
          </ButtonLink>
        </div>
        <div className="hidden items-center justify-center py-4 lg:flex">
          <Link href="#pricing" className="animate-bounce">
            <Image src={ScrollArrowsDownTertiarySvg} alt="scroll down arrow" />
          </Link>
        </div>
      </Section>
      <Section id="pricing" centerY>
        <PricingPage />
      </Section>
      <div className="fixed bottom-8 right-8 z-10 lg:bottom-16 lg:right-16">
        <Link href="#top">
          <Image
            className="h-10 w-10 rotate-180 transition duration-300 hover:scale-110 lg:h-12 lg:w-12"
            src={ScrollArrowsDownSecondarySvg}
            alt="scroll up arrow"
          />
        </Link>
      </div>
    </>
  );
}
