import Link from "next/link";

const CircleLink = ({ children, className, href }) => {
  return (
    <Link href={href} className={`${className} border border-primary rounded-full w-12 h-12 flex justify-center items-center`}>{children}</Link>
  );
}

export default CircleLink;
