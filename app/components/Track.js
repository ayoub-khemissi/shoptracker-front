import { convertMillisecondsToText, formatPrice, truncateString } from "@/modules/TextFormatter";
import TextImportant from "./TextImportant";
import Title from "./Title";
import InvisibleButton from "./InvisibleButton";
import NavLink from "./NavLink";
import { Dropdown, DropdownTrigger, DropdownItem, DropdownMenu } from "@nextui-org/dropdown";
import Constants from "@/utils/Constants";
import Image from "next/image";
import ClockContrastSvg from "../../public/assets/svg/icons/clock-contrast.svg";
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
    updated_at,
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

  const getLastCheckTimeTitle = () => {
    return new Date(updated_at).toLocaleString();
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
      <div className="flex justify-between">
        <div
          className="flex cursor-default items-center justify-between space-x-1 rounded-t-xl bg-secondary px-2 py-1"
          title={`Last check: ${getLastCheckTimeTitle()}`}
        >
          <div className="flex items-center justify-center">
            <Image className="h-6 w-6" src={ClockContrastSvg} alt="next product check" />
          </div>
          <TextImportant className="w-full text-center text-sm leading-4 text-contrast">
            {status_id === TRACK_STATUS_ENABLED
              ? convertMillisecondsToText(
                  created_at - Date.now() + (user ? user.subscription.track_check_interval : 0),
                )
              : getLastCheckTimeTitle()}
          </TextImportant>
        </div>
        <div className="flex items-start space-x-2">
          <Dropdown className="bg-contrast uppercase">
            <DropdownTrigger className="cursor-pointer">• • •</DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="start-stop">
                {status_id === TRACK_STATUS_ENABLED ? "Stop" : "Start"}
              </DropdownItem>
              <DropdownItem key="edit">Edit</DropdownItem>
              <DropdownItem key="delete" className={`text-error`} color="danger">
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="rounded-b-lg rounded-tr-lg border-2 border-primary">
        <div className="flex items-center justify-center bg-primary px-2 py-1.5">
          <NavLink
            target="_blank"
            type="contrast"
            href={url}
            className="w-full text-center text-base text-contrast md:text-xl"
          >
            #{number + 1} {getSiteDomain()} 🔗
          </NavLink>
        </div>
        {name && name.length > 0 ? (
          <InvisibleButton>
            <div className="space-y-2 border-primary px-5 py-4" title="Click here to see details">
              <Title className="text-center text-lg leading-5">{truncateString(name, 50)}</Title>
              <TextImportant className="py-1 text-center text-sm leading-4 text-primary">
                {truncateString(description, 120)}
              </TextImportant>
              <div className="flex w-full flex-wrap items-center justify-evenly">
                <div className="flex items-center justify-center space-x-4">
                  <TextImportant className="text-center text-lg leading-3">
                    {formatFullPrice()}
                  </TextImportant>
                  <div className="flex items-center justify-center">
                    <Image
                      width={40}
                      height={40}
                      src={`assets/svg/icons/${getPriceStatusSvgName()}.svg`}
                      alt="price status"
                      title={getPriceStatusSvgTitle()}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-4">
                  <div className="flex items-center justify-center">
                    <Image
                      width={40}
                      height={40}
                      src={`assets/svg/icons/${getAvailabilitySvgName(availability)}.svg`}
                      alt="availability status"
                      title={getAvailabilitySvgTitle()}
                    />
                  </div>
                  <TextImportant className="py-1 text-center leading-4 text-primary">
                    {getAvailabilityText(availability)}
                  </TextImportant>
                </div>
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
