"use client";

import FooterLink from "./FooterLink";
import ShopTrackerLogo from "./ShopTrackerLogo";

const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-center space-x-4 bg-contrast-alt px-20 py-8 lg:px-40">
      <p className="text-sm">
        © 2024 <ShopTrackerLogo className="text-sm" />
      </p>
      <FooterLink href="terms-of-use">Terms of Use</FooterLink>
      <FooterLink href="terms-of-sale">Terms of Sale</FooterLink>
      <FooterLink href="privacy">Privacy</FooterLink>
      <FooterLink href="cookies">Cookies</FooterLink>
    </footer>
  );
};

export default Footer;
