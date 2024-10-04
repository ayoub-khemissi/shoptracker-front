"use client";

import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

const TextLink = ({ children, className = "", href, target = "_self" }) => {
  return (
    <Link target={target} href={href} className={`${montserrat.className} underline ${className}`}>
      {children}
    </Link>
  );
};

export default TextLink;
