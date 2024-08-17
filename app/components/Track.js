import { convertMilliseconds, formatPrice, truncateString } from "@/utils/Helper";
import TextImportant from "./TextImportant";
import Title from "./Title";
import InvisibleButton from "./InvisibleButton";
import NavLink from "./NavLink";
import Constants from "@/utils/Constants";
import Image from "next/image";
import ClockPrimarySvg from "../../public/assets/svg/icons/clock-primary.svg";

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
    check_interval,
    status,
  } = product;

  const formatFullPrice = () => {
    const price = getLowestPrice();

    if (price < initial_price) {
      return (
        <>
          {formatPrice(price)}
          <span className="text-xs">{currency.value}</span>{" "}
          <span className="text-xs line-through">
            {formatPrice(initial_price) + currency.value}
          </span>
        </>
      );
    } else {
      return (
        <>
          {formatPrice(price.value)}
          <span className="text-xs">{currency.value}</span>
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

  const getAvailabilitySvgName = () => {
    switch (availability.value) {
      case true:
        return "circle-check-success";

      case false:
      default:
        return "circle-cross-error";
    }
  };

  const getAvailabilityText = () => {
    switch (availability.value) {
      case true:
        return "In stock";

      case false:
      default:
        return "Out of stock";
    }
  };

  const getLowestPrice = () => {
    return discounted_price.value < normal_price.value
      ? discounted_price.value
      : normal_price.value;
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
      <div className="flex items-center justify-end">
        <div className="flex w-1/2 items-center justify-between rounded-t-xl bg-tertiary px-2 py-1">
          <div className="flex items-center justify-center">
            <Image className="h-5 w-5" src={ClockPrimarySvg} alt="next product check" />
          </div>
          <TextImportant className="w-5/6 text-center text-sm leading-4 text-primary">
            {convertMilliseconds(created_at - Date.now() + check_interval)}
          </TextImportant>
        </div>
      </div>
      <div className="rounded-b-lg rounded-tl-lg border-2 border-primary">
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
        <div className="space-y-2 border-b-2 border-primary px-5 py-4">
          <Title className="text-center text-lg leading-5">{truncateString(name.value, 50)}</Title>
          <TextImportant className="py-1 text-center text-sm leading-4 text-primary">
            {truncateString(description.value, 80)}
          </TextImportant>
          <div className="flex w-full flex-wrap items-center justify-evenly">
            <div className="flex items-center justify-center space-x-4">
              <TextImportant className="w-1/2 text-center text-lg leading-3">
                {formatFullPrice()}
              </TextImportant>
              <div className="flex items-center justify-center">
                <Image
                  width={40}
                  height={40}
                  src={`assets/svg/icons/${getPriceStatusSvgName(price_status)}.svg`}
                  alt="price status"
                />
              </div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center justify-center">
                <Image
                  width={40}
                  height={40}
                  src={`assets/svg/icons/${getAvailabilitySvgName(availability.value)}.svg`}
                  alt="availability status"
                />
              </div>
              <TextImportant className="py-1 text-center leading-4 text-primary">
                {getAvailabilityText(availability.value)}
              </TextImportant>
            </div>
          </div>
        </div>
        <div className="bg-primary py-2">
          <InvisibleButton className="flex w-full items-center justify-center">
            <TextImportant className="text-center leading-4 text-contrast">
              {status === TRACK_STATUS_ENABLED ? "Stop tracking ❌" : "Start tracking 🏁"}
            </TextImportant>
          </InvisibleButton>
        </div>
      </div>
    </div>
  );
};

export default Track;
