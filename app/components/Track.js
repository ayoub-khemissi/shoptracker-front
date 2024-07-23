import { convertMilliseconds, formatPrice, truncateString } from "@/utils/Helper";
import TextImportant from "./TextImportant";
import Title from "./Title";
import InvisibleButton from "./InvisibleButton";
import NavLink from "./NavLink";
import Constants from "@/utils/Constants";

const { TRACK_STATUS_ENABLED } = Constants;

const Track = ({ className = "", number, product }) => {
  const { url, name, description, initial_price, normal_price, discounted_price, currency, availability, price_status, created_at, check_interval, status } = product;

  const formatFullPrice = () => {
    const price = getLowestPrice();

    if (price < initial_price) {
      return <>{formatPrice(price)}<span className="text-xs">{currency.value}</span> <span className="text-xs line-through">{formatPrice(initial_price) + currency.value}</span></>;
    } else {
      return <>{formatPrice(price.value)}<span className="text-xs">{currency.value}</span></>;
    }
  }

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
  }

  const getPriceStatusText = () => {
    switch (price_status) {
      case 1:
        return "Decreasing price";

      case 2:
        return "Rising price";

      case 3:
      default:
        return "Stable price";
    }
  }

  const getAvailabilitySvgName = () => {
    switch (availability.value) {
      case true:
        return "in-stock";

      case false:
      default:
        return "out-of-stock";
    }
  }

  const getAvailabilityText = () => {
    switch (availability.value) {
      case true:
        return "In stock";

      case false:
      default:
        return "Out of stock";
    }
  }

  const getLowestPrice = () => {
    return discounted_price.value < normal_price.value ? discounted_price.value : normal_price.value;
  }

  const getSiteDomain = () => {
    try {
      const cleanedUrl = url.replace(/^[a-zA-Z]+:\/\//, '');
      const domain = cleanedUrl.split('/')[0];
      const parts = domain.split('.');

      return parts.length > 2 ? parts.slice(-2).join('.') : domain;
    } catch (e) {
      return "Unknown website";
    }
  }

  return (
    <div className={`border-2 border-primary rounded-lg min-w-96 w-1/3 mx-2 my-4 ${className}`}>
      <div className="flex justify-center items-center bg-primary py-1.5 px-2">
        <NavLink target="_blank" type="contrast" href={url} className="text-contrast text-center w-full md:text-xl text-base">#{number + 1} {getSiteDomain()} 🔗</NavLink>
      </div>
      <div className="px-5 py-4 space-y-2 border-b-2 border-primary">
        <Title className="text-primary lg:text-xl text-lg text-center leading-5">{truncateString(name.value, 50)}</Title>
        <TextImportant className="leading-4 text-primary text-center py-1">
          {truncateString(description.value, 120)}
        </TextImportant>
      </div>
      <div className="px-5 py-2 space-y-1">
        <div className="flex justify-between items-center">
          <TextImportant className="leading-2 md:text-lg text-sm w-5/12">{formatFullPrice()}</TextImportant>
          <div className="flex justify-center items-center w-2/12">
            <img className="w-10 h-10" src={`assets/svg/icons/${getPriceStatusSvgName(price_status)}.svg`} />
          </div>
          <TextImportant className="leading-4 text-primary text-right md:text-lg text-sm py-1 w-5/12">
            {getPriceStatusText(price_status)}
          </TextImportant>
        </div>
        <div className="flex justify-between items-center">
          <TextImportant className="leading-4 md:text-lg text-sm w-5/12">Availability</TextImportant>
          <div className="flex justify-center items-center w-2/12">
            <img className="w-10 h-10" src={`assets/svg/icons/${getAvailabilitySvgName(availability.value)}.svg`} />
          </div>
          <TextImportant className="leading-4 text-primary text-right md:text-lg text-sm py-1 w-5/12">
            {getAvailabilityText(availability.value)}
          </TextImportant>
        </div>
        <div className="flex justify-between items-center">
          <TextImportant className="leading-4 md:text-lg text-sm w-5/12">Next check</TextImportant>
          <div className="flex justify-center items-center w-2/12">
            <img className="w-10 h-10" src="assets/svg/icons/next-check.svg" />
          </div>
          <TextImportant className="leading-4 text-primary text-right md:text-lg text-sm py-1 w-5/12">
            {convertMilliseconds(created_at - Date.now() + check_interval)}
          </TextImportant>
        </div>
      </div>
      <div className="bg-primary py-2">
        <InvisibleButton className="flex justify-center items-center w-full" onClick={() => { }}>
          <TextImportant className="leading-4 text-contrast text-center">{status === TRACK_STATUS_ENABLED ? "Stop tracking ❌" : "Start tracking 🏁"}</TextImportant>
        </InvisibleButton>
      </div>
    </div>
  );
}

export default Track;
