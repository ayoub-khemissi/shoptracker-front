"use client";

import { formatPrice } from "@/modules/TextFormatter";
import Plan from "./Plan";
import TextImportant from "./TextImportant";
import TextSeparator from "./TextSeparator";
import Constants from "@/utils/Constants";
import { useAuthContext } from "../contexts/AuthContext";
import NavLink from "./NavLink";
import TextNormal from "./TextNormal";

const { SUBSCRIPTION_STRIPE_PRICE_ID_FREE } = Constants;

const Subscription = ({ className = "" }) => {
  const { user } = useAuthContext();

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
      <div className="w-96 space-y-5 py-4 lg:py-0">
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
        {invoice_history && (
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
      </div>
    </div>
  );
};

export default Subscription;
