import TextImportant from "./TextImportant";
import Subscription from "./Subscription";
import TextSeparator from "./TextSeparator";
import { useState } from "react";
import Title from "./Title";
import Switch from "./Switch";
import Button from "./Button";
import Constants from "@/utils/Constants";

const {
  SUBSCRIPTION_PLAN_ID_FREE,
  SUBSCRIPTION_PLAN_ID_BASIC,
  SUBSCRIPTION_PLAN_ID_PRO,
  SUBSCRIPTION_PLAN_ID_PREMIUM,
  SUBSCRIPTION_PLAN_ID_CUSTOM,
} = Constants;

const SubscriptionPage = () => {
  const [monthlyAnnually, setMonthlyAnnually] = useState(false);

  return (
    <>
      <Title className="text-center text-2xl lg:text-4xl">
        Choose your subscription plan and enjoy
        <br />{" "}
        <span className="text-secondary transition duration-200 hover:text-tertiary">
          our services now 💫
        </span>
        !
      </Title>
      <div className="flex items-center justify-center space-x-2 py-6">
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
      <div className="flex flex-wrap justify-evenly">
        <Subscription
          className="mb-4 2xl:mb-0"
          type="contrast"
          planInfo={{
            id: SUBSCRIPTION_PLAN_ID_FREE,
            monthlyAnnually: null,
            title: "Free Plan",
            price: 0,
            trackCheckInterval: 172800000,
            trackEnabledMaxProducts: 1,
            trackDisabledMaxProducts: 3,
            trackMaxUserSearchesPerDay: 5,
          }}
        />
        <Subscription
          className="mb-4 2xl:mb-0"
          type="contrast"
          planInfo={{
            id: SUBSCRIPTION_PLAN_ID_BASIC,
            monthlyAnnually: monthlyAnnually,
            title: "Basic Plan",
            price: 4.99,
            trackCheckInterval: 21600000,
            trackEnabledMaxProducts: 1,
            trackDisabledMaxProducts: 10,
            trackMaxUserSearchesPerDay: 12,
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
            trackCheckInterval: 3600000,
            trackEnabledMaxProducts: 3,
            trackDisabledMaxProducts: 15,
            trackMaxUserSearchesPerDay: 20,
          }}
        />
        <Subscription
          type="contrast"
          planInfo={{
            id: SUBSCRIPTION_PLAN_ID_PREMIUM,
            monthlyAnnually: monthlyAnnually,
            title: "Premium Plan",
            price: 59.99,
            trackCheckInterval: 1800000,
            trackEnabledMaxProducts: 5,
            trackDisabledMaxProducts: 20,
            trackMaxUserSearchesPerDay: 30,
          }}
        />
      </div>
      <TextSeparator className="py-3">Or</TextSeparator>
      <div className="flex items-center justify-center">
        <Button onClick={() => {}}>I customize my subscription 💎</Button>
      </div>
    </>
  );
};

export default SubscriptionPage;
