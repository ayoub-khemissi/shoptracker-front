
import Link from "next/link";

const UnderlineLink = ({ children, className = "", href, target = "_self" }) => {
  return (
    <Link target={target} href={href} className={`text-primary underline hover:text-secondary transition duration-200 ${className}`}>{children}</Link>
  );
}

export default UnderlineLink;
