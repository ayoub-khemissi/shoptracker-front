import { Lexend } from "next/font/google";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

const Title = ({ children, className }) => {

  return (
    <h2 className={`${lexend.className} ${className} uppercase`}>{children}</h2>
  );
}

export default Title;