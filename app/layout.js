"use client";

import "./globals.css";
import { Montserrat } from "next/font/google";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cookies from "./components/Cookies";
import { ToastProvider } from "./contexts/ToastContext";
import { SessionProvider } from "next-auth/react";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>ShopTracker - Track prices and availability of products</title>
        <meta
          name="description"
          content="Track prices or availability of products from almost any e-commerce platform."
        />
        <meta
          name="keywords"
          content="ShopTracker, tracking, restock, price changes, products, e-commerce, website"
        />
        <meta name="author" content="ShopTracker" />
        <meta
          property="og:title"
          content="ShopTracker - Track prices and availability of products"
        />
        <meta
          property="og:description"
          content="Track prices or availability of products from almost any e-commerce platform."
        />
        <meta property="og:image" content="https://www.shoptracker.eu/favicon.ico" />
        <meta property="og:url" content="https://www.shoptracker.eu" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://www.shoptracker.eu" />
      </head>
      <body
        className={`${montserrat.className} flex h-screen flex-col bg-contrast text-primary dark`}
      >
        <SessionProvider>
          <AuthProvider>
            <ToastProvider>
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
              <Cookies />
            </ToastProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
