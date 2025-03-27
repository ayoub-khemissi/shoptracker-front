"use client";

import Link from "next/link";

const ButtonLink = ({
  children,
  className = "",
  href,
  type = "primary",
  target = "_self",
  title = null,
}) => {
  let typeClass;

  switch (type) {
    case "primary":
      typeClass = `border-primary text-contrast bg-primary shadow-lg
        hover:text-primary hover:bg-contrast hover:shadow-primary/20 hover:scale-105`;
      break;

    case "secondary":
      typeClass = `border-secondary text-contrast bg-secondary shadow-lg
        hover:border-tertiary hover:text-primary hover:bg-tertiary hover:shadow-tertiary/20 hover:scale-105`;
      break;

    case "tertiary":
      typeClass = `border-tertiary text-primary bg-tertiary shadow-lg
        hover:border-secondary hover:text-contrast hover:bg-secondary hover:shadow-secondary/20 hover:scale-105`;
      break;

    case "quaternary":
      typeClass = `border-quaternary text-contrast bg-quaternary shadow-lg
        hover:bg-gradient-to-r hover:from-quaternary hover:to-white hover:text-contrast 
        hover:border-quaternary/20 hover:shadow-quaternary/20 hover:scale-105`;
      break;

    case "contrast":
      typeClass = `border-primary text-primary bg-contrast shadow-lg
        hover:text-contrast hover:bg-primary hover:shadow-primary/20 hover:scale-105`;
      break;
  }

  return (
    <div
      className={`${typeClass} flex items-center justify-center rounded-xl border 
      backdrop-blur-sm transition-all duration-300 ${className}`}
    >
      <Link
        target={target}
        title={title}
        className="h-full w-full text-nowrap px-5 py-2.5 text-center text-sm font-semibold uppercase"
        href={href}
      >
        {children}
      </Link>
    </div>
  );
};

export default ButtonLink;
