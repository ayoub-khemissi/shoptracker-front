import { urlBase64ToUint8Array } from "./Encoding";
import { NEXT_PUBLIC_VAPID_PUBLIC_KEY } from "@/utils/Config";

let registration;

async function registerServiceWorker(navigator) {
  registration = await navigator.serviceWorker.register("/sw.js", {
    scope: "/",
    updateViaCache: "none",
  });
}

export async function subscribeToBrowserNotification(navigator, window) {
  if (!navigator?.serviceWorker || !window?.PushManager) return;

  if (!registration) {
    await registerServiceWorker(navigator);
  }

  const subscription =
    (await registration.pushManager.getSubscription()) ||
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(NEXT_PUBLIC_VAPID_PUBLIC_KEY),
    }));

  return JSON.parse(JSON.stringify(subscription));
}

export async function unsubscribeFromBrowserNotification(navigator, window) {
  if (!navigator?.serviceWorker || !window?.PushManager) return;

  if (!registration) {
    await registerServiceWorker(navigator);
  }

  const subscription = (await registration.pushManager.getSubscription()) || null;

  if (!subscription) {
    return true;
  }

  await subscription.unsubscribe();
  return true;
}
