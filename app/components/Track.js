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
import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";

const {
  TRACK_STATUS_ENABLED,
  TRACK_STATUS_DISABLED,
  TRACK_STATUS_INVALID,
  TRACK_STATUS_FINISHED,

  TRACK_PRICE_STATUS_DECREASED,
  TRACK_PRICE_STATUS_INCREASED,
  TRACK_PRICE_STATUS_STABLE,

  TRACKLIST_TAB_IN_PROGRESS,
  TRACKLIST_TAB_WISHLIST,
  TRACKLIST_TAB_INVALID,
  TRACKLIST_TAB_FINISHED,
} = Constants;

const Track = ({ number, data }) => {
  const {
    id,
    url,
    name,
    description,
    lang,
    initial_price,
    currency,
    track_stock,
    track_price,
    track_price_threshold,
    status_id,
    created_at,
    updated_at,
    track_checks_chart,
    track_checks_ok_recent,
    track_checks_ko_recent,
  } = data;
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [trackStock, setTrackStock] = useState(!!track_stock);
  const [trackPrice, setTrackPrice] = useState(!!track_price);
  const [trackPriceThreshold, setTrackPriceThreshold] = useState(track_price_threshold || "");
  const { user } = useAuthContext();
  const { showToast } = useToast();

  const getCurrentTabByTrackStatus = () => {
    switch (status_id) {
      case TRACK_STATUS_ENABLED:
        return TRACKLIST_TAB_IN_PROGRESS;

      case TRACK_STATUS_DISABLED:
        return TRACKLIST_TAB_WISHLIST;

      case TRACK_STATUS_INVALID:
        return TRACKLIST_TAB_INVALID;

      case TRACK_STATUS_FINISHED:
        return TRACKLIST_TAB_FINISHED;

      default:
        return TRACKLIST_TAB_IN_PROGRESS;
    }
  };

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
    const price = track_checks_chart[track_checks_chart.length - 1]?.price || initial_price;

    if (priceStatus === TRACK_PRICE_STATUS_STABLE) {
      return formatPrice(price, currency, lang);
    } else {
      return (
        <>
          {formatPrice(price, currency, lang)}
          <span className="text-xs line-through">{formatPrice(initial_price, currency, lang)}</span>
        </>
      );
    }
  };

  const getPriceStatus = () => {
    if (track_checks_chart.length > 0) {
      const { price: lastTrackCheckPrice } = track_checks_chart[track_checks_chart.length - 1];

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
    return !!track_checks_chart[track_checks_chart.length - 1]?.availability;
  };

  const getPriceStatusSvgName = (priceStatus) => {
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

  const getPriceStatusSvgTitle = (priceStatus) => {
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

  const getAvailabilitySvgName = (availability) => {
    switch (!!availability) {
      case true:
        return "circle-check-success";

      case false:
      default:
        return "circle-cross-error";
    }
  };

  const getAvailabilitySvgTitle = (availability) => {
    switch (!!availability) {
      case true:
        return "Product available";

      case false:
      default:
        return "Product out of stock";
    }
  };

  const getAvailabilityText = (availability) => {
    switch (!!availability) {
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
        router.push(`/tracklist?tab=${getCurrentTabByTrackStatus()}&refreshTime=${Date.now()}`);
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
        router.push(`/tracklist?tab=${getCurrentTabByTrackStatus()}&refreshTime=${Date.now()}`);
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

  const updateTrack = async (e) => {
    e.preventDefault();

    if (!trackPrice && !trackStock) {
      showToast("You must choose at least one tracking option.", "error");
      return;
    }

    const response = await fetchData("/track/update", "PATCH", {
      id: id,
      trackStock: !!trackStock,
      trackPrice: !!trackPrice,
      trackPriceThreshold: Number(trackPriceThreshold) || 0,
    });

    switch (response?.status) {
      case 200:
        showToast("Track updated successfully 🎉", "success");
        setModalVisible(false);
        router.push(`/tracklist?tab=${getCurrentTabByTrackStatus()}&refreshTime=${Date.now()}`);
        break;

      default:
        showToast("An error occurred. Please try again later.", "error");
        break;
    }
  };

  const handleTrackPrice = () => {
    if (trackPrice && !trackStock) {
      showToast("You must choose at least one tracking option.", "error");
      return;
    }

    setTrackPrice(!trackPrice);
  };

  const handleTrackStock = () => {
    if (trackStock && !trackPrice) {
      showToast("You must choose at least one tracking option.", "error");
      return;
    }

    setTrackStock(!trackStock);
  };

  const priceStatus = getPriceStatus();
  const availability = getAvailability();
  const chartData = track_checks_chart.map((trackCheck) => ({
    date: new Date(trackCheck.created_at).toLocaleString(),
    price: trackCheck.price,
  }));

  useEffect(() => {
    const timeLeftBeforeCheckInterval = setInterval(() => {
      setTimeLeftBeforeCheck(getTimeLeftBeforeCheck());
    }, 1000);

    return () => clearInterval(timeLeftBeforeCheckInterval);
  }, [getTimeLeftBeforeCheck]);

  const track_checks_recent = [...track_checks_ok_recent, ...track_checks_ko_recent];

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
            <div className="flex h-full flex-col items-center justify-between space-y-3 p-6">
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
                      src={`assets/svg/icons/${getPriceStatusSvgName(priceStatus)}.svg`}
                      alt="price status"
                      title={getPriceStatusSvgTitle(priceStatus)}
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
                      title={getAvailabilitySvgTitle(availability)}
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
            <div className="flex items-center justify-center space-x-3 md:col-span-2">
              {status_id === TRACK_STATUS_ENABLED ? (
                <>
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
                </>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="flex items-center justify-center gap-x-2">
                    <div className="flex items-center justify-center text-2xl">😕</div>
                    <TextImportant className="text-center text-sm leading-4 text-primary/80">
                      No data available
                    </TextImportant>
                  </div>
                  <Button type="quaternary" onClick={startPauseTrack}>
                    {status_id === TRACK_STATUS_INVALID ? "Restart the track" : "Start the track"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Modal isVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <div className="space-y-4">
          <NavLink
            target="_blank"
            type="primary"
            href={url}
            className="text-wrap text-center text-xl leading-none"
          >
            {truncateString(name, 70)} 🔗
          </NavLink>
          <div className="flex flex-wrap items-center justify-center space-y-4">
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
            {track_checks_recent.length > 0 && (
              <div className="w-full space-y-4">
                <Title className="text-center text-lg leading-none text-primary">
                  Recent Checks Status
                </Title>
                <div className="relative px-6">
                  <div className="absolute left-1/2 top-1/2 h-0.5 w-[calc(100%-12px)] -translate-x-1/2 -translate-y-1/2 transform bg-white/10"></div>
                  <div className="relative flex w-full justify-between px-[15px]">
                    {track_checks_recent
                      .sort((a, b) => b.created_at - a.created_at)
                      .slice(0, 5)
                      .reverse()
                      .map((trackCheck, index) => {
                        const isOk = "price" in trackCheck;
                        return (
                          <div key={index} className="group relative">
                            <Image
                              width={30}
                              height={30}
                              src={`assets/svg/icons/${
                                isOk ? "circle-check-tertiary" : "circle-cross-error"
                              }.svg`}
                              alt={isOk ? "✅" : "❌"}
                              className="opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            />
                            <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 transform opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                              <div className="w-48 rounded-lg border border-white/10 bg-gradient-to-br from-contrast/95 via-contrast to-contrast/90 p-3 shadow-md shadow-secondary/10 ring-1 ring-tertiary/10 backdrop-blur-md">
                                <TextImportant className="text-sm font-medium text-primary">
                                  {isOk
                                    ? `✔️ ${formatPrice(trackCheck.price, trackCheck.currency, trackCheck.lang)} - ${getAvailabilityText(trackCheck.availability)}`
                                    : `⚠️ ${trackCheck.title}: ${trackCheck.reason}`}
                                </TextImportant>
                                <TextImportant className="mt-1 text-xs text-primary/70">
                                  {new Date(trackCheck.created_at).toLocaleString()}
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
            <form
              onSubmit={updateTrack}
              className="flex w-full flex-wrap justify-between gap-4 sm:flex-nowrap"
            >
              <div className="flex h-full w-full flex-col justify-between gap-y-4 xl:w-1/2">
                <Checkbox labelText="Track price" checked={trackPrice} onClick={handleTrackPrice} />
                <Input
                  id="price-below"
                  className={`transition-all duration-300 ${trackPrice ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-50"}`}
                  labelText="Notify me when price below:"
                  min={1}
                  max={10000000000000}
                  type="number"
                  placeholder="99 €"
                  onChange={(e) => setTrackPriceThreshold(e.target.value)}
                  value={trackPriceThreshold}
                  disabled={!trackPrice}
                  required={trackPrice}
                />
              </div>
              <div className="flex w-full flex-col justify-between gap-y-4 xl:w-1/2">
                <Checkbox
                  labelText="Track restocking"
                  checked={trackStock}
                  onClick={handleTrackStock}
                />
                <Button className="w-full" type="quaternary" buttonType="submit">
                  Update track
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Track;
