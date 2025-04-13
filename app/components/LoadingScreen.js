"use client";

import Section from "./Section";
import ShopTrackerLogo from "./ShopTrackerLogo";

export const LoadingScreen = () => (
  <Section centerX centerY>
    <ShopTrackerLogo className="animate-pulse text-5xl" />
    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-contrast-alt">
      <div
        className="h-full animate-[loading_2s_ease-in-out_infinite] bg-gradient-to-r from-secondary via-tertiary to-quaternary"
        style={{
          animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
          width: "100%",
        }}
      />
    </div>
  </Section>
);
