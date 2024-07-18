import { Montserrat } from "next/font/google";
import Link from "next/link";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const Breadcrumb = ({ children, className, href }) => {

  return (
    <Link href={href} className={`${montserrat.className} ${className} uppercase leading-4`}>{children}</Link>
  );
}

export default Breadcrumb;
