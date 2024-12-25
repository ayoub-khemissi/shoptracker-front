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
        track_check_interval: 24 * 60 * 60 * 1000, // daily = 86400000
        track_enabled_max_products: 1,
        track_disabled_max_products: 3,
        track_user_max_searches_per_day: 3,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_FOREVER,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_BASIC_MONTHLY:
      return {
        name: "Basic Plan",
        price: 8.99,
        track_check_interval: 6 * 60 * 60 * 1000, // every 6 hours = 21600000
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
        track_check_interval: 30 * 60 * 1000, // every 30 minutes = 1800000
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
        track_check_interval: 5 * 60 * 1000, // every 5 minutes = 300000
        track_enabled_max_products: 8,
        track_disabled_max_products: 12,
        track_user_max_searches_per_day: 12,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE_MONTHLY:
      return {
        name: "Enterprise +",
        price: 119.99,
        track_check_interval: 6 * 60 * 60 * 1000, // every 6 hours = 21600000
        track_enabled_max_products: 15,
        track_disabled_max_products: 20,
        track_user_max_searches_per_day: 20,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS_MONTHLY:
      return {
        name: "Business +",
        price: 199.99,
        track_check_interval: 1 * 60 * 60 * 1000, // every hour = 3600000
        track_enabled_max_products: 20,
        track_disabled_max_products: 30,
        track_user_max_searches_per_day: 30,
        popular: true,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ELITE_MONTHLY:
      return {
        name: "Elite +",
        price: 299.99,
        track_check_interval: 30 * 60 * 1000, // every 30 minutes = 1800000
        track_enabled_max_products: 25,
        track_disabled_max_products: 40,
        track_user_max_searches_per_day: 40,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_MONTHLY:
      return {
        name: "Ultimate +",
        price: 499.99,
        track_check_interval: 5 * 60 * 1000, // every 5 minutes = 300000
        track_enabled_max_products: 30,
        track_disabled_max_products: 50,
        track_user_max_searches_per_day: 50,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_MONTHLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_BASIC_ANNUALLY:
      return {
        name: "Basic Plan",
        price: 6.99, // (8.99 * 0.75) rounded
        track_check_interval: 6 * 60 * 60 * 1000, // every 6 hours = 21600000
        track_enabled_max_products: 3,
        track_disabled_max_products: 5,
        track_user_max_searches_per_day: 5,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_PRO_ANNUALLY:
      return {
        name: "Pro Plan",
        price: 18.99, // (24.99 * 0.75) rounded
        track_check_interval: 30 * 60 * 1000, // every 30 minutes = 1800000
        track_enabled_max_products: 5,
        track_disabled_max_products: 8,
        track_user_max_searches_per_day: 8,
        popular: true,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM_ANNUALLY:
      return {
        name: "Premium Plan",
        price: 59.99, // (79.99 * 0.75) rounded
        track_check_interval: 5 * 60 * 1000, // every 5 minutes = 300000
        track_enabled_max_products: 8,
        track_disabled_max_products: 12,
        track_user_max_searches_per_day: 12,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE_ANNUALLY:
      return {
        name: "Enterprise +",
        price: 89.99, // (119.99 * 0.75) rounded
        track_check_interval: 6 * 60 * 60 * 1000, // every 6 hours = 21600000
        track_enabled_max_products: 15,
        track_disabled_max_products: 20,
        track_user_max_searches_per_day: 20,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS_ANNUALLY:
      return {
        name: "Business +",
        price: 149.99, // (199.99 * 0.75) rounded
        track_check_interval: 1 * 60 * 60 * 1000, // every hour = 3600000
        track_enabled_max_products: 20,
        track_disabled_max_products: 30,
        track_user_max_searches_per_day: 30,
        popular: true,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ELITE_ANNUALLY:
      return {
        name: "Elite +",
        price: 224.99, // (299.99 * 0.75) rounded
        track_check_interval: 30 * 60 * 1000, // every 30 minutes = 1800000
        track_enabled_max_products: 25,
        track_disabled_max_products: 40,
        track_user_max_searches_per_day: 40,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_ANNUALLY:
      return {
        name: "Ultimate +",
        price: 374.99, // (499.99 * 0.75) rounded
        track_check_interval: 5 * 60 * 1000, // every 5 minutes = 300000
        track_enabled_max_products: 30,
        track_disabled_max_products: 50,
        track_user_max_searches_per_day: 50,
        popular: false,
        billingPeriod: SUBSCRIPTION_BILLING_PERIOD_ANNUALLY,
      };
  }
};

export default getPlanData;
