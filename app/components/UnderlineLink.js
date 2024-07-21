
import Link from "next/link";

const UnderlineLink = ({ children, className = "", href }) => {
  return (
    <Link href={href} className={`text-primary underline hover:text-secondary transition duration-200 ${className}`}>{children}</Link>
  );
}

export default UnderlineLink;
