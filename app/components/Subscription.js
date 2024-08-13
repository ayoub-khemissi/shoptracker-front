import { convertMilliseconds, formatMonthlyAnnuallyPrice } from "@/utils/Helper";
import ButtonLink from "./ButtonLink";
import Separator from "./Separator";
import Subtitle from "./Subtitle";
import TextImportant from "./TextImportant";
import TextNormal from "./TextNormal";
import Image from "next/image";
import CircleCheckSecondarySvg from "../../public/assets/svg/icons/circle-check-secondary.svg";
import CircleCheckTertiarySvg from "../../public/assets/svg/icons/circle-check-tertiary.svg";
import Constants from "@/utils/Constants";

const {
  SUBSCRIPTION_PLAN_ID_FREE,
  SUBSCRIPTION_PLAN_ID_BASIC,
  SUBSCRIPTION_PLAN_ID_PRO,
  SUBSCRIPTION_PLAN_ID_PREMIUM,
  SUBSCRIPTION_PLAN_ID_CUSTOM,
} = Constants;

const Subscription = ({ className = "", type = "contrast", callToAction = true, planInfo }) => {
  const {
    id,
    monthlyAnnually,
    title,
    price,
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

  const getDescriptionByPlanId = () => {
    const spanTextColor = type === "contrast" ? "text-tertiary" : "text-secondary";

    switch (id) {
      case SUBSCRIPTION_PLAN_ID_FREE:
      default:
        return (
          <>
            Our free plan to test our <br />
            <span className={spanTextColor}>application with</span> <br />
            confidence!
          </>
        );

      case SUBSCRIPTION_PLAN_ID_BASIC:
        return (
          <>
            Perfect for regular and reliable tracking <br />
            <span className={spanTextColor}>of your products.</span>
            <br />
            Don't wait any longer!
          </>
        );

      case SUBSCRIPTION_PLAN_ID_PRO:
        return (
          <>
            Interested in multiple products at once?
            <br />
            <span className={spanTextColor}> Then this plan </span>
            <br />
            is made for you!
          </>
        );

      case SUBSCRIPTION_PLAN_ID_PREMIUM:
        return (
          <>
            Find your favorite products <br />
            <span className={spanTextColor}>quickly by choosing</span>
            <br />
            this option!
          </>
        );

      case SUBSCRIPTION_PLAN_ID_CUSTOM:
        return (
          <>
            Select a plan that fits <br />
            <span className={spanTextColor}>your needs by clicking here.</span> <br />
            Get your custom tracking!
          </>
        );
    }
  };

  const getCircleCheckSvgByType = () => {
    return type === "primary" ? CircleCheckSecondarySvg : CircleCheckTertiarySvg;
  };

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
        <TextImportant className="leading-4">{getDescriptionByPlanId()}</TextImportant>
        {callToAction && (
          <div className="flex items-center justify-center">
            <ButtonLink href="/checkout" type={type === "contrast" ? "primary" : "secondary"}>
              Select this plan
            </ButtonLink>
          </div>
        )}
      </div>
      <Separator type={type === "contrast" ? "primary" : "contrast"} />
      <div className="space-y-3 px-4 py-4">
        <Subtitle className="text-sm">Features</Subtitle>
        <div className="flex items-center space-x-4">
          <Image src={getCircleCheckSvgByType()} alt="circle check" />
          <TextNormal className="text-sm uppercase">
            Track <span className="font-bold">{trackEnabledMaxProducts} </span>
            {trackEnabledMaxProducts > 1 ? "products simultaneously" : "product at a time"}
          </TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <Image src={getCircleCheckSvgByType()} alt="circle check" />
          <TextNormal className="text-sm uppercase">
            Check performed every
            <span className="font-bold"> {convertMilliseconds(trackCheckInterval)}</span>
          </TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <Image src={getCircleCheckSvgByType()} alt="circle check" />
          <TextNormal className="text-sm uppercase">
            <span className="font-bold">{trackDisabledMaxProducts} products</span> maximum in the
            wishlist
          </TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <Image src={getCircleCheckSvgByType()} alt="circle check" />
          <TextNormal className="text-sm uppercase">
            <span className="font-bold">{trackMaxUserSearchesPerDay} user searches</span> per day
          </TextNormal>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
