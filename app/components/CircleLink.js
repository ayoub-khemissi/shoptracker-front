"use client";

import Link from "next/link";

const CircleLink = ({ children, className = "", href, target = "_self" }) => {
  return (
    <Link
      target={target}
      href={href}
      className={`flex h-12 w-12 items-center justify-center rounded-full border border-primary ${className}`}
    >
      {children}
    </Link>
  );
};

export default CircleLink;
