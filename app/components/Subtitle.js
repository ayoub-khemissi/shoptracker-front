import { Lexend } from "next/font/google";

const lexend = Lexend({ weight: "800", subsets: ["latin"] });

const Subtitle = ({ children, className }) => {
  return (
    <h3 className={`${lexend.className} ${className} uppercase`}>{children}</h3>
  );
}

export default Subtitle;
