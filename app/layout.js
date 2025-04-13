"use client";

import "./globals.css";
import { Montserrat } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cookies from "./components/Cookies";
import { ToastProvider } from "./contexts/ToastContext";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { LoadingScreen } from "./components/LoadingScreen";
import InstallPrompt from "./components/InstallPrompt";
import BrowserNotificationPrompt from "./components/BrowserNotificationPrompt";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { NEXT_PUBLIC_RECAPTCHA_SITE_KEY } from "@/utils/Config";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth text-balance">
      <head>
        <title>ShopTracker - Track Restocks & Price Drops Online</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
        <meta
          name="description"
          content="Easily track restocks and price drops of products from almost any e-commerce platform. Get instant alerts and never miss a deal again!"
        />
        <meta
          name="keywords"
          content="ShopTracker, product tracking, restock alerts, price drop alerts, product availability, stock monitoring, price tracking, real-time updates, restock notifications, price change notifications, e-commerce tools, online shopping assistant, product discounts, inventory updates, shopping deals, price monitoring, deal tracking, stock alerts, retail price tracking, sales notifications, product restock updates, discount alerts, online shopping deals, e-commerce tracking, product price trends"
        />
        <meta name="author" content="ShopTracker" />
        <meta property="og:title" content="ShopTracker - Track Restocks & Price Drops Online" />
        <meta
          property="og:description"
          content="Easily track restocks and price drops of products from almost any e-commerce platform. Get instant alerts and never miss a deal again!"
        />
        <meta property="og:url" content="https://www.shoptracker.eu" />
        <meta
          property="og:image"
          content="https://www.shoptracker.eu/assets/img/social-preview.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="ShopTracker" />
        <meta
          property="og:image"
          content="https://www.shoptracker.eu/assets/img/logo-shoptracker-192x192.png"
        />
        <meta name="twitter:title" content="ShopTracker - Track Restocks & Price Drops Online" />
        <meta
          name="twitter:description"
          content="Easily track restocks and price drops of products from almost any e-commerce platform. Get instant alerts and never miss a deal again!"
        />
        <meta
          name="twitter:image"
          content="https://www.shoptracker.eu/assets/img/social-preview.png"
        />
        <meta name="twitter:site" content="@ShopTracker" />
        <meta name="twitter:creator" content="@ShopTracker" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="application-name" content="ShopTracker" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ShopTracker" />
        <meta
          name="description"
          content="Get alerts on the availability and price drop of your favorite products."
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#FFFAEE" />
        <meta name="msapplication-tap-highlight" content="no" />

        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/assets/img/logo-shoptracker-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/assets/img/logo-shoptracker-167x167.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/img/logo-shoptracker-180x180.png"
        />

        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/img/logo-shoptracker-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/img/logo-shoptracker-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/assets/img/logo-shoptracker-192x192.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/assets/img/safari-pinned-tab.svg" color="#FFFAEE" />
        <link rel="shortcut icon" href="/assets/img/favicon.ico" />
        <link rel="canonical" href="https://www.shoptracker.eu" />
        <meta name="theme-color" content="#1E1E25" />
      </head>
      <body
        className={`${montserrat.className} flex min-h-screen flex-col bg-contrast text-primary dark`}
      >
        <SessionProvider>
          <AuthProvider>
            <ToastProvider>
              <Suspense fallback={<LoadingScreen />}>
                <ReCaptchaProvider siteKey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <Cookies />
                  <InstallPrompt />
                  <BrowserNotificationPrompt />
                </ReCaptchaProvider>
              </Suspense>
            </ToastProvider>
          </AuthProvider>
        </SessionProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
