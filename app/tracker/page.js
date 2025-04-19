"use client";

import { useState } from "react";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Title from "../components/Title";
import { useToast } from "../contexts/ToastContext";
import { fetchData } from "@/modules/Fetch";
import { useRouter } from "next/navigation";
import Section from "../components/Section";
import TextNormal from "../components/TextNormal";
import { NEXT_PUBLIC_BASE_URL } from "@/utils/Config";
import ButtonLink from "../components/ButtonLink";
import TextSeparator from "../components/TextSeparator";

const demoUrl5m = `${NEXT_PUBLIC_BASE_URL}/tv-product/5m`;
const demoUrl30s = `${NEXT_PUBLIC_BASE_URL}/tv-product/30s`;

export default function Tracker() {
  const [url, setUrl] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [trackStock, setTrackStock] = useState(true);
  const [trackPrice, setTrackPrice] = useState(true);
  const [trackPriceThreshold, setTrackPriceThreshold] = useState("");
  const { showToast } = useToast();
  const router = useRouter();

  const handleTrackPrice = () => {
    if (trackPrice && !trackStock) {
      showToast("You must choose at least one tracking option.", "error");
      return;
    }

    setTrackPrice(!trackPrice);
  };

  const handleTrackStock = () => {
    if (trackStock && !trackPrice) {
      showToast("You must choose at least one tracking option.", "error");
      return;
    }

    setTrackStock(!trackStock);
  };

  const handleSubmitDemoTrack = async (e) => {
    e.preventDefault();

    const response = await fetchData("/track", "POST", {
      url: demoUrl5m,
      additionalInfo: "Ultra 4K Smart TV",
      trackStock: true,
      trackPrice: true,
      trackPriceThreshold: 999,
    });

    if (!response || !response.status) {
      showToast("Failed to track the product. Please try again later.", "error");
      return;
    }

    const msg = (await response.json()).msg;

    switch (response.status) {
      case 201:
        showToast("Product added to the tracking list! 🎉", "success");
        router.push("/tracklist");
        break;

      case 403:
      case 409:
        showToast(msg, "error");
        break;

      default:
        showToast("An error occurred. Please try again later.", "error");
        break;
    }
  };

  const handleSubmitTrack = async (e) => {
    e.preventDefault();

    const response = await fetchData("/track", "POST", {
      url: url,
      additionalInfo: additionalInfo,
      trackStock: trackStock,
      trackPrice: trackPrice,
      trackPriceThreshold: Number(trackPriceThreshold) || 0,
    });

    if (!response || !response.status) {
      showToast("Failed to track the product. Please try again later.", "error");
      return;
    }

    const msg = (await response.json()).msg;

    switch (response.status) {
      case 201:
        showToast("Product added to the tracking list! 🎉", "success");
        router.push("/tracklist");
        break;

      case 403:
      case 409:
        showToast(msg, "error");
        break;

      default:
        showToast("An error occurred. Please try again later.", "error");
        break;
    }
  };

  return (
    <>
      <title>Tracker</title>
      <meta
        name="description"
        content="Tracker page for ShopTracker. This page allows users to track products by entering the URL of the product page from e-commerce websites."
      />
      <Section>
        <Title className="w-full pb-4 text-center text-2xl text-primary lg:text-4xl">
          Fill in the product info <br />
          <span className="text-secondary transition duration-200 hover:text-tertiary">
            to start the tracking
          </span>{" "}
          🚀 !
        </Title>

        <div className="grid grid-cols-1 gap-12 xl:grid-cols-2">
          <form onSubmit={handleSubmitTrack} className="space-y-6">
            <div className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <TextSeparator className="text-lg font-semibold">Product info</TextSeparator>
              <Input
                id="url"
                type="url"
                pattern="https://.*"
                labelText="Product URL"
                placeholder="https://www.e-commerce.com/product/id/123456789"
                onChange={(e) => setUrl(e.target.value)}
                value={url}
                required
              />
              <Input
                id="details"
                type="text"
                labelText="Product details (optional)"
                placeholder="Name, description, brand, color, size, etc."
                onChange={(e) => setAdditionalInfo(e.target.value)}
                value={additionalInfo}
              />
            </div>
            <div className="space-y-6 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <TextSeparator className="text-lg font-semibold">Tracking Options</TextSeparator>
              <div className="space-y-4">
                <Checkbox
                  labelText="Track restocking"
                  checked={trackStock}
                  onClick={handleTrackStock}
                />
                <Checkbox labelText="Track price" checked={trackPrice} onClick={handleTrackPrice} />
                <Input
                  id="price-below"
                  className={`transition-all duration-300 ${trackPrice ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-50"}`}
                  labelText="Notify me when price below:"
                  step={10}
                  min={0}
                  max={100000000}
                  type="number"
                  placeholder="99 €"
                  onChange={(e) => setTrackPriceThreshold(e.target.value)}
                  value={trackPriceThreshold}
                  disabled={!trackPrice}
                  required={trackPrice}
                />
              </div>
            </div>
            <Button className="w-full" type="quaternary" buttonType="submit">
              Start tracking 🏁
            </Button>
          </form>
          <div className="flex flex-col justify-center space-y-6 rounded-xl border border-white/10 bg-white/5 p-8 text-center">
            <Title className="text-2xl lg:text-3xl">Quick Demo</Title>
            <TextNormal className="text-lg">Try our pre-configured product track!</TextNormal>
            <Button type="tertiary" onClick={handleSubmitDemoTrack} className="w-full">
              Launch Demo (5m update interval)
            </Button>
            <ButtonLink href={demoUrl30s} type="quaternary" className="w-full">
              Ultra 4k Smart TV product page
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
