"use client";

import { useEffect, useState } from "react";
import Button from "../components/Button";
import Constants from "@/utils/Constants";
import Track from "../components/Track";
import { fetchData } from "@/modules/Fetch";

const { TRACK_STATUS_ARCHIVED } = Constants;

export default function Tracker() {
  const [tab, setTab] = useState("tracked-products");
  const [tracklist, setTracklist] = useState([]);

  const fetchTracks = async () => {
    const response = await fetchData("/tracklist");

    if (!response || response.status !== 200) {
      return;
    }

    const data = (await response.json()).data;
    setTracklist(data);
  };

  useEffect(() => {
    fetchTracks();
  }, []);

  const getFilteredAndSortedTracklist = () => {
    return tracklist
      .filter((track) =>
        tab === "tracked-products"
          ? track.status_id !== TRACK_STATUS_ARCHIVED
          : track.status_id === TRACK_STATUS_ARCHIVED,
      )
      .sort((a, b) =>
        a.status_id === b.status_id ? b.created_at - a.created_at : a.status_id - b.status_id,
      );
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
      <div className="flex flex-wrap justify-evenly">
        {getFilteredAndSortedTracklist().map((track, index) => {
          return <Track data={track} number={index} key={`track-${index}`} />;
        })}
      </div>
    </main>
  );
}
