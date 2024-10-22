"use client";

import TextImportant from "./TextImportant";
import Plan from "./Plan";
import { useState } from "react";
import Title from "./Title";
import Switch from "./Switch";
import Constants from "@/utils/Constants";
import TextSeparator from "./TextSeparator";
import Button from "./Button";

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

const PricingPage = () => {
  const [isAnnually, setIsAnnually] = useState(false);
  const [isBoostPlus, setStarterBoostPlus] = useState(false);

  const getBillingPeriodByIsAnnually = () => {
    return isAnnually ? SUBSCRIPTION_BILLING_PERIOD_YEAR : SUBSCRIPTION_BILLING_PERIOD_MONTH;
  };

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
        {isBoostPlus ? (
          <>
            <Plan
              className="mb-4 2xl:mb-0"
              stripePriceId={SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE}
              billingPeriod={getBillingPeriodByIsAnnually()}
            />
            <Plan
              className="mb-4 2xl:mb-0"
              stripePriceId={SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS}
              billingPeriod={getBillingPeriodByIsAnnually()}
            />
            <Plan
              className="mb-4 2xl:mb-0"
              stripePriceId={SUBSCRIPTION_STRIPE_PRICE_ID_ELITE}
              billingPeriod={getBillingPeriodByIsAnnually()}
            />
            <Plan
              stripePriceId={SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE}
              billingPeriod={getBillingPeriodByIsAnnually()}
            />
          </>
        ) : (
          <>
            <Plan
              className="mb-4 2xl:mb-0"
              stripePriceId={SUBSCRIPTION_STRIPE_PRICE_ID_FREE}
              billingPeriod={SUBSCRIPTION_BILLING_PERIOD_FOREVER}
            />
            <Plan
              className="mb-4 2xl:mb-0"
              stripePriceId={SUBSCRIPTION_STRIPE_PRICE_ID_BASIC}
              billingPeriod={getBillingPeriodByIsAnnually()}
            />
            <Plan
              className="mb-4 2xl:mb-0"
              stripePriceId={SUBSCRIPTION_STRIPE_PRICE_ID_PRO}
              billingPeriod={getBillingPeriodByIsAnnually()}
            />
            <Plan
              stripePriceId={SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM}
              billingPeriod={getBillingPeriodByIsAnnually()}
            />
          </>
        )}
      </div>
      <TextSeparator className="py-4">Or</TextSeparator>
      <div className="flex items-center justify-center">
        <Button>Request a custom offer 💎</Button>
      </div>
    </>
  );
};

export default PricingPage;
