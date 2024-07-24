import Link from "next/link";

const ButtonLink = ({ children, className = "", href, type = "primary", target = "_self" }) => {
  let typeClass;

  switch (type) {
    case "primary":
      typeClass = `border-primary text-contrast bg-primary hover:text-primary hover:bg-contrast`;
      break;

    case "tertiary":
      typeClass = `border-tertiary text-primary bg-tertiary hover:border-secondary hover:text-contrast hover:bg-secondary`;
      break;

    case "contrast":
      typeClass = `border-primary text-primary bg-contrast hover:text-contrast hover:bg-primary`;
      break;
  }

  return (
    <div
      className={`${typeClass} flex items-center justify-center rounded-full border-2 transition duration-200 ${className}`}
    >
      <Link
        target={target}
        className="h-full w-full text-nowrap px-5 py-2 text-center text-sm font-semibold uppercase"
        href={href}
      >
        {children}
      </Link>
    </div>
  );
};

export default ButtonLink;
