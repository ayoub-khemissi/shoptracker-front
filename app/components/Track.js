"use client";

import { convertMillisecondsToText, formatPrice, truncateString } from "@/modules/TextFormatter";
import TextImportant from "./TextImportant";
import Title from "./Title";
import InvisibleButton from "./InvisibleButton";
import NavLink from "./NavLink";
import { Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";
import Constants from "@/utils/Constants";
import Image from "next/image";
import ClockPrimarySvg from "../../public/assets/svg/icons/clock-primary.svg";
import Spinner from "./Spinner";
import { useAuthContext } from "../contexts/AuthContext";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
  YAxis,
} from "recharts";
import { useState, useEffect, useCallback } from "react";
import Modal from "./Modal";
import { ChartContainer } from "@/app/components/Chart";
import { fetchData } from "@/modules/Fetch";
import { useToast } from "../contexts/ToastContext";
import getPlanData from "@/modules/PlanData";
import { useRouter } from "next/navigation";

const {
  TRACK_STATUS_ENABLED,
  TRACK_PRICE_STATUS_DECREASED,
  TRACK_PRICE_STATUS_INCREASED,
  TRACK_PRICE_STATUS_STABLE,

  TRACKLIST_TAB_IN_PROGRESS,
  TRACKLIST_TAB_WISHLIST,
} = Constants;

const Track = ({ number, data }) => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useAuthContext();
  const { showToast } = useToast();
  const {
    id,
    url,
    name,
    description,
    initial_price,
    currency,
    created_at,
    updated_at,
    status_id,
    track_checks_ok,
    track_checks_ko,
  } = data;

  const getTimeLeftBeforeCheck = useCallback(() => {
    const lastCheckTime = updated_at || created_at;

    return (
      lastCheckTime -
      Date.now() +
      getPlanData(user?.subscription?.stripe_price_id).track_check_interval
    );
  }, [updated_at, created_at, user?.subscription?.stripe_price_id]);

  const [timeLeftBeforeCheck, setTimeLeftBeforeCheck] = useState(getTimeLeftBeforeCheck());

  const formatFullPrice = () => {
    const price = track_checks_ok[track_checks_ok.length - 1]?.price || initial_price;

    if (priceStatus === TRACK_PRICE_STATUS_STABLE) {
      return (
        <>
          {formatPrice(price)}
          <span className="text-xs">{currency}</span>
        </>
      );
    } else {
      return (
        <>
          {formatPrice(price)}
          <span className="text-xs">{currency}</span>{" "}
          <span className="text-xs line-through">{formatPrice(initial_price) + currency}</span>
        </>
      );
    }
  };

  const getPriceStatus = () => {
    if (track_checks_ok.length > 0) {
      const { price: lastTrackCheckPrice } = track_checks_ok[track_checks_ok.length - 1];

      if (lastTrackCheckPrice === initial_price) {
        return TRACK_PRICE_STATUS_STABLE;
      } else if (lastTrackCheckPrice < initial_price) {
        return TRACK_PRICE_STATUS_DECREASED;
      } else {
        return TRACK_PRICE_STATUS_INCREASED;
      }
    } else {
      return TRACK_PRICE_STATUS_STABLE;
    }
  };

  const getAvailability = () => {
    return !!track_checks_ok[track_checks_ok.length - 1]?.availability;
  };

  const getPriceStatusSvgName = () => {
    switch (priceStatus) {
      case TRACK_PRICE_STATUS_DECREASED:
        return "price-decreased";

      case TRACK_PRICE_STATUS_INCREASED:
        return "price-increased";

      case TRACK_PRICE_STATUS_STABLE:
      default:
        return "price-stable";
    }
  };

  const getPriceStatusSvgTitle = () => {
    switch (priceStatus) {
      case TRACK_PRICE_STATUS_DECREASED:
        return "Price decreased";

      case TRACK_PRICE_STATUS_INCREASED:
        return "Price increased";

      case TRACK_PRICE_STATUS_STABLE:
      default:
        return "Price stable";
    }
  };

  const getAvailabilitySvgName = () => {
    switch (availability) {
      case true:
        return "circle-check-success";

      case false:
      default:
        return "circle-cross-error";
    }
  };

  const getAvailabilitySvgTitle = () => {
    switch (availability) {
      case true:
        return "Product available";

      case false:
      default:
        return "Product out of stock";
    }
  };

  const getAvailabilityText = () => {
    switch (availability) {
      case true:
        return "In stock";

      case false:
      default:
        return "Out of stock";
    }
  };

  const getSiteDomain = () => {
    try {
      const cleanedUrl = url.replace(/^[a-zA-Z]+:\/\//, "");
      const domain = cleanedUrl.split("/")[0];
      const parts = domain.split(".");

      return parts.length > 2 ? parts.slice(-2).join(".") : domain;
    } catch (error) {
      return "Unknown website";
    }
  };

  const deleteTrack = async () => {
    const response = await fetchData(`/track/delete`, "DELETE", {
      id: id,
    });

    switch (response?.status) {
      case 200:
        router.push(`/tracklist?tab=${TRACKLIST_TAB_WISHLIST}&refresh=true`);
        showToast(`${name || "The track"} has been deleted.`, "info");
        break;

      default:
        showToast("Failed to delete the track. Please try again later.", "error");
        break;
    }
  };

  const startPauseTrack = async () => {
    const action = status_id === TRACK_STATUS_ENABLED ? "disable" : "enable";
    const response = await fetchData(`/track/${action}`, "PATCH", {
      id: id,
    });

    switch (response?.status) {
      case 200:
        router.push(
          `/tracklist?tab=${status_id === TRACK_STATUS_ENABLED ? TRACKLIST_TAB_WISHLIST : TRACKLIST_TAB_IN_PROGRESS}&refresh=true`,
        );
        showToast(
          `${name || "The track"} has been ${
            status_id === TRACK_STATUS_ENABLED ? "disabled" : "enabled"
          }.`,
          status_id === TRACK_STATUS_ENABLED ? "info" : "success",
        );
        break;

      case 403: {
        showToast(
          (await response.json())?.msg ||
            "Failed to update the track status. Please try again later.",
          "error",
        );
        break;
      }

      default:
        showToast("Failed to update the track status. Please try again later.", "error");
        break;
    }
  };

  const priceStatus = getPriceStatus();
  const availability = getAvailability();
  const chartData = track_checks_ok.map((trackCheck) => ({
    date: new Date(trackCheck.created_at).toLocaleString(),
    price: trackCheck.price,
  }));

  useEffect(() => {
    const timeLeftBeforeCheckInterval = setInterval(() => {
      setTimeLeftBeforeCheck(getTimeLeftBeforeCheck());
    }, 1000);

    return () => clearInterval(timeLeftBeforeCheckInterval);
  }, [getTimeLeftBeforeCheck]);

  const track_checks = [...track_checks_ok, ...track_checks_ko];

  return (
    <>
      <div className="flex min-w-[256px] max-w-[512px] flex-auto flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="flex h-10 items-center justify-center bg-gradient-to-r from-primary/90 to-primary px-3 py-2">
          <div className="w-1/6"></div>
          <NavLink
            target="_blank"
            type="contrast"
            href={url}
            className="w-4/6 text-center text-sm font-medium text-contrast/90 transition-colors duration-200 hover:text-contrast md:text-base"
          >
            #{number} {getSiteDomain()} 🔗
          </NavLink>
          <div className="flex w-1/6 items-center justify-end text-contrast">
            <Dropdown className="bg-contrast/95 backdrop-blur-sm">
              <DropdownTrigger className="z-0 rotate-90 cursor-pointer text-xl transition-opacity hover:opacity-80">
                •••
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="start-stop" onClick={startPauseTrack}>
                  {status_id === TRACK_STATUS_ENABLED ? "⏸️ Pause" : "▶️ Start"}
                </DropdownItem>
                <DropdownItem
                  key="delete"
                  className={`text-error`}
                  color="danger"
                  onClick={deleteTrack}
                >
                  🗑️ Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        {name && name.length > 0 ? (
          <InvisibleButton
            className="flex-1 transition-colors duration-200 hover:bg-white/5"
            onClick={() => setModalVisible(true)}
          >
            <div className="flex h-full flex-col items-center justify-between space-y-3 px-6 py-5">
              <Title className="text-center text-lg leading-5 text-secondary/90 transition-colors duration-200 hover:text-secondary">
                {truncateString(name, 50)}
              </Title>

              <TextImportant className="py-1 text-center text-sm leading-4 text-primary/80">
                {truncateString(description, 120)}
              </TextImportant>

              <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center justify-center space-x-3 rounded-lg border border-white/5 bg-white/5 p-3 backdrop-blur-sm">
                  <div className="flex items-center justify-center">
                    <Image
                      width={24}
                      height={24}
                      src={`assets/svg/icons/${getPriceStatusSvgName()}.svg`}
                      alt="price status"
                      title={getPriceStatusSvgTitle()}
                      className="opacity-90"
                    />
                  </div>
                  <TextImportant className="text-center text-lg leading-3">
                    {formatFullPrice()}
                  </TextImportant>
                </div>

                <div className="flex items-center justify-center space-x-3 rounded-lg border border-white/5 bg-white/5 p-3 backdrop-blur-sm">
                  <div className="flex items-center justify-center">
                    <Image
                      width={24}
                      height={24}
                      src={`assets/svg/icons/${getAvailabilitySvgName(availability)}.svg`}
                      alt="availability status"
                      title={getAvailabilitySvgTitle()}
                      className="opacity-90"
                    />
                  </div>
                  <TextImportant className="text-center leading-4 text-primary/90">
                    {getAvailabilityText(availability)}
                  </TextImportant>
                </div>

                {status_id === TRACK_STATUS_ENABLED && (
                  <div className="flex items-center justify-center space-x-3 rounded-lg border border-white/5 bg-white/5 p-3 backdrop-blur-sm md:col-span-2">
                    <div className="flex items-center justify-center">
                      {timeLeftBeforeCheck > 0 ? (
                        <Image
                          className="h-6 w-6 opacity-80"
                          src={ClockPrimarySvg}
                          alt="next track check"
                        />
                      ) : (
                        <Spinner className="h-6 w-6" />
                      )}
                    </div>
                    <TextImportant className="text-center text-sm leading-4 text-primary/80">
                      {convertMillisecondsToText(timeLeftBeforeCheck)}
                    </TextImportant>
                  </div>
                )}
              </div>
            </div>
          </InvisibleButton>
        ) : (
          <div className="flex flex-1 items-center justify-center bg-white/5 p-8">
            <Spinner className="h-10 w-10 opacity-80" />
          </div>
        )}
      </div>
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        className="overflow-visible rounded-xl border border-white/10 bg-contrast/95 shadow-2xl backdrop-blur-lg"
      >
        <Title className="pb-4 text-center text-xl leading-none text-primary lg:text-2xl">
          {truncateString(name, 70)}
        </Title>
        {track_checks.length > 0 && (
          <div className="mb-8">
            <Title className="mb-4 text-center text-lg leading-none text-primary">
              Recent Checks Status
            </Title>
            <div className="relative px-6">
              <div className="absolute left-1/2 top-1/2 h-0.5 w-[calc(100%-12px)] -translate-x-1/2 -translate-y-1/2 transform bg-white/10"></div>
              <div className="relative flex w-full justify-between px-[15px]">
                {track_checks
                  .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
                  .slice(0, 5)
                  .map((check, index) => {
                    const isOk = "price" in check;
                    return (
                      <div key={index} className="group relative">
                        <Image
                          width={30}
                          height={30}
                          src={`assets/svg/icons/${
                            isOk ? "circle-check-success" : "circle-cross-error"
                          }.svg`}
                          alt={isOk ? "✅" : "❌"}
                          className="opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                        />
                        <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <div className="w-48 rounded-lg border border-white/10 bg-gradient-to-br from-contrast/95 via-contrast to-contrast/90 p-3 shadow-md shadow-secondary/10 ring-1 ring-tertiary/10 backdrop-blur-md">
                            <TextImportant className="text-sm font-medium text-primary">
                              {isOk
                                ? `${formatPrice(check.price)}${currency} - ${getAvailabilityText(check.availability)}`
                                : `⚠️ ${check.title}: ${check.reason}`}
                            </TextImportant>
                            <TextImportant className="mt-1 text-xs text-primary/70">
                              {new Date(check.created_at).toLocaleString()}
                            </TextImportant>
                          </div>
                          <div className="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 transform border-b border-r border-white/10 bg-gradient-to-br from-contrast/95 to-contrast shadow-md shadow-secondary/10"></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
        <ChartContainer config={{}} className="h-full w-full">
          <ResponsiveContainer className="h-full w-full">
            <AreaChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} horizontal={true} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis axisLine={false} tickLine={false} tickMargin={8} />
              <Area
                dataKey="price"
                type="linear"
                fill="transparent"
                fillOpacity={0.4}
                stroke="#B78BFF"
              />
              <Legend />
              <Tooltip
                cursor={false}
                contentStyle={{
                  backgroundColor: "#1E1E25CC",
                  border: "none",
                  padding: 12,
                  margin: 0,
                  borderRadius: 8,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </Modal>
    </>
  );
};

export default Track;
