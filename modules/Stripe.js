import { loadStripe } from "@stripe/stripe-js";
import { NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY } from "@/utils/Config";
let stripe = null;

/**
 * Redirect the user to the checkout page with the given session ID.
 *
 * @param {string} sessionId The session ID to checkout with.
 *
 * @returns {Promise<void>} Resolves when the checkout page has been loaded.
 */
export const redirectToCheckout = async (sessionId) => {
  try {
    if (!stripe) {
      stripe = await loadStripe(NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    }

    await stripe.redirectToCheckout({ sessionId: sessionId });
  } catch (error) {
    console.error("Stripe error: ", error);
    return null;
  }
};
