"use client";

import { useState } from "react";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import Title from "../components/Title";
import { useToast } from "../contexts/ToastContext";
import { fetchData } from "@/modules/Fetch";
import { useRouter } from "next/navigation";

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
      <main className="flex h-full flex-col items-center space-y-3 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:px-40">
        <Title className="w-full pb-4 text-center text-2xl text-primary lg:text-4xl">
          Fill in the product info <br />
          <span className="text-secondary transition duration-200 hover:text-tertiary">
            to start the tracking
          </span>{" "}
          🚀 !
        </Title>
        <form className="w-full space-y-4" onSubmit={handleSubmitTrack}>
          <div className="w-full space-y-4">
            <Input
              id="url"
              type="url"
              pattern="https://.*"
              labelText="Url of the product page"
              placeholder="https://www.e-commerce.com/product/id/123456789"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              value={url}
              required
            />
            <Input
              id="details"
              type="text"
              labelText="Product details (optional)"
              placeholder="Name, description, color..."
              onChange={(e) => {
                setAdditionalInfo(e.target.value);
              }}
              value={additionalInfo}
            />
          </div>
          <div className="w-full space-y-4 lg:flex lg:space-y-0">
            <div className="space-y-2 lg:w-1/2">
              <Checkbox
                labelText="Track restocking"
                checked={trackStock}
                onClick={handleTrackStock}
              />
              <Checkbox labelText="Track price" checked={trackPrice} onClick={handleTrackPrice} />
              <div className={`${trackPrice ? "opacity-100" : "opacity-50"} flex items-center`}>
                <Input
                  id="price-below"
                  className="text-center"
                  labelText="Notify me when price below:"
                  step={10}
                  min={0}
                  max={100000000}
                  type="number"
                  placeholder="99 €"
                  onChange={(e) => {
                    setTrackPriceThreshold(e.target.value);
                  }}
                  value={trackPriceThreshold}
                  disabled={!trackPrice}
                  required={trackPrice}
                />
              </div>
            </div>
            <div className="flex items-start justify-end lg:w-1/2">
              <Button buttonType="submit">Start tracking</Button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
