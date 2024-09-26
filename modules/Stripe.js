import { loadStripe } from "@stripe/stripe-js";
import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from "@/utils/Config";
let stripe;

export const getStripe = async () => {
  if (!stripe) {
    stripe = await loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripe;
};
