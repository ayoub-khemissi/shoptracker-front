"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Button from "../components/Button";
import Constants from "@/utils/Constants";
import Track from "../components/Track";
import { fetchData } from "@/modules/Fetch";
import { useRouter } from "next/navigation";
import EmptyBoxSvg from "../../public/assets/svg/illustrations/empty-box.svg";
import Title from "../components/Title";
import ButtonLink from "../components/ButtonLink";
import GlassPanel from "../components/GlassPanel";
import { Section } from "../components/Section";
import Input from "../components/Input";

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
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const getTrackStatusIdByTab = (tab) => {
    const tabData = TABS.find((tabData) => tabData.name === tab);
    return tabData?.id || TRACK_STATUS_ENABLED;
  };

  const [tab, setTab] = useState(getTrackStatusIdByTab(searchParams.get("tab")));

  const fetchTracklist = async () => {
    const response = await fetchData("/tracklist");
    setTracklist((await response?.json())?.data || []);
  };

  const getPaginatedTracklist = () => {
    const filtered = tracklist
      .filter((track) => tab === track.status_id)
      .filter(
        (track) =>
          searchQuery.length === 0 || track.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const startIndex = (currentPage - 1) * itemsPerPage;
    return {
      items: filtered.slice(startIndex, startIndex + itemsPerPage),
      totalPages: Math.ceil(filtered.length / itemsPerPage),
      totalItems: filtered.length,
    };
  };

  const { items: paginatedTracklist, totalPages, totalItems } = getPaginatedTracklist();

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
    searchInputRef.current?.focus();
  }, []);

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
      <Section>
        <div className="flex items-center justify-center pb-3">
          <Title className="relative inline-block pb-2 text-3xl lg:text-4xl">
            📈 Tracklist
            <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-gradient-to-r from-secondary via-tertiary to-quaternary"></div>
          </Title>
        </div>

        <div className="flex flex-wrap items-center justify-center pb-3 sm:flex-nowrap sm:space-x-4">
          <Button
            locked
            className={`m-1 transition-all duration-300 ${tab === TRACK_STATUS_ENABLED ? "shadow-lg shadow-secondary/10" : ""}`}
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
            className={`m-1 transition-all duration-300 ${tab === TRACK_STATUS_DISABLED ? "shadow-lg shadow-secondary/10" : ""}`}
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
            className={`m-1 transition-all duration-300 ${tab === TRACK_STATUS_INVALID ? "shadow-lg shadow-secondary/10" : ""}`}
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
            className={`m-1 transition-all duration-300 ${tab === TRACK_STATUS_FINISHED ? "shadow-lg shadow-secondary/10" : ""}`}
            type={tab === TRACK_STATUS_FINISHED ? "primary" : "contrast"}
            defaultCursor
            onClick={() => {
              router.push(`/tracklist?tab=${TRACKLIST_TAB_FINISHED}`);
            }}
          >
            Finished
          </Button>
        </div>
        <div className="px-4 pb-3">
          <Input
            ref={searchInputRef}
            type="search"
            placeholder="Search by product name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        {totalItems === 0 && (
          <div className="flex flex-col items-center justify-center space-y-6">
            <GlassPanel imageSrc={EmptyBoxSvg} imageAlt="empty-box" />
            {tab === TRACK_STATUS_ENABLED && (
              <>
                <Title className="text-xl text-secondary lg:text-2xl">No track found!</Title>
                <ButtonLink
                  type="quaternary"
                  href="/tracker"
                  className="transform transition-all duration-300 hover:scale-105"
                >
                  Start Tracking Now ✨
                </ButtonLink>
              </>
            )}
          </div>
        )}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 px-4 pb-3">
            <Button
              type="contrast"
              size="small"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <p className="rotate-180">➜</p>
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page =
                currentPage <= 3
                  ? i + 1
                  : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i;
              return (
                <Button
                  key={`page-${page}`}
                  type={currentPage === page ? "quaternary" : "contrast"}
                  size="small"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              );
            })}
            <Button
              type="contrast"
              size="small"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <p>➜</p>
            </Button>
          </div>
        )}

        <div className="flex flex-wrap justify-evenly gap-4">
          {paginatedTracklist.map((track, index) => (
            <Track
              data={track}
              key={`track-${index}`}
              number={index + 1 + (currentPage - 1) * itemsPerPage}
            />
          ))}
        </div>
      </Section>
    </>
  );
}
