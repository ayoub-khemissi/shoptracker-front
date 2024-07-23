import Link from "next/link";

const CircleLink = ({ children, className = "", href, target = "_self" }) => {
  return (
    <Link target={target} href={href} className={`border border-primary rounded-full w-12 h-12 flex justify-center items-center ${className}`}>{children}</Link>
  );
}

export default CircleLink;
