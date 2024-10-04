"use client";

import { Lexend } from "next/font/google";
import Link from "next/link";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

const FooterLink = ({ children, className = "", href, target = "_self" }) => {
  return (
    <Link
      target={target}
      href={href}
      className={`${lexend.className} text-sm text-primary transition duration-200 hover:text-secondary ${className}`}
    >
      {children}
    </Link>
  );
};

export default FooterLink;
