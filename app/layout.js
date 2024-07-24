import { Montserrat } from "next/font/google";
import ShopTrackerLogo from "./components/ShopTrackerLogo";
import Link from "next/link";
import NavLink from "./components/NavLink";
import FooterLink from "./components/FooterLink";
import "./globals.css";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.className} flex h-screen flex-col bg-contrast text-primary`}>
        <header className="flex flex-wrap items-center justify-center px-20 py-6 sm:justify-between lg:px-40 lg:py-10">
          <div>
            <Link href="/">
              <ShopTrackerLogo />
            </Link>
          </div>
          <nav className="flex items-center justify-center space-x-4 sm:justify-end">
            <NavLink className="text-xl" href="/register">
              Sign Up
            </NavLink>
            <NavLink className="text-xl" href="/login">
              Sign In
            </NavLink>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="flex flex-wrap items-center justify-center space-x-4 bg-contrast-alt px-20 py-6 lg:px-40 lg:py-10">
          <p className="text-sm">
            © 2024 <ShopTrackerLogo className="text-sm" />
          </p>
          <FooterLink href="terms-of-use">Terms of Use</FooterLink>
          <FooterLink href="terms-of-sale">Terms of Sale</FooterLink>
          <FooterLink href="privacy">Privacy</FooterLink>
          <FooterLink href="cookies">Cookies</FooterLink>
        </footer>
      </body>
    </html>
  );
}
