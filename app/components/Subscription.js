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

const { SUBSCRIPTION_STRIPE_PRICE_ID_FREE } = Constants;

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
        showToast("Your subscription has been canceled. 👋😔", "info");
        await getSubscription();
        break;

      default:
        showToast("Failed to cancel your subscription. Please try again later.", "error");
        break;
    }
  };

  useEffect(() => {
    getSubscription();
  }, [getSubscription]);

  if (!user?.subscription?.stripe_price_id) {
    return (
      <div className={`flex w-full flex-wrap justify-center ${className}`}>
        <Plan hasCallToAction={false} stripePriceId={SUBSCRIPTION_STRIPE_PRICE_ID_FREE} />
      </div>
    );
  }

  const { stripe_price_id, start_date, next_payment_date, payment_method, invoice_history } =
    user.subscription;

  return (
    <div className={`flex w-full flex-wrap justify-evenly ${className}`}>
      <Plan hasCallToAction={false} stripePriceId={stripe_price_id} />
      <div className="max-w-96 space-y-4 py-4 md:py-0">
        <TextSeparator className="w-full">Subscription</TextSeparator>
        <div className="flex w-full items-center justify-between">
          <TextNormal className="uppercase">Start date</TextNormal>
          <TextImportant className="text-right">
            {new Date(start_date).toLocaleDateString()}
          </TextImportant>
        </div>
        {next_payment_date && (
          <div className="flex w-full items-center justify-between">
            <TextNormal className="uppercase">Next payment date</TextNormal>
            <TextImportant className="text-right">
              {new Date(next_payment_date).toLocaleDateString()}
            </TextImportant>
          </div>
        )}
        {payment_method && (
          <div className="flex w-full items-center justify-between">
            <TextNormal className="uppercase">Payment Method</TextNormal>
            <TextImportant className="text-right">{payment_method}</TextImportant>
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
              <Button type="secondary" onClick={() => setCancelSubscriptionModalVisible(true)}>
                Cancel subscription
              </Button>
            </div>
            <Modal
              isVisible={cancelSubscriptionModalVisible}
              onClose={() => {
                setCancelSubscriptionModalVisible(false);
              }}
            >
              <div className="space-y-4">
                <Title className="text-center text-xl">
                  Are you sure you want to cancel your subscription?
                </Title>
                <TextNormal>
                  This action cannot be undone. If you proceed, your subscription will be canceled.
                  You will receive a prorated refund based on the remaining time on your
                  subscription.
                </TextNormal>
                <div className="flex w-full items-center justify-between">
                  <Button
                    type="primary"
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
        )}
      </div>
    </div>
  );
};

export default Subscription;
