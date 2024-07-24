"use client"

import { useState } from "react";
import Input from "../components/Input";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";

export default function Tracker() {
  const [url, setUrl] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [trackStock, setTrackStock] = useState(true);
  const [trackPrice, setTrackPrice] = useState(true);
  const [trackPriceThreshold, setTrackPriceThreshold] = useState(null);

  const handleTrackPrice = () => {
    if (!trackStock && trackPrice) { return; }

    setTrackPrice(!trackPrice);
  }

  const handleTrackStock = () => {
    if (!trackPrice && trackStock) { return; }

    setTrackStock(!trackStock);
  }

  return (
    <main className="h-full bg-gradient-to-b from-contrast from-90% to-contrast-alt space-y-3 lg:px-40 md:px-20 px-10">
      <div className="w-full space-y-3">
        <Input type="url" labelText="Url of the product page" placeholder="https://www.e-commerce.com/product/123456789" onChange={e => { setUrl(e.target.value); }} value={url} />
        <Input type="text" labelText="Product details (optional)" placeholder="Name, description, color..." onChange={e => { setAdditionalInfo(e.target.value); }} value={additionalInfo} />
      </div>
      <div className="lg:flex lg:space-y-0 space-y-4">
        <div className="lg:w-1/2 space-y-2">
          <Checkbox labelText="Track restocking" checked={trackStock} onChange={handleTrackStock} />
          <Checkbox labelText="Track price" checked={trackPrice} onChange={handleTrackPrice} />
          <div className={`${trackPrice ? "opacity-100" : "opacity-50"} flex items-center`}>
            <Input labelText="Notify me when price below:" step={10} min={0} max={100000000} type="number" placeholder="1000 €, £, $, ₩, ¥..." onChange={e => { setTrackPriceThreshold(e.target.value); }} value={trackPriceThreshold} disabled={!trackPrice} />
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-end items-start">
          <Button onClick={() => { }}>Start tracking</Button>
        </div>
      </div>
    </main>
  );
}
