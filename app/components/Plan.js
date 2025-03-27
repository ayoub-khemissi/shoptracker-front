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
      router.push("/tracker");
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
      className={`${
        popular
          ? "border-sky-300/30 bg-gradient-to-br from-sky-400/20 via-white/10 to-blue-600/20 shadow-lg shadow-sky-500/20"
          : "border-primary/30 bg-contrast/80"
      } relative w-80 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${className}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600 px-6 py-1.5 shadow-lg">
          <TextNormal className="text-xs font-semibold uppercase tracking-wider text-white">
            Most Popular ✨
          </TextNormal>
        </div>
      )}

      <div className="space-y-6 p-6">
        <div className="space-y-2 text-center">
          <Subtitle className={`text-xl font-bold ${popular ? "text-sky-300" : "text-primary"}`}>
            {name}
          </Subtitle>
          <TextImportant
            className={`text-3xl font-bold ${popular ? "text-white" : "text-primary"}`}
          >
            {formatPrice(price)}
            <span className="ml-1 text-sm opacity-80">€ {getBillingPeriodText()}</span>
          </TextImportant>
          <TextImportant
            className={`text-sm leading-6 ${popular ? "text-sky-100" : "text-primary/80"}`}
          >
            {getDescriptionByStripePriceId()}
          </TextImportant>
        </div>

        {hasCallToAction && (
          <div className="flex items-center justify-center pt-2">
            {user ? (
              <Button
                type="contrast"
                onClick={checkoutSession}
                className={`w-full rounded-xl py-3 font-medium transition-all duration-300 ${
                  popular
                    ? "bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-500/20 hover:from-sky-500 hover:to-blue-700 hover:shadow-xl"
                    : "border-2 border-primary hover:bg-primary hover:text-contrast"
                }`}
              >
                Select this plan
              </Button>
            ) : (
              <ButtonLink
                type="contrast"
                href="/register"
                className={`w-full rounded-xl py-3 font-medium transition-all duration-300 ${
                  popular
                    ? "bg-gradient-to-r from-sky-400 to-blue-600 text-white shadow-lg shadow-sky-500/20 hover:from-sky-500 hover:to-blue-700 hover:shadow-xl"
                    : "border-2 border-primary hover:bg-primary hover:text-contrast"
                }`}
              >
                Select this plan
              </ButtonLink>
            )}
          </div>
        )}
      </div>

      <Separator type={popular ? "contrast" : "primary"} className="opacity-20" />

      <div className="space-y-4 p-6">
        <Subtitle
          className={`text-sm uppercase tracking-wider ${popular ? "text-sky-300" : "text-primary"}`}
        >
          Features
        </Subtitle>

        <div className="space-y-4">
          {[
            `Track ${track_enabled_max_products} ${track_enabled_max_products > 1 ? "products simultaneously" : "product at a time"}`,
            `Check performed every ${convertMillisecondsToText(track_check_interval)}`,
            `${track_disabled_max_products} products maximum in the wishlist`,
            `${track_user_max_searches_per_day} user searches per day`,
          ].map((feature, index) => (
            <div key={index} className="group flex items-center space-x-3">
              <div
                className={`flex-shrink-0 rounded-full p-1 ${
                  popular ? "bg-gradient-to-br from-sky-400 to-blue-600" : "bg-primary/10"
                }`}
              >
                <Image
                  className={`h-4 w-4 ${popular ? "brightness-200" : ""}`}
                  src={getCircleCheckSvgByPopularity()}
                  alt="feature check"
                />
              </div>
              <TextNormal
                className={`text-sm ${
                  popular
                    ? "text-sky-100/90 group-hover:text-white"
                    : "text-primary/80 group-hover:text-primary"
                } transition-colors duration-200`}
              >
                {feature}
              </TextNormal>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Plan;
