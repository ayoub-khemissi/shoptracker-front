"use client";

import { Lexend } from "next/font/google";
import Link from "next/link";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

const NavLink = ({ children, href, className = "", type = "primary", target = "_self" }) => {
  let typeClass;

  switch (type) {
    case "primary":
      typeClass = "text-primary hover:text-secondary";
      break;

    case "tertiary":
      typeClass = "text-primary hover:text-tertiary";
      break;

    case "contrast":
      typeClass = "text-contrast hover:text-tertiary";
      break;
  }

  return (
    <Link
      target={target}
      href={href}
      className={`${lexend.className} ${typeClass} uppercase transition duration-200 ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
