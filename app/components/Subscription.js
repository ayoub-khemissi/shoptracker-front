"use client";

import { formatPrice } from "@/modules/TextFormatter";
import Plan from "./Plan";
import TextImportant from "./TextImportant";
import TextSeparator from "./TextSeparator";
import Constants from "@/utils/Constants";
import { useAuthContext } from "../contexts/AuthContext";
import NavLink from "./NavLink";
import TextNormal from "./TextNormal";
import { fetchData } from "@/modules/Fetch";
import { useToast } from "../contexts/ToastContext";
import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Title from "./Title";

const {
  PLAN_CALL_TO_ACTION_TYPE_NONE,
  PLAN_CALL_TO_ACTION_TYPE_UPGRADE,
  SUBSCRIPTION_STRIPE_PRICE_ID_FREE,
  SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_MONTHLY,
  SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_ANNUALLY,
} = Constants;

const Subscription = ({ className = "" }) => {
  const { user, saveUser } = useAuthContext();
  const { showToast } = useToast();
  const [cancelSubscriptionModalVisible, setCancelSubscriptionModalVisible] = useState(false);
  const [subscription, setSubscription] = useState(user?.subscription);

  const getSubscription = useCallback(async () => {
    const response = await fetchData("/subscription", "GET");

    switch (response?.status) {
      case 200: {
        const subscriptionData = (await response.json()).data;
        user.subscription = subscriptionData;
        saveUser(user);
        setSubscription(subscriptionData);
        break;
      }

      default:
        showToast("Failed to get your subscription. Please try again later.", "error");
        break;
    }
  }, [user, saveUser, showToast]);

  const cancelSubscription = async () => {
    const response = await fetchData(`/subscription/cancel`, "DELETE");

    switch (response?.status) {
      case 200:
        setCancelSubscriptionModalVisible(false);
        showToast("Your subscription has been canceled. 👋😔", "info");
        await getSubscription();
        break;

      default:
        showToast("Failed to cancel your subscription. Please try again later.", "error");
        break;
    }
  };

  const reactivateSubscription = async () => {
    const response = await fetchData(`/subscription/reactivate`, "POST");

    switch (response?.status) {
      case 200:
        setCancelSubscriptionModalVisible(false);
        showToast("Your subscription has been reactivated. 🎉", "success");
        await getSubscription();
        break;

      default:
        showToast("Failed to reactivate your subscription. Please try again later.", "error");
        break;
    }
  };

  const isPlanUltimate = () => {
    return (
      subscription?.stripe_price_id === SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_MONTHLY ||
      subscription?.stripe_price_id === SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_ANNUALLY
    );
  };

  const getNextPaymentBlock = () => {
    if (next_payment_date) {
      return (
        <div className="flex w-full items-center justify-between">
          <TextNormal className="uppercase">Next payment date</TextNormal>
          <TextImportant className="text-right">
            {new Date(next_payment_date).toLocaleDateString()}
          </TextImportant>
        </div>
      );
    }

    return null;
  };

  const getTrialEndBlock = () => {
    if (isTrialActive) {
      return (
        <div className="flex w-full items-center justify-between">
          <TextNormal className="uppercase">Trial end date</TextNormal>
          <TextImportant className="text-right">
            {new Date(trial_end).toLocaleDateString()}
          </TextImportant>
        </div>
      );
    }

    return null;
  };

  const getSubscriptionEndBlock = () => {
    if (cancel_at_period_end) {
      return (
        <div className="flex w-full items-center justify-between">
          <TextNormal className="uppercase">End date</TextNormal>
          <TextImportant className="text-right">
            {new Date(current_period_end).toLocaleDateString()}
          </TextImportant>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    getSubscription();
  }, [getSubscription]);

  if (!user?.subscription?.stripe_price_id) {
    return (
      <div className={`flex w-full flex-wrap justify-center ${className}`}>
        <Plan
          callToActionType={PLAN_CALL_TO_ACTION_TYPE_UPGRADE}
          stripePriceId={SUBSCRIPTION_STRIPE_PRICE_ID_FREE}
        />
      </div>
    );
  }

  const {
    stripe_price_id,
    start_date,
    next_payment_date,
    payment_method,
    invoice_history,
    billing_period,
    trial_end,
    cancel_at_period_end,
    current_period_end,
    first_subscription_date,
    last_subscription_date,
  } = user.subscription;

  const isTrialActive =
    first_subscription_date &&
    first_subscription_date === last_subscription_date &&
    trial_end > Date.now();

  const getCancelSubscriptionText = () => {
    return isTrialActive
      ? " and your free trial will also be canceled."
      : ` at the end of the period: ${new Date(next_payment_date).toLocaleDateString()}. You will continue to have access to all features until this date. If you change your mind, you can reactivate your subscription at any time before the end of the period.`;
  };

  return (
    <>
      <div className={`flex w-full flex-wrap justify-evenly gap-4 ${className}`}>
        <Plan
          callToActionType={
            isPlanUltimate() ? PLAN_CALL_TO_ACTION_TYPE_NONE : PLAN_CALL_TO_ACTION_TYPE_UPGRADE
          }
          stripePriceId={stripe_price_id}
        />
        <div className="w-80 space-y-4 rounded-xl border border-white/10 bg-white/5 p-4 shadow-lg backdrop-blur-sm">
          <TextSeparator className="w-full">Subscription</TextSeparator>
          <div className="flex w-full items-center justify-between">
            <TextNormal className="uppercase">Start date</TextNormal>
            <TextImportant className="text-right">
              {new Date(start_date).toLocaleDateString()}
            </TextImportant>
          </div>
          {getTrialEndBlock()}
          {getSubscriptionEndBlock() || getNextPaymentBlock()}
          {payment_method && (
            <div className="flex w-full items-center justify-between">
              <TextNormal className="uppercase">Payment Method</TextNormal>
              <TextImportant className="text-right">{payment_method}</TextImportant>
            </div>
          )}
          {billing_period && (
            <div className="flex w-full items-center justify-between">
              <TextNormal className="uppercase">Billing period</TextNormal>
              <TextImportant className="text-right">{billing_period}</TextImportant>
            </div>
          )}
          {invoice_history && invoice_history.length > 0 && (
            <>
              <TextSeparator className="w-full">Invoice history</TextSeparator>
              <div className="flex w-full flex-col justify-center space-y-3">
                {invoice_history.map((invoice) => {
                  return (
                    <NavLink
                      target="_blank"
                      title={`View invoice ${invoice.number}`}
                      href={invoice.url}
                      className="flex w-full items-center justify-between"
                      key={`payment-${invoice.id}`}
                    >
                      <TextNormal className="uppercase">
                        {new Date(invoice.date).toLocaleDateString()}
                      </TextNormal>
                      <TextImportant className="text-right">
                        {formatPrice(invoice.amount)}
                        {invoice.currency}
                      </TextImportant>
                    </NavLink>
                  );
                })}
              </div>
            </>
          )}
          {subscription?.stripe_price_id && (
            <>
              <div className="flex max-w-96 flex-col items-center justify-evenly space-y-5">
                <TextSeparator className="w-full">Actions</TextSeparator>
                {cancel_at_period_end ? (
                  <Button type="quaternary" onClick={reactivateSubscription}>
                    Reactivate subscription
                  </Button>
                ) : (
                  <Button type="secondary" onClick={() => setCancelSubscriptionModalVisible(true)}>
                    Cancel subscription
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Modal
        isVisible={cancelSubscriptionModalVisible}
        onClose={() => {
          setCancelSubscriptionModalVisible(false);
        }}
      >
        <div className="space-y-4">
          <Title className="text-center text-xl text-error">
            Are you sure you want to cancel your subscription?
          </Title>
          <TextNormal className="text-center">
            If you proceed, your subscription will be canceled
            {getCancelSubscriptionText()}
          </TextNormal>
          <div className="flex w-full flex-wrap items-center justify-center gap-4 md:justify-between">
            <Button
              type="quaternary"
              onClick={() => {
                setCancelSubscriptionModalVisible(false);
              }}
            >
              No
            </Button>
            <Button type="secondary" onClick={cancelSubscription}>
              Yes
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Subscription;
