import { convertMillisecondsToText, formatMonthlyAnnuallyPrice } from "@/modules/TextFormatter";
import Separator from "./Separator";
import Subtitle from "./Subtitle";
import TextImportant from "./TextImportant";
import TextNormal from "./TextNormal";
import Image from "next/image";
import CircleCheckSecondarySvg from "../../public/assets/svg/icons/circle-check-secondary.svg";
import CircleCheckTertiarySvg from "../../public/assets/svg/icons/circle-check-tertiary.svg";
import Constants from "@/utils/Constants";
import Button from "./Button";

const {
  SUBSCRIPTION_PLAN_ID_FREE,
  SUBSCRIPTION_PLAN_ID_BASIC,
  SUBSCRIPTION_PLAN_ID_PRO,
  SUBSCRIPTION_PLAN_ID_PREMIUM,
  SUBSCRIPTION_PLAN_ID_ENTREPRISE,
  SUBSCRIPTION_PLAN_ID_BUSINESS,
  SUBSCRIPTION_PLAN_ID_ELITE,
  SUBSCRIPTION_PLAN_ID_ULTIMATE,
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

  let billingPeriodText;

  switch (monthlyAnnually) {
    case undefined:
    case null:
      billingPeriodText = "forever";
      break;

    case true:
      billingPeriodText = "per year";
      break;

    case false:
      billingPeriodText = "per month";
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

      case SUBSCRIPTION_PLAN_ID_ENTREPRISE:
        return (
          <>
            Perfect for starting <br />
            <span className={spanTextColor}>your business with a</span> <br />
            generous offer!
          </>
        );

      case SUBSCRIPTION_PLAN_ID_BUSINESS:
        return (
          <>
            A business offer that will <br />
            <span className={spanTextColor}>meet your expectations</span> <br />
            and unique needs!
          </>
        );

      case SUBSCRIPTION_PLAN_ID_ELITE:
        return (
          <>
            A perfect balance between <br />
            <span className={spanTextColor}>quality and quantity! Take it</span> <br />
            to the next level!
          </>
        );

      case SUBSCRIPTION_PLAN_ID_ULTIMATE:
        return (
          <>
            Simply the best <br />
            <span className={spanTextColor}>offer we can</span> <br />
            offer you today!
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
          <span className="text-xs">€ {billingPeriodText}</span>
        </TextImportant>
        <TextImportant className="leading-4">{getDescriptionByPlanId()}</TextImportant>
        {callToAction && (
          <div className="flex items-center justify-center">
            <Button type={type === "contrast" ? "primary" : "secondary"}>Select this plan</Button>
          </div>
        )}
      </div>
      <Separator type={type === "contrast" ? "primary" : "contrast"} />
      <div className="space-y-3 px-4 py-4">
        <Subtitle className="text-sm">Features</Subtitle>
        <div className="flex items-center space-x-4">
          <Image className="h-9 w-9" src={getCircleCheckSvgByType()} alt="circle check" />
          <TextNormal className="text-sm uppercase">
            Track <span className="font-bold">{trackEnabledMaxProducts} </span>
            {trackEnabledMaxProducts > 1 ? "products simultaneously" : "product at a time"}
          </TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <Image className="h-9 w-9" src={getCircleCheckSvgByType()} alt="circle check" />
          <TextNormal className="text-sm uppercase">
            Check performed every
            <span className="font-bold"> {convertMillisecondsToText(trackCheckInterval)}</span>
          </TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <Image className="h-9 w-9" src={getCircleCheckSvgByType()} alt="circle check" />
          <TextNormal className="text-sm uppercase">
            <span className="font-bold">{trackDisabledMaxProducts} products</span> maximum in the
            wishlist
          </TextNormal>
        </div>
        <div className="flex items-center space-x-4">
          <Image className="h-9 w-9" src={getCircleCheckSvgByType()} alt="circle check" />
          <TextNormal className="text-sm uppercase">
            <span className="font-bold">{trackMaxUserSearchesPerDay} user searches</span> per day
          </TextNormal>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
