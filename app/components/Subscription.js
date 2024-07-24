import { convertMilliseconds, formatMonthlyAnnuallyPrice } from "@/utils/Helper";
import ButtonLink from "./ButtonLink";
import Separator from "./Separator";
import Subtitle from "./Subtitle";
import TextImportant from "./TextImportant";
import TextNormal from "./TextNormal";
import Image from "next/image";

const Subscription = ({ className = "", type = "contrast", planInfo }) => {
  const {
    monthlyAnnually,
    title,
    price,
    description,
    trackCheckInterval,
    trackEnabledMaxProducts,
    trackDisabledMaxProducts,
    trackMaxUserSearchesPerDay,
  } = planInfo;

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
    <div
      className={`${type === "contrast" ? "border-primary bg-contrast text-primary" : "border-contrast bg-primary text-contrast"} relative w-80 rounded-2xl border-2 ${className}`}
    >
      {type === "primary" && (
        <div className="absolute right-0 top-0 m-0.5 rounded-bl-xl rounded-tr-xl bg-contrast px-5 py-1">
          <TextNormal className="text-xs uppercase text-primary">Popular</TextNormal>
        </div>
      )}
      <div className="space-y-6 px-4 py-4">
        <Subtitle className="text-lg">{title}</Subtitle>
        <TextImportant className="text-2xl leading-4">
          {formatMonthlyAnnuallyPrice(monthlyAnnually, price)}
          <span className="text-xs">€ {billingTime}</span>
        </TextImportant>
        <TextImportant className="leading-4">{description}</TextImportant>
        <div className="flex items-center justify-center">
          <ButtonLink href="/checkout" type={type === "contrast" ? "primary" : "tertiary"}>
            Select this plan
          </ButtonLink>
        </div>
      </div>
      <Separator type={type === "contrast" ? "primary" : "contrast"} />
      <div className="space-y-3 px-4 py-4">
        <Subtitle className="text-sm">Features</Subtitle>
        <div className="flex items-center space-x-4">
          <Image src="assets/svg/icons/circle-check.svg" alt="circle check" />
          <TextNormal className="text-sm uppercase">
            Track <span className="font-bold">{trackEnabledMaxProducts}</span> product(s) at a time
          </TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <Image src="assets/svg/icons/circle-check.svg" alt="circle check" />
          <TextNormal className="text-sm uppercase">
            Check performed every{" "}
            <span className="font-bold">{convertMilliseconds(trackCheckInterval)}</span>
          </TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <Image src="assets/svg/icons/circle-check.svg" alt="circle check" />
          <TextNormal className="text-sm uppercase">
            <span className="font-bold">{trackDisabledMaxProducts} products</span> maximum in the
            wishlist
          </TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <Image src="assets/svg/icons/circle-check.svg" alt="circle check" />
          <TextNormal className="text-sm uppercase">
            <span className="font-bold">{trackMaxUserSearchesPerDay} user searches</span> per day
          </TextNormal>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
