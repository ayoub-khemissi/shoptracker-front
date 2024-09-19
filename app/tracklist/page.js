"use client";

import { useState } from "react";
import Button from "../components/Button";
import Constants from "@/utils/Constants";
import TrackTable from "../components/TrackTable";

const { TRACK_STATUS_ENABLED, TRACK_STATUS_DISABLED, TRACK_STATUS_ARCHIVED } = Constants;

export default function Tracker() {
  const [tab, setTab] = useState("tracked-products");
  const [tracks] = useState([]);

  const getFilteredAndSortedTracklist = () => {
    let list;

    switch (tab) {
      case "tracked-products":
      default:
        list = tracks.filter(
          (product) =>
            product.status === TRACK_STATUS_ENABLED || product.status === TRACK_STATUS_DISABLED,
        );
        break;

      case "archived-products":
        list = tracks.filter((product) => product.status === TRACK_STATUS_ARCHIVED);
    }

    return list.sort((a, b) => {
      if (a.status === b.status) {
        return b.created_at - a.created_at;
      }

      return a.status - b.status;
    });
  };

  return (
    <main className="h-full space-y-3 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:px-40">
      <div className="flex items-center justify-center space-x-4">
        <Button
          locked
          type={tab === "tracked-products" ? "primary" : "contrast"}
          defaultCursor={true}
          onClick={() => {
            setTab("tracked-products");
          }}
        >
          Tracked products
        </Button>
        <Button
          locked
          type={tab === "archived-products" ? "primary" : "contrast"}
          defaultCursor={true}
          onClick={() => {
            setTab("archived-products");
          }}
        >
          Archived products
        </Button>
      </div>
      <div className="flex flex-wrap items-center justify-evenly">
        <TrackTable tracks={getFilteredAndSortedTracklist()} />
      </div>
    </main>
  );
}
