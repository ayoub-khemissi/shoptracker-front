import { Lexend } from "next/font/google";
import Link from "next/link";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

const NavLink = ({ children, type="primary", className = "", href }) => {
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
    <Link href={href} className={`${lexend.className} ${typeClass} transition duration-200 uppercase text-xl ${className}`}>{children}</Link>
  );
}

export default NavLink;
