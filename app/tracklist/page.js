"use client"

import { useState } from "react";
import Button from "../components/Button";
import Track from "../components/Track";
import Constants from "@/utils/Constants";

const { TRACK_STATUS_ENABLED, TRACK_STATUS_DISABLED, TRACK_STATUS_HISTORY } = Constants;

export default function Tracker() {
  const [tab, setTab] = useState("tracked-products")
  const [tracklist, setTracklist] = useState([]);

  const getFilteredAndSortedTracklist = () => {
    let list;

    switch (tab) {
      case "tracked-products":
      default:
        list = tracklist.filter(product => product.status === TRACK_STATUS_ENABLED || product.status === TRACK_STATUS_DISABLED);

      case "history":
        list = tracklist.filter(product => product.status === TRACK_STATUS_HISTORY);
    }

    return list.sort((a, b) => {
      if (a.status === b.status) {
        return b.created_at - a.created_at;
      }

      return a.status - b.status;
    });
  }

  return (
    <main className="h-full bg-gradient-to-b from-contrast from-90% to-contrast-alt space-y-3 lg:px-40 lg:py-10 md:px-20 py-8 px-10">
      <div className="flex justify-center items-center space-x-4">
        <Button locked type={tab === "tracked-products" ? "primary" : "contrast"} defaultCursor={true} onClick={() => { setTab("tracked-products"); }}>Tracked products</Button>
        <Button locked type={tab === "history" ? "primary" : "contrast"} defaultCursor={true} onClick={() => { setTab("history"); }}>History</Button>
      </div>
      <div className="flex flex-wrap justify-evenly items-center">
        {getFilteredAndSortedTracklist().forEach((product, index) => {
          return <Track number={index} key={`track-${product.id}`} product={product} />;
        })}
      </div>
    </main>
  );
}
