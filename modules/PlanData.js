import Constants from "@/utils/Constants";

const {
  SUBSCRIPTION_STRIPE_PRICE_ID_FREE,
  SUBSCRIPTION_STRIPE_PRICE_ID_BASIC,
  SUBSCRIPTION_STRIPE_PRICE_ID_PRO,
  SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM,
  SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE,
  SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS,
  SUBSCRIPTION_STRIPE_PRICE_ID_ELITE,
  SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE,
} = Constants;

const getPlanData = (stripePriceId) => {
  switch (stripePriceId) {
    case SUBSCRIPTION_STRIPE_PRICE_ID_FREE:
    default:
      return {
        name: "Free Plan",
        price: 0,
        track_check_interval: 48 * 60 * 60 * 1000,
        track_enabled_max_products: 1,
        track_disabled_max_products: 3,
        track_user_max_searches_per_day: 3,
        popular: false,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_BASIC:
      return {
        name: "Basic Plan",
        price: 7.99,
        track_check_interval: 12 * 60 * 60 * 1000,
        track_enabled_max_products: 3,
        track_disabled_max_products: 5,
        track_user_max_searches_per_day: 5,
        popular: false,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_PRO:
      return {
        name: "Pro Plan",
        price: 24.99,
        track_check_interval: 30 * 60 * 1000,
        track_enabled_max_products: 5,
        track_disabled_max_products: 8,
        track_user_max_searches_per_day: 8,
        popular: true,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM:
      return {
        name: "Premium Plan",
        price: 79.99,
        track_check_interval: 5 * 60 * 1000,
        track_enabled_max_products: 5,
        track_disabled_max_products: 8,
        track_user_max_searches_per_day: 8,
        popular: false,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE:
      return {
        name: "Enterprise +",
        price: 97.99,
        track_check_interval: 12 * 60 * 60 * 1000,
        track_enabled_max_products: 15,
        track_disabled_max_products: 20,
        track_user_max_searches_per_day: 20,
        popular: false,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS:
      return {
        name: "Business +",
        price: 179.99,
        track_check_interval: 1 * 60 * 60 * 1000,
        track_enabled_max_products: 15,
        track_disabled_max_products: 20,
        track_user_max_searches_per_day: 20,
        popular: false,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ELITE:
      return {
        name: "Elite +",
        price: 289.99,
        track_check_interval: 30 * 60 * 1000,
        track_enabled_max_products: 20,
        track_disabled_max_products: 25,
        track_user_max_searches_per_day: 25,
        popular: true,
      };

    case SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE:
      return {
        name: "Ultimate +",
        price: 488.99,
        track_check_interval: 5 * 60 * 1000,
        track_enabled_max_products: 20,
        track_disabled_max_products: 25,
        track_user_max_searches_per_day: 25,
        popular: false,
      };
  }
};

export default getPlanData;
