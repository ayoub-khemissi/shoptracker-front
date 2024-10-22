"use client";

import { useEffect, useState } from "react";
import Button from "../components/Button";
import Constants from "@/utils/Constants";
import Track from "../components/Track";
import { fetchData } from "@/modules/Fetch";

const { TRACK_STATUS_ARCHIVED } = Constants;

export default function Tracklist() {
  const [tab, setTab] = useState("tracked-products");
  const [tracklist, setTracklist] = useState([]);

  useEffect(() => {
    async function fetchTracklist() {
      const response = await fetchData("/tracklist");
      setTracklist((await response?.json())?.data ?? []);
    }

    fetchTracklist();
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

  const filteredTracklist = getFilteredAndSortedTracklist();

  return (
    <main className="h-full space-y-3 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:px-40">
      <div className="flex flex-wrap items-center justify-center sm:flex-nowrap sm:space-x-4">
        <Button
          locked
          className="my-1"
          type={tab === "tracked-products" ? "primary" : "contrast"}
          defaultCursor
          onClick={() => {
            setTab("tracked-products");
          }}
        >
          Tracked products
        </Button>
        <Button
          locked
          className="my-1"
          type={tab === "archived-products" ? "primary" : "contrast"}
          defaultCursor
          onClick={() => {
            setTab("archived-products");
          }}
        >
          Archived products
        </Button>
      </div>
      <div className="flex flex-wrap justify-evenly">
        {filteredTracklist.map((track, index) => {
          return <Track data={track} number={index + 1} key={`track-${index}`} />;
        })}
      </div>
    </main>
  );
}
