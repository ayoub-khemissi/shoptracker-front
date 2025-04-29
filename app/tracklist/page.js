"use client";

import { useEffect, useState } from "react";
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
import Section from "../components/Section";
import Input from "../components/Input";
import { LoadingScreen } from "../components/LoadingScreen";

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

const itemsPerPage = 5;

export default function Tracklist() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, setRefresh] = useState(false);
  const [tracklist, setTracklist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getTrackStatusIdByTab = (tab) => {
    const tabData = TABS.find((tabData) => tabData.name === tab);
    return tabData?.id || TRACK_STATUS_ENABLED;
  };

  const [tab, setTab] = useState(getTrackStatusIdByTab(searchParams.get("tab")));

  const fetchTracklist = async () => {
    const response = await fetchData("/tracklist");
    setTracklist((await response?.json())?.data || []);
    setLoading(false);
  };

  const filteredTracklist = tracklist.filter(
    (track) =>
      (!track.name && searchQuery.length === 0) ||
      track.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const inProgressCount = filteredTracklist.filter(
    (track) => track.status_id === TRACK_STATUS_ENABLED,
  ).length;
  const wishlistCount = filteredTracklist.filter(
    (track) => track.status_id === TRACK_STATUS_DISABLED,
  ).length;
  const invalidCount = filteredTracklist.filter(
    (track) => track.status_id === TRACK_STATUS_INVALID,
  ).length;
  const finishedCount = filteredTracklist.filter(
    (track) => track.status_id === TRACK_STATUS_FINISHED,
  ).length;
  const totalCount = filteredTracklist.length;

  const getPaginatedTracklist = () => {
    const filtered = filteredTracklist.filter((track) => (tab ? track.status_id === tab : true));

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
      items: filtered.slice(startIndex, endIndex),
      totalPages: Math.ceil(filtered.length / itemsPerPage),
      totalItems: filtered.length,
    };
  };

  const { items: paginatedTracklist, totalPages, totalItems } = getPaginatedTracklist();

  const handleTabChange = (newTab) => {
    setCurrentPage(1);
    router.push(`/tracklist?tab=${newTab}`);
  };

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

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <title>Tracklist | ShopTracker</title>
      <meta
        name="description"
        content="Tracklist page for ShopTracker. This page displays the tracklist of products being tracked."
      />
      <Section>
        <div className="flex items-center justify-center pb-3">
          <Title className="relative inline-block pb-2 text-3xl lg:text-4xl">
            📈 Tracklist ({totalCount})
            <div className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-gradient-to-r from-secondary via-tertiary to-quaternary"></div>
          </Title>
        </div>

        <div className="flex flex-wrap items-center justify-center pb-3 sm:flex-nowrap sm:space-x-4">
          <Button
            locked
            className={`relative m-1 transition-all duration-300 ${tab === TRACK_STATUS_ENABLED ? "shadow-lg shadow-secondary/10" : ""}`}
            type={tab === TRACK_STATUS_ENABLED ? "primary" : "contrast"}
            defaultCursor
            onClick={() => handleTabChange(TRACKLIST_TAB_IN_PROGRESS)}
          >
            In progress
            {inProgressCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-quaternary text-xs text-primary">
                {inProgressCount}
              </span>
            )}
          </Button>
          <Button
            locked
            className={`relative m-1 transition-all duration-300 ${tab === TRACK_STATUS_DISABLED ? "shadow-lg shadow-secondary/10" : ""}`}
            type={tab === TRACK_STATUS_DISABLED ? "primary" : "contrast"}
            defaultCursor
            onClick={() => handleTabChange(TRACKLIST_TAB_WISHLIST)}
          >
            Wishlist
            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-tertiary text-xs text-white">
                {wishlistCount}
              </span>
            )}
          </Button>
          <Button
            locked
            className={`relative m-1 transition-all duration-300 ${tab === TRACK_STATUS_INVALID ? "shadow-lg shadow-secondary/10" : ""}`}
            type={tab === TRACK_STATUS_INVALID ? "primary" : "contrast"}
            defaultCursor
            onClick={() => handleTabChange(TRACKLIST_TAB_INVALID)}
          >
            Invalid
            {invalidCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-error text-xs text-primary">
                {invalidCount}
              </span>
            )}
          </Button>
          <Button
            locked
            className={`relative m-1 transition-all duration-300 ${tab === TRACK_STATUS_FINISHED ? "shadow-lg shadow-secondary/10" : ""}`}
            type={tab === TRACK_STATUS_FINISHED ? "primary" : "contrast"}
            defaultCursor
            onClick={() => handleTabChange(TRACKLIST_TAB_FINISHED)}
          >
            Finished
            {finishedCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-success text-xs text-primary">
                {finishedCount}
              </span>
            )}
          </Button>
        </div>
        <Input
          className="pb-3"
          type="search"
          placeholder="Search by product name..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
        />
        {totalItems === 0 && (
          <div className="flex flex-col items-center justify-center space-y-6">
            <GlassPanel imageSrc={EmptyBoxSvg} imageAlt="empty-box" />
            <Title className="text-xl text-secondary lg:text-2xl">No track found 😕</Title>
            <ButtonLink
              type="quaternary"
              href="/tracker"
              className="transform transition-all duration-300 hover:scale-105"
            >
              Start Tracking Now ✨
            </ButtonLink>
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
