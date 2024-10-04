"use client";

import { formatPrice } from "@/modules/TextFormatter";
import Subscription from "./Subscription";
import TextImportant from "./TextImportant";
import TextLabel from "./TextLabel";
import TextSeparator from "./TextSeparator";

const SubscriptionInfo = ({ className = "", planInfo, subscriptionInfo }) => {
  if (!subscriptionInfo) {
    return (
      <div className={`flex w-full flex-wrap justify-center ${className}`}>
        <Subscription callToAction={false} planInfo={planInfo} />
      </div>
    );
  }

  const { startDate, nextPaymentDate, paymentMethod, paymentHistory } = subscriptionInfo;

  return (
    <div className={`flex w-full flex-wrap justify-evenly ${className}`}>
      <Subscription callToAction={false} planInfo={planInfo} />
      <div className="w-96 space-y-5 py-4 lg:py-0">
        <TextSeparator className="w-full">Subscription</TextSeparator>
        <div className="flex w-full items-center justify-between">
          <TextLabel>Start date</TextLabel>
          <TextImportant className="text-right">
            {new Date(startDate).toLocaleDateString()}
          </TextImportant>
        </div>
        <div className="flex w-full items-center justify-between">
          <TextLabel>Next payment date</TextLabel>
          <TextImportant className="text-right">
            {new Date(nextPaymentDate).toLocaleDateString()}
          </TextImportant>
        </div>
        <div className="flex w-full items-center justify-between">
          <TextLabel>Payment Method</TextLabel>
          <TextImportant className="text-right">{paymentMethod}</TextImportant>
        </div>
        <TextSeparator className="w-full">Payment history</TextSeparator>
        <div className="flex w-full flex-col justify-center space-y-3">
          {paymentHistory.slice(0, 6).map((payment) => {
            return (
              <div
                className="flex w-full items-center justify-between"
                key={`payment-${payment.id}`}
              >
                <TextLabel>{new Date(payment.created_at).toLocaleString()}</TextLabel>
                <TextImportant className="text-right">{formatPrice(payment.price)}€</TextImportant>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionInfo;
