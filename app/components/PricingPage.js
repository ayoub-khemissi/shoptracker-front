"use client";

import TextImportant from "./TextImportant";
import Plan from "./Plan";
import { useState } from "react";
import Title from "./Title";
import Switch from "./Switch";
import Constants from "@/utils/Constants";
import { NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL } from "@/utils/Config";
import TextSeparator from "./TextSeparator";
import ButtonLink from "./ButtonLink";

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
} = Constants;

const PricingPage = () => {
  const [isAnnually, setIsAnnually] = useState(false);
  const [isBoostPlus, setStarterBoostPlus] = useState(false);

  const starterPlans = [
    { id: SUBSCRIPTION_STRIPE_PRICE_ID_FREE },
    {
      id: isAnnually
        ? SUBSCRIPTION_STRIPE_PRICE_ID_BASIC_ANNUALLY
        : SUBSCRIPTION_STRIPE_PRICE_ID_BASIC_MONTHLY,
    },
    {
      id: isAnnually
        ? SUBSCRIPTION_STRIPE_PRICE_ID_PRO_ANNUALLY
        : SUBSCRIPTION_STRIPE_PRICE_ID_PRO_MONTHLY,
    },
    {
      id: isAnnually
        ? SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM_ANNUALLY
        : SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM_MONTHLY,
    },
  ];

  const boostPlans = [
    {
      id: isAnnually
        ? SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE_ANNUALLY
        : SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE_MONTHLY,
    },
    {
      id: isAnnually
        ? SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS_ANNUALLY
        : SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS_MONTHLY,
    },
    {
      id: isAnnually
        ? SUBSCRIPTION_STRIPE_PRICE_ID_ELITE_ANNUALLY
        : SUBSCRIPTION_STRIPE_PRICE_ID_ELITE_MONTHLY,
    },
    {
      id: isAnnually
        ? SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_ANNUALLY
        : SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_MONTHLY,
    },
  ];

  return (
    <>
      <Title className="pb-3 text-center text-2xl lg:pb-6 lg:text-4xl">
        Choose your subscription plan and enjoy
        <br />{" "}
        <span className="text-secondary transition duration-200 hover:text-tertiary">
          our services now 💫
        </span>
        !
      </Title>
      <div className="flex flex-col items-center justify-center lg:flex-row lg:space-x-20">
        <div className="flex items-center justify-center space-x-2 pb-3 lg:pb-6">
          <TextImportant
            className={`leading-4 transition duration-200 ${isBoostPlus ? "opacity-50" : "opacity-100"} text-right`}
          >
            Starter offers
          </TextImportant>
          <Switch
            checked={isBoostPlus}
            onClick={() => {
              setStarterBoostPlus(!isBoostPlus);
            }}
          />
          <TextImportant
            className={`leading-4 transition duration-200 ${isBoostPlus ? "opacity-100" : "opacity-50"} text-left`}
          >
            Boost + offers
          </TextImportant>
        </div>
        <div className="flex items-center justify-center space-x-2 pb-3 lg:pb-6">
          <TextImportant
            className={`leading-4 transition duration-200 ${isAnnually ? "opacity-50" : "opacity-100"} text-right`}
          >
            Monthly billing
          </TextImportant>
          <Switch
            checked={isAnnually}
            onClick={() => {
              setIsAnnually(!isAnnually);
            }}
          />
          <TextImportant
            className={`leading-4 transition duration-200 ${isAnnually ? "opacity-100" : "opacity-50"} text-left`}
          >
            Annual billing
            <br />
            <span className="text-xs">(save ~25% annually)</span>
          </TextImportant>
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly">
        {(isBoostPlus ? boostPlans : starterPlans).map((plan) => (
          <Plan
            key={plan.id}
            className="mb-4 transition duration-300 hover:scale-105 hover:transform 2xl:mb-0"
            stripePriceId={plan.id}
          />
        ))}
      </div>
      <TextSeparator className="py-4">Or</TextSeparator>
      <div className="flex items-center justify-center">
        <ButtonLink
          href="/contact?subject=custom-offer"
          title={NEXT_PUBLIC_SHOPTRACKER_CUSTOMER_SUPPORT_EMAIL}
        >
          Request a custom offer 👑
        </ButtonLink>
      </div>
    </>
  );
};

export default PricingPage;
