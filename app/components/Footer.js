"use client";

import FooterLink from "./FooterLink";
import ShopTrackerLogo from "./ShopTrackerLogo";

const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-center space-x-4 bg-contrast-alt px-20 py-8 lg:px-40">
      <p className="text-sm">
        © 2024 <ShopTrackerLogo className="text-sm" />
      </p>
      <FooterLink href="terms-of-service">Terms of Service</FooterLink>
      <FooterLink href="terms-of-sale">Terms of Sale</FooterLink>
      <FooterLink href="privacy">Privacy</FooterLink>
    </footer>
  );
};

export default Footer;
