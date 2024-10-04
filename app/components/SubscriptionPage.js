"use client";

import TextImportant from "./TextImportant";
import Subscription from "./Subscription";
import { useState } from "react";
import Title from "./Title";
import Switch from "./Switch";
import Constants from "@/utils/Constants";

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

const SubscriptionPage = () => {
  const [monthlyAnnually, setMonthlyAnnually] = useState(false);
  const [starterBoostPlus, setStarterBoostPlus] = useState(false);

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
            className={`leading-4 transition duration-200 ${starterBoostPlus ? "opacity-50" : "opacity-100"} text-right`}
          >
            Starter offers
          </TextImportant>
          <Switch
            checked={starterBoostPlus}
            onClick={() => {
              setStarterBoostPlus(!starterBoostPlus);
            }}
          />
          <TextImportant
            className={`leading-4 transition duration-200 ${starterBoostPlus ? "opacity-100" : "opacity-50"} text-left`}
          >
            Boost + offers
          </TextImportant>
        </div>
        <div className="flex items-center justify-center space-x-2 pb-3 lg:pb-6">
          <TextImportant
            className={`leading-4 transition duration-200 ${monthlyAnnually ? "opacity-50" : "opacity-100"} text-right`}
          >
            Monthly billing
          </TextImportant>
          <Switch
            checked={monthlyAnnually}
            onClick={() => {
              setMonthlyAnnually(!monthlyAnnually);
            }}
          />
          <TextImportant
            className={`leading-4 transition duration-200 ${monthlyAnnually ? "opacity-100" : "opacity-50"} text-left`}
          >
            Annual billing
            <br />
            <span className="text-xs">(save ~25% annually)</span>
          </TextImportant>
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly">
        {starterBoostPlus ? (
          <>
            <Subscription
              className="mb-4 2xl:mb-0"
              type="contrast"
              planInfo={{
                id: SUBSCRIPTION_PLAN_ID_ENTREPRISE,
                monthlyAnnually: monthlyAnnually,
                title: "Entreprise +",
                price: 279.99,
                trackCheckInterval: 30 * 60 * 1000,
                trackEnabledMaxProducts: 10,
                trackDisabledMaxProducts: 25,
                trackMaxUserSearchesPerDay: 25,
              }}
            />
            <Subscription
              className="mb-4 2xl:mb-0"
              type="contrast"
              planInfo={{
                id: SUBSCRIPTION_PLAN_ID_BUSINESS,
                monthlyAnnually: monthlyAnnually,
                title: "Business +",
                price: 371.99,
                trackCheckInterval: 15 * 60 * 1000,
                trackEnabledMaxProducts: 10,
                trackDisabledMaxProducts: 30,
                trackMaxUserSearchesPerDay: 30,
              }}
            />
            <Subscription
              className="mb-4 2xl:mb-0"
              type="primary"
              planInfo={{
                id: SUBSCRIPTION_PLAN_ID_ELITE,
                monthlyAnnually: monthlyAnnually,
                title: "Elite +",
                price: 688.99,
                trackCheckInterval: 10 * 60 * 1000,
                trackEnabledMaxProducts: 15,
                trackDisabledMaxProducts: 40,
                trackMaxUserSearchesPerDay: 40,
              }}
            />
            <Subscription
              type="contrast"
              planInfo={{
                id: SUBSCRIPTION_PLAN_ID_ULTIMATE,
                monthlyAnnually: monthlyAnnually,
                title: "Ultimate +",
                price: 1239.99,
                trackCheckInterval: 5 * 60 * 1000,
                trackEnabledMaxProducts: 15,
                trackDisabledMaxProducts: 50,
                trackMaxUserSearchesPerDay: 50,
              }}
            />
          </>
        ) : (
          <>
            <Subscription
              className="mb-4 2xl:mb-0"
              type="contrast"
              planInfo={{
                id: SUBSCRIPTION_PLAN_ID_FREE,
                monthlyAnnually: null,
                title: "Free Plan",
                price: 0,
                trackCheckInterval: 48 * 60 * 60 * 1000,
                trackEnabledMaxProducts: 1,
                trackDisabledMaxProducts: 3,
                trackMaxUserSearchesPerDay: 3,
              }}
            />
            <Subscription
              className="mb-4 2xl:mb-0"
              type="contrast"
              planInfo={{
                id: SUBSCRIPTION_PLAN_ID_BASIC,
                monthlyAnnually: monthlyAnnually,
                title: "Basic Plan",
                price: 7.99,
                trackCheckInterval: 6 * 60 * 60 * 1000,
                trackEnabledMaxProducts: 1,
                trackDisabledMaxProducts: 5,
                trackMaxUserSearchesPerDay: 5,
              }}
            />
            <Subscription
              className="mb-4 2xl:mb-0"
              type="primary"
              planInfo={{
                id: SUBSCRIPTION_PLAN_ID_PRO,
                monthlyAnnually: monthlyAnnually,
                title: "Pro Plan",
                price: 25.99,
                trackCheckInterval: 3 * 60 * 60 * 1000,
                trackEnabledMaxProducts: 5,
                trackDisabledMaxProducts: 10,
                trackMaxUserSearchesPerDay: 10,
              }}
            />
            <Subscription
              type="contrast"
              planInfo={{
                id: SUBSCRIPTION_PLAN_ID_PREMIUM,
                monthlyAnnually: monthlyAnnually,
                title: "Premium Plan",
                price: 79.99,
                trackCheckInterval: 30 * 60 * 1000,
                trackEnabledMaxProducts: 5,
                trackDisabledMaxProducts: 15,
                trackMaxUserSearchesPerDay: 15,
              }}
            />
          </>
        )}
      </div>
    </>
  );
};

export default SubscriptionPage;
