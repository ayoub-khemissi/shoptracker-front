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
import { useAuthContext } from "../contexts/AuthContext";
import ButtonLink from "./ButtonLink";
import { fetchData } from "@/modules/Fetch";
import { useToast } from "../contexts/ToastContext";
import { redirectToCheckout } from "@/modules/Stripe";
import { useRouter } from "next/navigation";

const {
  SUBSCRIPTION_STRIPE_PRICE_ID_FREE,
  SUBSCRIPTION_STRIPE_PRICE_ID_BASIC_MONTHLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_PRO_MONTHLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM_MONTHLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE_MONTHLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS_MONTHLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_ELITE_MONTHLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_MONTHLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_BASIC_ANNUALLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_PRO_ANNUALLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM_ANNUALLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE_ANNUALLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS_ANNUALLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_ELITE_ANNUALLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_ANNUALLY,
  SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
  SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
  SUBSCRIPTION_BILLING_PERIOD_FOREVER,
} = Constants;

const Plan = ({ className = "", hasCallToAction = true, stripePriceId }) => {
  const { user } = useAuthContext();
  const { showToast } = useToast();
  const router = useRouter();
  const {
    name,
    price,
    track_check_interval,
    track_enabled_max_products,
    track_disabled_max_products,
    track_user_max_searches_per_day,
    popular,
    billingPeriod,
  } = getPlanData(stripePriceId);

  const getBillingPeriodText = () => {
    switch (billingPeriod) {
      default:
      case SUBSCRIPTION_BILLING_PERIOD_MONTHLY:
      case SUBSCRIPTION_BILLING_PERIOD_ANNUALLY:
        return "per month";

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

      case SUBSCRIPTION_STRIPE_PRICE_ID_BASIC_MONTHLY:
      case SUBSCRIPTION_STRIPE_PRICE_ID_BASIC_ANNUALLY:
        return (
          <>
            Perfect for a regular and <br />
            <span className={spanTextColor}>reliable tracking.</span>
            <br />
            Don't wait any longer!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_PRO_MONTHLY:
      case SUBSCRIPTION_STRIPE_PRICE_ID_PRO_ANNUALLY:
        return (
          <>
            Interested in multiple
            <br />
            <span className={spanTextColor}> products at once? </span>
            <br />
            Then click here!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM_MONTHLY:
      case SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM_ANNUALLY:
        return (
          <>
            Find your favorite products <br />
            <span className={spanTextColor}>quickly by choosing</span>
            <br />
            this option!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE_MONTHLY:
      case SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE_ANNUALLY:
        return (
          <>
            Perfect for starting <br />
            <span className={spanTextColor}>your business with a</span> <br />
            generous offer!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS_MONTHLY:
      case SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS_ANNUALLY:
        return (
          <>
            A business offer that will <br />
            <span className={spanTextColor}>meet your expectations</span> <br />
            and unique needs!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_ELITE_MONTHLY:
      case SUBSCRIPTION_STRIPE_PRICE_ID_ELITE_ANNUALLY:
        return (
          <>
            A perfect balance between <br />
            <span className={spanTextColor}>quality and quantity!</span> <br />
            Take it to the next level!
          </>
        );

      case SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_MONTHLY:
      case SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_ANNUALLY:
        return (
          <>
            Simply the best <br />
            <span className={spanTextColor}>offer we can</span> <br />
            provide you today!
          </>
        );
    }
  };

  const getCircleCheckSvgByPopularity = () => {
    return popular ? CircleCheckSecondarySvg : CircleCheckTertiarySvg;
  };

  const checkoutSession = async () => {
    if (stripePriceId === SUBSCRIPTION_STRIPE_PRICE_ID_FREE) {
      router.push("/tracklist");
      return;
    }

    const response = await fetchData(`/checkout/session`, "POST", {
      stripePriceId: stripePriceId,
    });

    switch (response?.status) {
      case 200: {
        const { sessionId } = (await response.json()).data;
        redirectToCheckout(sessionId);
        break;
      }

      default:
        showToast("Failed to create a checkout session. Please try again later.", "error");
        break;
    }
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
          {formatPrice(price)}
          <span className="text-xs">€ {getBillingPeriodText()}</span>
        </TextImportant>
        <TextImportant className="leading-4">{getDescriptionByStripePriceId()}</TextImportant>
        {hasCallToAction && (
          <div className="flex items-center justify-center">
            {user ? (
              <Button type={popular ? "secondary" : "primary"} onClick={checkoutSession}>
                Select this plan
              </Button>
            ) : (
              <ButtonLink type={popular ? "secondary" : "primary"} href="/register">
                Select this plan
              </ButtonLink>
            )}
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
