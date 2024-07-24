import { Lexend } from "next/font/google";

const lexend = Lexend({ weight: "700", subsets: ["latin"] });

const Title = ({ children, className = "" }) => {
  return (
    <h2 className={`${lexend.className} text-2xl uppercase lg:text-4xl ${className}`}>
      {children}
    </h2>
  );
};

export default Title;
