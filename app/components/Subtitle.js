import { Lexend } from "next/font/google";

const lexend = Lexend({ weight: "800", subsets: ["latin"] });

const Subtitle = ({ children, className }) => {
  return (
    <p className={`${lexend.className} uppercase ${className}`}>{children}</p>
  );
}

export default Subtitle;
