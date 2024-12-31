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

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth text-balance">
      <head>
        <title>ShopTracker - Track Restocks & Price Drops Online</title>
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
        <meta
          property="og:image"
          content="https://www.shoptracker.eu/assets/img/social-preview.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://www.shoptracker.eu" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="ShopTracker" />
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
        <link rel="canonical" href="https://www.shoptracker.eu" />
      </head>
      <body
        className={`${montserrat.className} flex h-screen flex-col bg-contrast text-primary dark`}
      >
        <SessionProvider>
          <AuthProvider>
            <ToastProvider>
              <Suspense>
                <Header />
                <div className="flex-1">{children}</div>
                <Footer />
                <Cookies />
              </Suspense>
            </ToastProvider>
          </AuthProvider>
        </SessionProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
