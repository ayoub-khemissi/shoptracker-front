import { Montserrat } from "next/font/google";
import "./globals.css";
import ShopTrackerLogo from "./components/ShopTrackerLogo";
import Link from "next/link";
import NavLink from "./components/NavLink";
import FooterLink from "./components/FooterLink";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

export const metadata = {
  title: "ShopTracker.",
  description: "Get Alerts on Availability and Price Drops for Your Favorite Products!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-contrast-dark text-primary-dark lg:px-40 lg:py-10 md:px-20 md:py-6 px-10 py-2`}>
        <header className="flex justify-between items-center">
          <div>
            <Link href="/">
              <ShopTrackerLogo />
            </Link>
          </div>
          <nav className="flex justify-end items-center space-x-4">
            <NavLink href="/register">Signup</NavLink>
            <NavLink href="/login">Signin</NavLink>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer className="flex justify-center items-center space-x-4">
          <p className="text-sm">© 2024 <ShopTrackerLogo className="text-sm" /></p>
          <FooterLink href="terms-of-use">Terms of Use</FooterLink>
          <FooterLink href="terms-of-sale">Terms of Sale</FooterLink>
          <FooterLink href="privacy">Privacy</FooterLink>
          <FooterLink href="cookies">Cookies</FooterLink>
        </footer>
      </body>
    </html>
  );
}
