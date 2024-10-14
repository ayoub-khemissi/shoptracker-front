import { loadStripe } from "@stripe/stripe-js";
import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from "@/utils/Config";
let stripe;

/**
 * Returns an instance of the Stripe library.
 *
 * If the instance hasn't been created yet, it will be created by calling
 * loadStripe with the NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable.
 *
 * @returns {Promise<Stripe>} A promise that resolves with an instance of the Stripe library.
 */
export const getStripe = async () => {
  if (!stripe) {
    stripe = await loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripe;
};
