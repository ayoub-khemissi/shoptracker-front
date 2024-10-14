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

const { TRACK_STATUS_ENABLED } = Constants;

const Track = ({ className = "", number, data }) => {
  const { user } = useAuthContext();
  const {
    url,
    name,
    description,
    first_normal_price,
    first_discounted_price,
    currency,
    availability,
    price_status,
    created_at,
    status_id,
    track_checks,
  } = data;

  const formatFullPrice = () => {
    const price = getLowestPrice();

    if (price < first_normal_price) {
      return (
        <>
          {formatPrice(price)}
          <span className="text-xs">{currency}</span>{" "}
          <span className="text-xs line-through">{formatPrice(first_normal_price) + currency}</span>
        </>
      );
    } else {
      return (
        <>
          {formatPrice(price)}
          <span className="text-xs">{currency}</span>
        </>
      );
    }
  };

  const getPriceStatusSvgName = () => {
    switch (price_status) {
      case 1:
        return "price-decreased";

      case 2:
        return "price-increased";

      case 3:
      default:
        return "price-stable";
    }
  };

  const getPriceStatusSvgTitle = () => {
    switch (price_status) {
      case 1:
        return "Price decreased";

      case 2:
        return "Price increased";

      case 3:
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

  const getLowestPrice = () => {
    if (track_checks.length > 0) {
      const lastTrackCheck = track_checks[0];

      if (lastTrackCheck.discounted_price === 0) {
        return lastTrackCheck.normal_price;
      }

      return lastTrackCheck.discounted_price < lastTrackCheck.normal_price
        ? lastTrackCheck.discounted_price
        : lastTrackCheck.normal_price;
    }

    if (first_discounted_price === 0) {
      return first_normal_price;
    }

    return first_discounted_price < first_normal_price
      ? first_discounted_price
      : first_normal_price;
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

  return (
    <div className={`mx-2 my-4 w-[512px] flex-auto ${className}`}>
      <div className="rounded-lg border-2 border-primary">
        <div className="flex items-center justify-center bg-primary px-2 py-1.5">
          <div className="w-1/6"></div>
          <NavLink
            target="_blank"
            type="contrast"
            href={url}
            className="w-4/6 text-center text-base text-contrast md:text-xl"
          >
            #{number + 1} {getSiteDomain()} 🔗
          </NavLink>
          <div className="flex w-1/6 items-center justify-end text-contrast">
            <Dropdown className="bg-contrast uppercase">
              <DropdownTrigger className="rotate-90 cursor-pointer text-2xl">•••</DropdownTrigger>
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
          <InvisibleButton className="w-full">
            <div className="space-y-2 border-primary px-5 py-4" title="Click here to see details">
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
          <div className="flex items-center justify-center p-6">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Track;
