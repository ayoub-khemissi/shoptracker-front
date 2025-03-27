"use client";

import { Lexend } from "next/font/google";
import Link from "next/link";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

const NavLink = ({
  children,
  href,
  className = "",
  type = "primary",
  target = "_self",
  title = null,
  onClick,
}) => {
  let typeClass;

  switch (type) {
    case "primary":
      typeClass = "text-primary hover:text-secondary whitespace-nowrap";
      break;

    case "tertiary":
      typeClass = "text-primary hover:text-tertiary whitespace-nowrap";
      break;

    case "contrast":
      typeClass = "text-contrast hover:text-tertiary whitespace-nowrap";
      break;
  }

  return (
    <Link
      title={title}
      target={target}
      href={href}
      onClick={onClick}
      className={`${lexend.className} ${typeClass} uppercase transition duration-200 ${className}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
