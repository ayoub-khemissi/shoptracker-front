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

const {
  TRACK_STATUS_ENABLED,
  TRACK_PRICE_STATUS_DECREASED,
  TRACK_PRICE_STATUS_INCREASED,
  TRACK_PRICE_STATUS_STABLE,
} = Constants;

const Track = ({ className = "", number, data }) => {
  const { user } = useAuthContext();
  const { url, name, description, initial_price, currency, created_at, status_id, track_checks } =
    data;

  const formatFullPrice = () => {
    let price = 0;
    if (track_checks.length > 0) {
      price = track_checks[track_checks.length - 1].price;
    } else {
      price = initial_price;
    }

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
    if (track_checks.length > 0) {
      const { price: lastTrackCheckPrice } = track_checks[track_checks.length - 1];

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
    return !!track_checks[track_checks.length - 1]?.availability;
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

  const getLastCheckTimeText = () => {
    return convertMillisecondsToText(
      created_at - Date.now() + (user ? user.subscription.track_check_interval : 0),
    );
  };

  const getSiteDomain = () => {
    try {
      const cleanedUrl = url.replace(/^[a-zA-Z]+:\/\//, "");
      const domain = cleanedUrl.split("/")[0];
      const parts = domain.split(".");

      return parts.length > 2 ? parts.slice(-2).join(".") : domain;
    } catch (e) {
      return "Unknown website";
    }
  };

  const priceStatus = getPriceStatus();
  const availability = getAvailability();

  return (
    <div
      className={`mx-2 my-2 flex w-[512px] flex-auto flex-col rounded-lg border-2 border-primary ${className}`}
    >
      <div className="flex h-8 items-center justify-center bg-primary px-2 py-1">
        <div className="w-1/6"></div>
        <NavLink
          target="_blank"
          type="contrast"
          href={url}
          className="w-4/6 text-center text-sm text-contrast md:text-base"
        >
          #{number} {getSiteDomain()} 🔗
        </NavLink>
        <div className="flex w-1/6 items-center justify-end text-contrast">
          <Dropdown className="bg-contrast uppercase">
            <DropdownTrigger className="rotate-90 cursor-pointer text-xl">•••</DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="start-stop">
                {status_id === TRACK_STATUS_ENABLED ? "⏸️ Pause" : "▶️ Start"}
              </DropdownItem>
              <DropdownItem key="edit">✏️ Edit</DropdownItem>
              <DropdownItem key="delete" className={`text-error`} color="danger">
                🗑️ Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      {name && name.length > 0 ? (
        <InvisibleButton className="flex-1">
          <div
            className="flex h-full flex-col items-center justify-between space-y-2 border-primary px-5 py-4"
            title="View track details"
          >
            <Title className="text-center text-lg leading-5 text-secondary">
              {truncateString(name, 50)}
            </Title>
            <TextImportant className="py-1 text-center text-sm leading-4 text-primary">
              {truncateString(description, 120)}
            </TextImportant>
            <div className="flex w-full flex-wrap items-center justify-evenly space-y-1">
              <div className="flex items-center justify-center space-x-2 px-2">
                <div className="flex items-center justify-center">
                  <Image
                    width={28}
                    height={28}
                    src={`assets/svg/icons/${getPriceStatusSvgName()}.svg`}
                    alt="price status"
                    title={getPriceStatusSvgTitle()}
                  />
                </div>
                <TextImportant className="text-center text-lg leading-3">
                  {formatFullPrice()}
                </TextImportant>
              </div>
              <div className="flex items-center justify-center space-x-2 px-2">
                <div className="flex items-center justify-center">
                  <Image
                    width={28}
                    height={28}
                    src={`assets/svg/icons/${getAvailabilitySvgName(availability)}.svg`}
                    alt="availability status"
                    title={getAvailabilitySvgTitle()}
                  />
                </div>
                <TextImportant className="py-1 text-center leading-4 text-primary">
                  {getAvailabilityText(availability)}
                </TextImportant>
              </div>
              {status_id === TRACK_STATUS_ENABLED && (
                <div className="flex items-center justify-center space-x-2 px-2">
                  <div className="flex items-center justify-center">
                    <Image className="h-7 w-7" src={ClockPrimarySvg} alt="next product check" />
                  </div>
                  <TextImportant className="text-center text-sm leading-4">
                    {getLastCheckTimeText()}
                  </TextImportant>
                </div>
              )}
            </div>
          </div>
        </InvisibleButton>
      ) : (
        <div title="Waiting for data..." className="flex flex-1 items-center justify-center">
          <Spinner className="my-8 h-10 w-10" />
        </div>
      )}
    </div>
  );
};

export default Track;
