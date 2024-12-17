"use client";

import Link from "next/link";

const UnderlineLink = ({ children, className = "", href, target = "_self" }) => {
  return (
    <Link
      target={target}
      href={href}
      className={`text-tertiary underline transition duration-200 hover:text-secondary ${className}`}
    >
      {children}
    </Link>
  );
};

export default UnderlineLink;
