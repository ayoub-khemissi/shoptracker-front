"use client";

import ShopTrackerLogo from "./ShopTrackerLogo";

export const LoadingScreen = () => (
  <div className="flex min-h-screen w-full flex-col items-center justify-center bg-contrast">
    <div className="animate-pulse">
      <ShopTrackerLogo className="text-5xl" />
    </div>
    <div className="mt-8 h-2 w-64 overflow-hidden rounded-full bg-contrast-alt">
      <div
        className="h-full animate-[loading_2s_ease-in-out_infinite] bg-gradient-to-r from-secondary via-tertiary to-quaternary"
        style={{
          animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
          width: "100%",
        }}
      />
    </div>
  </div>
);
