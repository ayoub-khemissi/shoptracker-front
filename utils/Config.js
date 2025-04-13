const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;

const NEXT_PUBLIC_SHOPTRACKER_API_PORT = process.env.NEXT_PUBLIC_SHOPTRACKER_API_PORT;
const NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME = process.env.NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME;
const NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE =
  String(process.env.NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE) === "1" ||
  String(process.env.NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE).toLowerCase() === "true";
const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const NEXT_PUBLIC_RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const NEXT_PUBLIC_VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

export {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET,
  NEXT_PUBLIC_SHOPTRACKER_API_PORT,
  NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME,
  NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  NEXT_PUBLIC_VAPID_PUBLIC_KEY,
};
