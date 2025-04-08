"use client";

import FooterLink from "./FooterLink";
import ShopTrackerLogo from "./ShopTrackerLogo";

const Footer = () => {
  return (
    <footer className="z-10 flex h-14 flex-wrap items-center justify-center gap-x-4 from-purple-500/15 via-transparent to-contrast/80 px-6 py-2 md:px-12 lg:-mt-14 lg:px-28">
      <p className="text-sm">
        © 2024 <ShopTrackerLogo className="text-sm" />
      </p>
      <FooterLink href="terms-of-service">Terms of Service</FooterLink>
      <FooterLink href="terms-of-sale">Terms of Sale</FooterLink>
      <FooterLink href="privacy-policy">Privacy Policy</FooterLink>
    </footer>
  );
};

export default Footer;
