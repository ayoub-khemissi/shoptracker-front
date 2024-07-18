import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({ weight: "500", subsets: ["latin"] });

const TextLink = ({ children, className, href }) => {

  return (
    <Link href={href} className={`${montserrat.className} ${className} underline`}>{children}</Link>
  );
}

export default TextLink;
