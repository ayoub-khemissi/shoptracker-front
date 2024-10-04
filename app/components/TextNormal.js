"use client";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

const TextNormal = ({ children, className = "" }) => {
  return <p className={`${montserrat.className} ${className}`}>{children}</p>;
};

export default TextNormal;
