import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

export const metadata = {
  title: "ShopTracker.",
  description: "Get Alerts on Availability and Price Drops for Your Favorite Products!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-contrast-dark text-primary-dark`}>{children}</body>
    </html>
  );
}
