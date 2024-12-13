"use client";

import { useEffect, useState } from "react";
import Button from "../components/Button";
import Constants from "@/utils/Constants";
import Track from "../components/Track";
import { fetchData } from "@/modules/Fetch";

const { TRACK_STATUS_ENABLED, TRACK_STATUS_DISABLED, TRACK_STATUS_INVALID, TRACK_STATUS_FINISHED } =
  Constants;

export default function Tracklist() {
  const [tab, setTab] = useState(TRACK_STATUS_ENABLED);
  const [tracklist, setTracklist] = useState([]);

  useEffect(() => {
    async function fetchTracklist() {
      const response = await fetchData("/tracklist");
      setTracklist((await response?.json())?.data ?? []);
    }

    fetchTracklist();
  }, []);

  const getFilteredAndSortedTracklist = () => {
    return tracklist.filter((track) => tab === track.status_id);
  };

  const filteredTracklist = getFilteredAndSortedTracklist();

  return (
    <>
      <title>Tracklist</title>
      <meta
        name="description"
        content="Tracklist page for ShopTracker. This page displays the tracklist of products being tracked."
      />
      <main className="h-full space-y-3 bg-gradient-to-b from-contrast from-90% to-contrast-alt px-6 md:px-20 lg:px-40">
        <div className="flex flex-wrap items-center justify-center sm:flex-nowrap sm:space-x-4">
          <Button
            locked
            className="m-1"
            type={tab === TRACK_STATUS_ENABLED ? "primary" : "contrast"}
            defaultCursor
            onClick={() => {
              setTab(TRACK_STATUS_ENABLED);
            }}
          >
            In progress
          </Button>
          <Button
            locked
            className="m-1"
            type={tab === TRACK_STATUS_DISABLED ? "primary" : "contrast"}
            defaultCursor
            onClick={() => {
              setTab(TRACK_STATUS_DISABLED);
            }}
          >
            Wishlist
          </Button>
          <Button
            locked
            className="m-1"
            type={tab === TRACK_STATUS_INVALID ? "primary" : "contrast"}
            defaultCursor
            onClick={() => {
              setTab(TRACK_STATUS_INVALID);
            }}
          >
            Invalid
          </Button>
          <Button
            locked
            className="m-1"
            type={tab === TRACK_STATUS_FINISHED ? "primary" : "contrast"}
            defaultCursor
            onClick={() => {
              setTab(TRACK_STATUS_FINISHED);
            }}
          >
            Finished
          </Button>
        </div>
        <div className="flex flex-wrap justify-evenly">
          {filteredTracklist.map((track, index) => {
            return <Track data={track} number={index + 1} key={`track-${index}`} />;
          })}
        </div>
      </main>
    </>
  );
}
