"use client";

import { convertMillisecondsToText, formatPrice } from "@/modules/TextFormatter";
import Separator from "./Separator";
import Subtitle from "./Subtitle";
import TextImportant from "./TextImportant";
import TextNormal from "./TextNormal";
import Image from "next/image";
import CircleCheckSecondarySvg from "../../public/assets/svg/icons/circle-check-secondary.svg";
import CircleCheckTertiarySvg from "../../public/assets/svg/icons/circle-check-tertiary.svg";
import Constants from "@/utils/Constants";
import Button from "./Button";
import getPlanData from "@/modules/PlanData";

const {
  SUBSCRIPTION_STRIPE_PRICE_ID_FREE,
  SUBSCRIPTION_STRIPE_PRICE_ID_BASIC,
  SUBSCRIPTION_STRIPE_PRICE_ID_PRO,
  SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM,
  SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE,
  SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS,
  SUBSCRIPTION_STRIPE_PRICE_ID_ELITE,
  SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE,
  SUBSCRIPTION_BILLING_PERIOD_MONTH,
  SUBSCRIPTION_BILLING_PERIOD_YEAR,
  SUBSCRIPTION_BILLING_PERIOD_FOREVER,
} = Constants;

const Plan = ({ className = "", hasCallToAction = true, stripePriceId, billingPeriod }) => {
  const {
    name,
    price,
    track_check_interval,
    track_enabled_max_products,
    track_disabled_max_products,
    track_user_max_searches_per_day,
    popular,
  } = getPlanData(stripePriceId);

  const getBillingPeriodText = () => {
    switch (billingPeriod) {
      default:
      case SUBSCRIPTION_BILLING_PERIOD_MONTH:
        return "per month";

      case SUBSCRIPTION_BILLING_PERIOD_YEAR:
        return "per year";

      case SUBSCRIPTION_BILLING_PERIOD_FOREVER:
        return "forever";
    }
  };

  const getDescriptionByStripePriceId = () => {
    const spanTextColor = popular ? "text-secondary" : "text-tertiary";

    switch (stripePriceId) {
      case SUBSCRIPTION_STRIPE_PRICE_ID_FREE:
      default:
        return (
          <>
            Our free plan to test our <br />
            <span className={spanTextColor}>application with</span> <br />
            confidence!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_BASIC:
        return (
          <>
            Perfect for a regular and <br />
            <span className={spanTextColor}>reliable tracking.</span>
            <br />
            Don't wait any longer!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_PRO:
        return (
          <>
            Interested in multiple
            <br />
            <span className={spanTextColor}> products at once? </span>
            <br />
            Then click here!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM:
        return (
          <>
            Find your favorite products <br />
            <span className={spanTextColor}>quickly by choosing</span>
            <br />
            this option!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE:
        return (
          <>
            Perfect for starting <br />
            <span className={spanTextColor}>your business with a</span> <br />
            generous offer!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS:
        return (
          <>
            A business offer that will <br />
            <span className={spanTextColor}>meet your expectations</span> <br />
            and unique needs!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_ELITE:
        return (
          <>
            A perfect balance between <br />
            <span className={spanTextColor}>quality and quantity!</span> <br />
            Take it to the next level!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE:
        return (
          <>
            Simply the best <br />
            <span className={spanTextColor}>offer we can</span> <br />
            provide you today!
          </>
        );
    }
  };

  const formatPriceByBillingPeriod = () => {
    if (typeof price !== "number") {
      return price;
    }

    let formattedPrice = 0;
    switch (billingPeriod) {
      default:
      case SUBSCRIPTION_BILLING_PERIOD_MONTH:
        formattedPrice = price;
        break;

      case SUBSCRIPTION_BILLING_PERIOD_YEAR:
        formattedPrice = Math.round(price * 12 * 0.75) - 0.01;
        break;

      case SUBSCRIPTION_BILLING_PERIOD_FOREVER:
        formattedPrice = 0;
        break;
    }

    return formatPrice(formattedPrice);
  };

  const getCircleCheckSvgByPopularity = () => {
    return popular ? CircleCheckSecondarySvg : CircleCheckTertiarySvg;
  };

  return (
    <div
      className={`${popular ? "border-contrast bg-primary text-contrast" : "border-primary bg-contrast text-primary"} relative w-80 rounded-2xl border-2 ${className}`}
    >
      {popular && (
        <div className="absolute right-0 top-0 m-0.5 rounded-bl-xl rounded-tr-xl bg-contrast px-5 py-1">
          <TextNormal className="text-xs uppercase text-primary">Popular</TextNormal>
        </div>
      )}
      <div className="space-y-6 px-4 py-4">
        <Subtitle className="text-lg">{name}</Subtitle>
        <TextImportant className="text-2xl leading-4">
          {formatPriceByBillingPeriod()}
          <span className="text-xs">€ {getBillingPeriodText()}</span>
        </TextImportant>
        <TextImportant className="leading-4">{getDescriptionByStripePriceId()}</TextImportant>
        {hasCallToAction && (
          <div className="flex items-center justify-center">
            <Button type={popular ? "secondary" : "primary"}>Select this plan</Button>
          </div>
        )}
      </div>
      <Separator type={popular ? "contrast" : "primary"} />
      <div className="space-y-3 px-4 py-4">
        <Subtitle className="text-sm">Features</Subtitle>
        <div className="flex items-center space-x-4">
          <Image className="h-9 w-9" src={getCircleCheckSvgByPopularity()} alt="circle check" />
          <TextNormal className="text-sm uppercase">
            Track <span className="font-bold">{track_enabled_max_products} </span>
            {track_enabled_max_products > 1 ? "products simultaneously" : "product at a time"}
          </TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <Image className="h-9 w-9" src={getCircleCheckSvgByPopularity()} alt="circle check" />
          <TextNormal className="text-sm uppercase">
            Check performed every
            <span className="font-bold"> {convertMillisecondsToText(track_check_interval)}</span>
          </TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <Image className="h-9 w-9" src={getCircleCheckSvgByPopularity()} alt="circle check" />
          <TextNormal className="text-sm uppercase">
            <span className="font-bold">{track_disabled_max_products} products</span> maximum in the
            wishlist
          </TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <Image className="h-9 w-9" src={getCircleCheckSvgByPopularity()} alt="circle check" />
          <TextNormal className="text-sm uppercase">
            <span className="font-bold">{track_user_max_searches_per_day} user searches</span> per
            day
          </TextNormal>
        </div>
      </div>
    </div>
  );
};

export default Plan;
