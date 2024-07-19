import Link from "next/link";

const ButtonLink = ({ children, className = "", href, type = "primary" }) => {
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
    <div className={`${typeClass} flex justify-center items-center border-2 transition duration-200 rounded-full ${className}`}>
      <Link className="uppercase font-semibold text-sm text-center px-5 py-2 h-full w-full" href={href}>
        {children}
      </Link>
    </div>
  );
}

export default ButtonLink;
