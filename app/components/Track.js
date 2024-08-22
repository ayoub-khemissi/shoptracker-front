import { convertMilliseconds, formatPrice, truncateString } from "@/utils/Helper";
import TextImportant from "./TextImportant";
import Title from "./Title";
import InvisibleButton from "./InvisibleButton";
import NavLink from "./NavLink";
import Constants from "@/utils/Constants";
import Image from "next/image";
import ClockPrimarySvg from "../../public/assets/svg/icons/clock-primary.svg";
import StartSvg from "../../public/assets/svg/icons/start.svg";
import PauseSvg from "../../public/assets/svg/icons/pause.svg";
import EditSvg from "../../public/assets/svg/icons/edit.svg";
import DeleteSvg from "../../public/assets/svg/icons/delete.svg";

const { TRACK_STATUS_ENABLED } = Constants;

const Track = ({ className = "", number, product }) => {
  const {
    url,
    name,
    description,
    initial_price,
    normal_price,
    discounted_price,
    currency,
    availability,
    price_status,
    created_at,
    updated_at,
    check_interval,
    status,
  } = product;

  const formatFullPrice = () => {
    const price = getLowestPrice();

    if (price < initial_price) {
      return (
        <>
          {formatPrice(price)}
          <span className="text-xs">{currency}</span>{" "}
          <span className="text-xs line-through">{formatPrice(initial_price) + currency}</span>
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
    return discounted_price < normal_price ? discounted_price : normal_price;
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
    <div className={`mx-2 my-4 max-w-lg ${className}`}>
      <div className="flex justify-between">
        <div
          className="flex w-1/2 items-center justify-between rounded-t-xl bg-tertiary px-2 py-1.5"
          title={`Last check: ${getLastCheckTimeTitle()}`}
        >
          <div className="flex items-center justify-center">
            <Image className="h-5 w-5" src={ClockPrimarySvg} alt="next product check" />
          </div>
          <TextImportant className="w-full text-center text-sm leading-4 text-primary">
            {status === TRACK_STATUS_ENABLED
              ? convertMilliseconds(created_at - Date.now() + check_interval)
              : getLastCheckTimeTitle()}
          </TextImportant>
        </div>
        <div className="flex items-start space-x-2">
          <InvisibleButton className="flex w-fit items-center justify-center">
            <Image className="w-9 sm:w-7" src={DeleteSvg} alt="delete" title="Delete the track" />
          </InvisibleButton>
          <InvisibleButton className="flex w-fit items-center justify-center">
            <Image className="w-9 sm:w-7" src={EditSvg} alt="edit" title="Edit the track" />
          </InvisibleButton>
          <InvisibleButton className="flex w-fit items-center justify-center">
            <Image
              className="w-9 sm:w-7"
              src={status !== TRACK_STATUS_ENABLED ? StartSvg : PauseSvg}
              alt="start pause"
              title={`${status !== TRACK_STATUS_ENABLED ? "Start" : "Stop"} the track`}
            />
          </InvisibleButton>
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
      </div>
    </div>
  );
};

export default Track;
