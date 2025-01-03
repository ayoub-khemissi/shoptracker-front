"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "../components/Button";
import Constants from "@/utils/Constants";
import Track from "../components/Track";
import { fetchData } from "@/modules/Fetch";
import { useRouter } from "next/navigation";
import EmptyBoxSvg from "../../public/assets/svg/illustrations/empty-box.svg";
import Image from "next/image";

const {
  TRACK_STATUS_ENABLED,
  TRACK_STATUS_DISABLED,
  TRACK_STATUS_INVALID,
  TRACK_STATUS_FINISHED,

  TRACKLIST_TAB_IN_PROGRESS,
  TRACKLIST_TAB_WISHLIST,
  TRACKLIST_TAB_INVALID,
  TRACKLIST_TAB_FINISHED,
} = Constants;

const TABS = [
  { id: TRACK_STATUS_ENABLED, name: TRACKLIST_TAB_IN_PROGRESS },
  { id: TRACK_STATUS_DISABLED, name: TRACKLIST_TAB_WISHLIST },
  { id: TRACK_STATUS_INVALID, name: TRACKLIST_TAB_INVALID },
  { id: TRACK_STATUS_FINISHED, name: TRACKLIST_TAB_FINISHED },
];

export default function Tracklist() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, setRefresh] = useState(false);
  const [tracklist, setTracklist] = useState([]);

  const getTrackStatusIdByTab = (tab) => {
    const tabData = TABS.find((tabData) => tabData.name === tab);
    return tabData?.id ?? TRACK_STATUS_ENABLED;
  };

  const [tab, setTab] = useState(getTrackStatusIdByTab(searchParams.get("tab")));

  const fetchTracklist = async () => {
    const response = await fetchData("/tracklist");
    setTracklist((await response?.json())?.data ?? []);
  };

  const getFilteredAndSortedTracklist = () => {
    return tracklist.filter((track) => tab === track.status_id);
  };

  const filteredTracklist = getFilteredAndSortedTracklist();

  useEffect(() => {
    fetchTracklist();
  }, []);

  useEffect(() => {
    const isRefreshing = searchParams.get("refresh") === "true";

    if (isRefreshing) {
      fetchTracklist();
      setRefresh(true);
    } else {
      setRefresh(false);
    }
  }, [searchParams]);

  useEffect(() => {
    setTab(getTrackStatusIdByTab(searchParams.get("tab")));
  }, [searchParams]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchTracklist();
    }, 30 * 1000);

    return () => clearInterval(intervalId);
  }, []);

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
              router.push(`/tracklist?tab=${TRACKLIST_TAB_IN_PROGRESS}`);
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
              router.push(`/tracklist?tab=${TRACKLIST_TAB_WISHLIST}`);
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
              router.push(`/tracklist?tab=${TRACKLIST_TAB_INVALID}`);
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
              router.push(`/tracklist?tab=${TRACKLIST_TAB_FINISHED}`);
            }}
          >
            Finished
          </Button>
        </div>
        {filteredTracklist.length === 0 && (
          <div className="flex items-center justify-center pt-2 md:pt-14 lg:pt-20">
            <Image className="h-96" src={EmptyBoxSvg} alt="empty-box" />
          </div>
        )}
        <div className="flex flex-wrap justify-evenly">
          {filteredTracklist.map((track, index) => {
            return <Track data={track} number={index + 1} key={`track-${index}`} />;
          })}
        </div>
      </main>
    </>
  );
}
