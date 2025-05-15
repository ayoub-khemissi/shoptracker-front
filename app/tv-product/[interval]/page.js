"use client";

import { useEffect, useState } from "react";
import TextNormal from "@/app/components/TextNormal";
import Image from "next/image";
import TVProductSvg from "@/public/assets/svg/illustrations/tv-product.svg";
import Button from "@/app/components/Button";
import { notFound } from "next/navigation";
import { formatPrice } from "@/modules/TextFormatter";
import Link from "next/link";
import Section from "@/app/components/Section";

export default function TVProduct({ params }) {
  const validIntervals = ["30s", "5m", "15m", "30m", "1h", "2h", "6h", "12h", "1d"];
  const name = "Ultra 4k Smart TV";
  const brand = "Celestium";
  const priceRange = {
    min: 500,
    max: 999,
  };
  const { interval } = params;
  const [timeLeft, setTimeLeft] = useState(0);

  const getIntervalMs = (interval) => {
    switch (interval) {
      case "30s":
        return 30 * 1000;
      case "5m":
        return 5 * 60 * 1000;
      case "15m":
        return 15 * 60 * 1000;
      case "30m":
        return 30 * 60 * 1000;
      case "1h":
        return 60 * 60 * 1000;
      case "2h":
        return 2 * 60 * 60 * 1000;
      case "6h":
        return 6 * 60 * 60 * 1000;
      case "12h":
        return 12 * 60 * 60 * 1000;
      case "1d":
        return 24 * 60 * 60 * 1000;
      default:
        return 5 * 60 * 1000;
    }
  };

  const generateProductData = (seed) => {
    const rng = (min, max) => {
      const rand = Math.sin(seed + min + max) * 10000;
      return (min + (rand - Math.floor(rand)) * (max - min + 1)).toFixed(2);
    };

    const price = rng(priceRange.min, priceRange.max);
    const availability = rng(0, 1) > 0.5;

    return {
      price: price,
      availability: availability,
    };
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const result = [];
    if (hours > 0) result.push(`${hours}h`);
    if (mins > 0) result.push(`${mins}m`);
    if (secs > 0 || result.length === 0) result.push(`${secs}s`);

    return result.join(" ");
  };

  useEffect(() => {
    const intervalMs = getIntervalMs(interval);
    const now = new Date();
    const initialSeed = Math.floor(now.getTime() / intervalMs);
    const nextUpdate = (initialSeed + 1) * intervalMs;
    const initialTimeLeft = Math.max(0, Math.floor((nextUpdate - now.getTime()) / 1000));
    setTimeLeft(initialTimeLeft);

    let seed = initialSeed;

    const updateTimer = () => {
      const nextUpdate = (seed + 1) * intervalMs;
      const secondsLeft = Math.max(0, Math.floor((nextUpdate - Date.now()) / 1000));
      setTimeLeft(secondsLeft);

      if (secondsLeft === 0) {
        seed = Math.floor(Date.now() / intervalMs);
        setTimeLeft(Math.floor(intervalMs / 1000));
      }
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer);
  }, [interval]);

  if (!validIntervals.includes(interval)) {
    return notFound();
  }

  const seed = Math.floor(Date.now() / getIntervalMs(interval));
  const productData = generateProductData(seed);

  const { price, availability } = productData;

  return (
    <>
      <title>{`${name} - ${brand} | ShopTracker`}</title>
      <meta
        name="description"
        content={`Experience stunning clarity with the ${name} from ${brand}. Smart features, vibrant colors, and seamless streaming—entertainment has never looked this good.`}
      />
      <Section centerX centerY>
        <div className="relative w-full max-w-4xl space-y-8 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg transition-all duration-300 hover:border-blue-500/30 hover:shadow-blue-500/20">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div className="relative flex flex-col items-center justify-center">
              <div className="absolute -inset-2 rounded-full bg-blue-500/10 blur-2xl"></div>
              <Image
                src={TVProductSvg}
                alt={name}
                className="relative h-64 w-64 transform object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="space-y-4 text-white">
              <div className="space-y-2">
                <TextNormal className="text-2xl font-bold text-blue-300 drop-shadow-md">
                  {name}
                </TextNormal>
                <TextNormal className="text-lg text-gray-400 opacity-80">{brand}</TextNormal>
              </div>
              <div className="space-y-3 rounded-xl border border-white/10 bg-white/5 p-4">
                <TextNormal className="text-4xl font-bold text-blue-200 drop-shadow-lg">
                  {formatPrice(price)}€
                </TextNormal>
                <TextNormal
                  className={`text-lg font-semibold ${
                    availability ? "animate-pulse text-green-400" : "text-red-400 line-through"
                  }`}
                >
                  {availability ? "In Stock" : "Out of Stock"}
                </TextNormal>
                <TextNormal className="rounded-md border border-blue-500/30 bg-white/10 p-2 text-sm italic text-blue-200">
                  💡 Price will vary between {priceRange.min}€ and {priceRange.max}€
                </TextNormal>
              </div>
              {availability && (
                <Button type="quaternary" className="w-full" disabled={!availability}>
                  Add to Cart
                </Button>
              )}
              <TextNormal className="rounded-md border border-white/10 bg-white/5 p-2 text-center text-sm opacity-60">
                Next update in:
                <span className="ml-2 font-bold text-blue-300">{formatTime(timeLeft)}</span>
              </TextNormal>
            </div>
          </div>
          <div className="mt-8 space-y-4 border-t border-white/10 pt-8 text-center">
            <TextNormal className="text-lg font-semibold text-white/80">
              Explore Different Update Intervals
            </TextNormal>
            <div className="flex flex-wrap justify-center gap-2">
              {validIntervals.map((intervalOption) => (
                <Link
                  key={intervalOption}
                  href={`/tv-product/${intervalOption}`}
                  className={`rounded-full px-3 py-1 text-sm transition-all duration-300 ${
                    interval === intervalOption
                      ? "bg-blue-600 text-white"
                      : "bg-white/10 text-blue-200 hover:bg-blue-500/20"
                  } border border-white/10 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
                >
                  {intervalOption}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
