"use client";

import { Lexend } from "next/font/google";

const lexend = Lexend({ weight: "800", subsets: ["latin"] });

const Subtitle = ({ children, className = "" }) => {
  return <label className={`${lexend.className} uppercase ${className}`}>{children}</label>;
};

export default Subtitle;
