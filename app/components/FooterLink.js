import { Lexend } from "next/font/google";
import Link from "next/link";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

const FooterLink = ({ children, className, href }) => {

  return (
    <Link href={href} className={`${lexend.className} text-primary hover:text-secondary transition duration-200 text-sm ${className}`}>{children}</Link>
  );
}

export default FooterLink;
