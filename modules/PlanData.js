import Constants from "@/utils/Constants";

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

const getPlanData = (stripePriceId) => {
  switch (stripePriceId) {
    case SUBSCRIPTION_STRIPE_PRICE_ID_FREE:
    default:
      return {
        name: "Free Plan",
        price: 0,
        track_check_interval: 2 * 24 * 60 * 60 * 1000,
        track_enabled_max_products: 1,
        track_disabled_max_products: 3,
        track_user_max_searches_per_day: 3,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_FOREVER,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_BASIC_MONTHLY:
      return {
        name: "Basic Plan",
        price: 7.99,
        track_check_interval: 12 * 60 * 60 * 1000,
        track_enabled_max_products: 3,
        track_disabled_max_products: 5,
        track_user_max_searches_per_day: 5,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_PRO_MONTHLY:
      return {
        name: "Pro Plan",
        price: 24.99,
        track_check_interval: 30 * 60 * 1000,
        track_enabled_max_products: 5,
        track_disabled_max_products: 8,
        track_user_max_searches_per_day: 8,
        popular: true,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM_MONTHLY:
      return {
        name: "Premium Plan",
        price: 79.99,
        track_check_interval: 5 * 60 * 1000,
        track_enabled_max_products: 5,
        track_disabled_max_products: 8,
        track_user_max_searches_per_day: 8,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE_MONTHLY:
      return {
        name: "Enterprise +",
        price: 97.99,
        track_check_interval: 12 * 60 * 60 * 1000,
        track_enabled_max_products: 15,
        track_disabled_max_products: 20,
        track_user_max_searches_per_day: 20,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS_MONTHLY:
      return {
        name: "Business +",
        price: 179.99,
        track_check_interval: 1 * 60 * 60 * 1000,
        track_enabled_max_products: 15,
        track_disabled_max_products: 20,
        track_user_max_searches_per_day: 20,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ELITE_MONTHLY:
      return {
        name: "Elite +",
        price: 289.99,
        track_check_interval: 30 * 60 * 1000,
        track_enabled_max_products: 20,
        track_disabled_max_products: 25,
        track_user_max_searches_per_day: 25,
        popular: true,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_MONTHLY:
      return {
        name: "Ultimate +",
        price: 488.99,
        track_check_interval: 5 * 60 * 1000,
        track_enabled_max_products: 20,
        track_disabled_max_products: 25,
        track_user_max_searches_per_day: 25,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_BASIC_ANNUALLY:
      return {
        name: "Basic Plan",
        price: 7.99,
        track_check_interval: 12 * 60 * 60 * 1000,
        track_enabled_max_products: 3,
        track_disabled_max_products: 5,
        track_user_max_searches_per_day: 5,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_PRO_ANNUALLY:
      return {
        name: "Pro Plan",
        price: 24.99,
        track_check_interval: 30 * 60 * 1000,
        track_enabled_max_products: 5,
        track_disabled_max_products: 8,
        track_user_max_searches_per_day: 8,
        popular: true,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM_ANNUALLY:
      return {
        name: "Premium Plan",
        price: 79.99,
        track_check_interval: 5 * 60 * 1000,
        track_enabled_max_products: 5,
        track_disabled_max_products: 8,
        track_user_max_searches_per_day: 8,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE_ANNUALLY:
      return {
        name: "Enterprise +",
        price: 97.99,
        track_check_interval: 12 * 60 * 60 * 1000,
        track_enabled_max_products: 15,
        track_disabled_max_products: 20,
        track_user_max_searches_per_day: 20,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS_ANNUALLY:
      return {
        name: "Business +",
        price: 179.99,
        track_check_interval: 1 * 60 * 60 * 1000,
        track_enabled_max_products: 15,
        track_disabled_max_products: 20,
        track_user_max_searches_per_day: 20,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ELITE_ANNUALLY:
      return {
        name: "Elite +",
        price: 289.99,
        track_check_interval: 30 * 60 * 1000,
        track_enabled_max_products: 20,
        track_disabled_max_products: 25,
        track_user_max_searches_per_day: 25,
        popular: true,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_ANNUALLY:
      return {
        name: "Ultimate +",
        price: 488.99,
        track_check_interval: 5 * 60 * 1000,
        track_enabled_max_products: 20,
        track_disabled_max_products: 25,
        track_user_max_searches_per_day: 25,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };
  }
};

export default getPlanData;
