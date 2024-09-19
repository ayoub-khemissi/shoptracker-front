const NEXT_PUBLIC_SHOPTRACKER_API_PORT = process.env.NEXT_PUBLIC_SHOPTRACKER_API_PORT;
const NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME = process.env.NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME;
const NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE =
  String(process.env.NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE) === "1" ||
  String(process.env.NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE).toLowerCase() === "true";
const NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export {
  NEXT_PUBLIC_SHOPTRACKER_API_PORT,
  NEXT_PUBLIC_SHOPTRACKER_API_HOSTNAME,
  NEXT_PUBLIC_SHOPTRACKER_API_HTTPSECURE,
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
};