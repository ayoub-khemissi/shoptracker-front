import { Lexend } from "next/font/google";
import Link from "next/link";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

const NavLink = ({ children, className, href }) => {

  return (
    <Link href={href} className={`${lexend.className} ${className} uppercase text-xl`}>{children}</Link>
  );
}

export default NavLink;
