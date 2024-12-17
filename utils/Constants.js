const Constants = {
  TRACK_STATUS_ENABLED: 1,
  TRACK_STATUS_DISABLED: 2,
  TRACK_STATUS_INVALID: 3,
  TRACK_STATUS_DELETED: 4,
  TRACK_STATUS_FINISHED: 5,

  TRACK_PRICE_STATUS_DECREASED: 1,
  TRACK_PRICE_STATUS_INCREASED: 2,
  TRACK_PRICE_STATUS_STABLE: 3,

  SUBSCRIPTION_STRIPE_PRICE_ID_FREE: null,
  SUBSCRIPTION_STRIPE_PRICE_ID_BASIC_MONTHLY: "price_1PwenMFdysMlodbwuTCUcMse",
  SUBSCRIPTION_STRIPE_PRICE_ID_PRO_MONTHLY: "price_1PyxsZFdysMlodbwgI1TgRJ5",
  SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM_MONTHLY: "price_1PyxtmFdysMlodbwI3jYzuLO",
  SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE_MONTHLY: "price_1PyxvIFdysMlodbwW3uzbqXj",
  SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS_MONTHLY: "price_1PyxwUFdysMlodbwfmRpTlOG",
  SUBSCRIPTION_STRIPE_PRICE_ID_ELITE_MONTHLY: "price_1PyxyDFdysMlodbwR7lQ27eC",
  SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_MONTHLY: "price_1Pyxz7FdysMlodbwH0WPTjpi",
  SUBSCRIPTION_STRIPE_PRICE_ID_BASIC_ANNUALLY: "",
  SUBSCRIPTION_STRIPE_PRICE_ID_PRO_ANNUALLY: "",
  SUBSCRIPTION_STRIPE_PRICE_ID_PREMIUM_ANNUALLY: "",
  SUBSCRIPTION_STRIPE_PRICE_ID_ENTREPRISE_ANNUALLY: "",
  SUBSCRIPTION_STRIPE_PRICE_ID_BUSINESS_ANNUALLY: "",
  SUBSCRIPTION_STRIPE_PRICE_ID_ELITE_ANNUALLY: "",
  SUBSCRIPTION_STRIPE_PRICE_ID_ULTIMATE_ANNUALLY: "",

  SUBSCRIPTION_BILLING_PERIOD_MONTHLY: 1,
  SUBSCRIPTION_BILLING_PERIOD_ANNUALLY: 2,
  SUBSCRIPTION_BILLING_PERIOD_FOREVER: 3,

  TRACKLIST_TAB_IN_PROGRESS: "in-progress",
  TRACKLIST_TAB_WISHLIST: "wishlist",
  TRACKLIST_TAB_INVALID: "invalid",
  TRACKLIST_TAB_FINISHED: "finished",

  SETTINGS_TAB_NOTIFICATIONS: "notifications",
  SETTINGS_TAB_ACCOUNT: "account",
  SETTINGS_TAB_SUBSCRIPTION: "subscription",
};

export default Constants;
