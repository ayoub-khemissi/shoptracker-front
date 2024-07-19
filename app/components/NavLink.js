import { Lexend } from "next/font/google";
import Link from "next/link";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

const NavLink = ({ children, className = "", href }) => {

  return (
    <Link href={href} className={`${lexend.className} text-primary hover:text-secondary transition duration-200 uppercase text-xl ${className}`}>{children}</Link>
  );
}

export default NavLink;
