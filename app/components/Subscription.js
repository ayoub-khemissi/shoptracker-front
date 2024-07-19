import { convertMilliseconds, formatMonthlyAnnuallyPrice } from "@/utils/Helper";
import ButtonLink from "./ButtonLink";
import Separator from "./Separator";
import Subtitle from "./Subtitle";
import TextImportant from "./TextImportant";
import TextNormal from "./TextNormal";

const Subscription = ({ className = "", type = "contrast", planInfo }) => {
  const { monthlyAnnually, title, price, description, trackCheckInterval, trackEnabledMaxProducts, trackDisabledMaxProducts, trackMaxUserSearchesPerDay } = planInfo;

  let billingTime;

  switch (monthlyAnnually) {
    case undefined:
    case null:
      billingTime = "forever";
      break;

    case true:
      billingTime = "per year";
      break;

    case false:
      billingTime = "per month";
      break;
  }

  return (
    <div className={`${type === "contrast" ? "bg-contrast text-primary border-primary" : "bg-primary text-contrast border-contrast"} rounded-2xl border-2 w-80 ${className}`}>
      <div className="px-4 py-4 space-y-4">
        <Subtitle className="text-lg">{title}</Subtitle>
        <TextImportant className="text-2xl">{formatMonthlyAnnuallyPrice(monthlyAnnually, price)}<span className="text-xs">€ {billingTime}</span></TextImportant>
        <TextImportant>{description}</TextImportant>
        <div className="flex justify-center items-center">
          <ButtonLink href="/checkout" type={type === "contrast" ? "primary" : "tertiary"}>Select this plan</ButtonLink>
        </div>
      </div>
      <Separator type={type === "contrast" ? "primary" : "contrast"} />
      <div className="px-4 py-4 space-y-3">
        <Subtitle className="text-sm">Features</Subtitle>
        <div className="flex items-center space-x-4">
          <img src="assets/svg/icons/circle-check.svg" />
          <TextNormal className="text-sm uppercase">Track <span className="font-bold">{trackEnabledMaxProducts}</span> product(s) at a time</TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <img src="assets/svg/icons/circle-check.svg" />
          <TextNormal className="text-sm uppercase">Check performed every <span className="font-bold">{convertMilliseconds(trackCheckInterval)}</span></TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <img src="assets/svg/icons/circle-check.svg" />
          <TextNormal className="text-sm uppercase"><span className="font-bold">{trackDisabledMaxProducts} products</span> maximum in the wishlist</TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <img src="assets/svg/icons/circle-check.svg" />
          <TextNormal className="text-sm uppercase"><span className="font-bold">{trackMaxUserSearchesPerDay} user searches</span> per day</TextNormal>
        </div>
      </div>
    </div>
  );
}

export default Subscription;
