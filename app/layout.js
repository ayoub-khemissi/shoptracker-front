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
      <body className={`${montserrat.className} bg-contrast text-primary`}>
        <header className="flex justify-between items-center lg:px-40 lg:py-10 px-20 py-6">
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
        <>
          {children}
        </>
        <footer className="bg-contrast-alt flex justify-center items-center space-x-4 lg:px-40 lg:py-10 px-20 py-6">
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
